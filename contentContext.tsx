import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { SiteContent } from './types';
import { db } from './firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

// Default Images
const defaultContent: SiteContent = {
  heroImage: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2070&auto=format&fit=crop",
  storeImage: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?auto=format&fit=crop&q=80&w=1200",
  serviceImages: {
    nail: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&q=80&w=800",
    lash: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&q=80&w=800",
    tattoo: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=800",
    wax: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800"
  }
};

interface ContentContextType {
  content: SiteContent;
  updateImage: (key: keyof SiteContent | `service_${keyof SiteContent['serviceImages']}`, value: string) => void;
  resetContent: () => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  isSyncing: boolean;
}

const ContentContext = createContext<ContentContextType>({
  content: defaultContent,
  updateImage: () => {},
  resetContent: () => {},
  isAdmin: false,
  login: () => false,
  logout: () => {},
  isSyncing: false,
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // 1. 初始化：監聽 Firebase 資料庫變化 (Real-time Sync)
  useEffect(() => {
    if (!db) return; // 如果沒有設定 Firebase，就跳過

    const contentRef = doc(db, "settings", "websiteContent");

    const unsubscribe = onSnapshot(contentRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteContent;
        // 簡單驗證資料結構，避免壞檔
        if (data.heroImage && data.serviceImages) {
          setContent(data);
        }
      } else {
        // 如果資料庫是空的 (第一次使用)，就把預設值寫上去
        setDoc(contentRef, defaultContent).catch(console.error);
      }
    }, (error) => {
      console.error("Firebase Sync Error:", error);
    });

    return () => unsubscribe();
  }, []);

  // 2. 備用方案：如果沒有 Firebase，從 LocalStorage 讀取 (相容舊模式)
  useEffect(() => {
    if (db) return; // 如果有 Firebase，就不讀 LocalStorage

    const savedContent = localStorage.getItem('trinh_site_content');
    if (savedContent) {
      try {
        setContent({ ...defaultContent, ...JSON.parse(savedContent) });
      } catch (e) {
        console.error("Failed to parse saved content");
      }
    }
  }, []);

  // Admin Auth State
  useEffect(() => {
    const savedAuth = localStorage.getItem('trinh_admin_auth');
    if (savedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const saveToFirebase = async (newContent: SiteContent) => {
    if (!db) {
      // Fallback to LocalStorage
      try {
        localStorage.setItem('trinh_site_content', JSON.stringify(newContent));
      } catch (e) {
        if (e instanceof DOMException && (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')) {
          alert('⚠️ 儲存空間已滿 (本機模式)！無法儲存更多圖片。');
        }
      }
      return;
    }

    setIsSyncing(true);
    try {
      await setDoc(doc(db, "settings", "websiteContent"), newContent, { merge: true });
    } catch (e: any) {
      console.error("Save Error:", e);
      if (e.code === 'resource-exhausted') {
        alert('⚠️ 上傳失敗：圖片總大小超過資料庫限制 (1MB)。請嘗試使用更簡單的圖片，或聯絡開發人員升級儲存方案。');
      } else if (e.code === 'permission-denied') {
        alert('⚠️ 權限錯誤：請確認 Firebase Firestore Rules 已設定為公開測試模式 (allow read, write: if true;)。');
      } else {
        alert('⚠️ 儲存失敗，請檢查網路連線。');
      }
    } finally {
      setIsSyncing(false);
    }
  };

  const updateImage = (key: string, value: string) => {
    setContent(prev => {
      let newContent = { ...prev };
      
      if (key.startsWith('service_')) {
        const serviceKey = key.replace('service_', '') as keyof SiteContent['serviceImages'];
        newContent.serviceImages = {
          ...prev.serviceImages,
          [serviceKey]: value
        };
      } else {
        // @ts-ignore
        newContent[key] = value;
      }

      // Save to Cloud
      saveToFirebase(newContent);
      
      return newContent;
    });
  };

  const resetContent = () => {
    if (confirm('確定要恢復成網站預設圖片嗎？所有的修改都會消失。')) {
      setContent(defaultContent);
      saveToFirebase(defaultContent);
      localStorage.removeItem('trinh_site_content');
    }
  };

  const login = (password: string) => {
    if (password === 'trinh888') {
      setIsAdmin(true);
      localStorage.setItem('trinh_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('trinh_admin_auth');
  };

  return (
    <ContentContext.Provider value={{ content, updateImage, resetContent, isAdmin, login, logout, isSyncing }}>
      {children}
    </ContentContext.Provider>
  );
};
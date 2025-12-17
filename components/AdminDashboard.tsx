import React, { useState, useRef } from 'react';
import { useContent } from '../contentContext';
import { X, Upload, LogOut, RefreshCcw, Image as ImageIcon, Lock, Loader2 } from 'lucide-react';

const AdminDashboard: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { content, updateImage, resetContent, logout } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeKey, setActiveKey] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileSelect = (key: string) => {
    setActiveKey(key);
    fileInputRef.current?.click();
  };

  // Image Compression Utility
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const maxWidth = 1200; // Limit width to 1200px for web optimization
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const elem = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Calculate new dimensions (Auto Aspect Ratio)
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          elem.width = width;
          elem.height = height;
          const ctx = elem.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress to JPEG with 0.7 quality
          const data = ctx?.canvas.toDataURL('image/jpeg', 0.7);
          resolve(data as string);
        };
        img.onerror = (error) => reject(error);
      };
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      try {
        // Use the compression function
        const compressedBase64 = await compressImage(file);
        updateImage(activeKey as any, compressedBase64);
      } catch (error) {
        alert('圖片處理失敗，請重試。');
        console.error(error);
      } finally {
        setIsProcessing(false);
      }
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const ImageUploader = ({ label, contentKey, currentSrc }: { label: string, contentKey: string, currentSrc: string }) => (
    <div className="bg-white p-4 rounded-lg border border-rose/30 shadow-sm flex items-center gap-4">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 relative">
        <img src={currentSrc} alt={label} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1">
        <h4 className="font-serif text-text font-bold text-sm">{label}</h4>
        <p className="text-xs text-text/50 truncate max-w-[200px]">{currentSrc.startsWith('data:') ? '已優化並上傳' : '預設圖片'}</p>
      </div>
      <button 
        onClick={() => handleFileSelect(contentKey)}
        disabled={isProcessing}
        className="px-3 py-2 bg-text text-white text-xs rounded-full hover:bg-accent transition-colors flex items-center gap-1 disabled:opacity-50"
      >
        {isProcessing && activeKey === contentKey ? <Loader2 size={12} className="animate-spin"/> : <Upload size={12} />}
        {isProcessing && activeKey === contentKey ? '處理中' : '更換'}
      </button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[#FFFBF9] h-full shadow-2xl overflow-y-auto animate-fade-in-up">
        {/* Header */}
        <div className="sticky top-0 bg-white/90 backdrop-blur border-b border-rose/30 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="font-serif text-2xl text-text">後台管理</h2>
            <p className="text-xs text-accent tracking-widest uppercase">Content Management</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-secondary rounded-full transition-colors text-text/60">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-xs text-amber-800 leading-relaxed">
            <strong>💡 系統提示：</strong> 
            <br/>上傳照片時，系統會自動幫您調整比例並壓縮大小，讓網站跑得更快。請放心上傳手機照片。
          </div>

          {/* Hidden File Input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          <section>
            <h3 className="text-sm font-bold text-text/50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ImageIcon size={14} /> 首頁與環境
            </h3>
            <div className="space-y-3">
              <ImageUploader 
                label="首頁主圖 (Hero Image)" 
                contentKey="heroImage" 
                currentSrc={content.heroImage} 
              />
              <ImageUploader 
                label="店家環境 (Store Interior)" 
                contentKey="storeImage" 
                currentSrc={content.storeImage} 
              />
            </div>
          </section>

          <section>
            <h3 className="text-sm font-bold text-text/50 uppercase tracking-widest mb-4 flex items-center gap-2">
              <ImageIcon size={14} /> 服務項目圖片
            </h3>
            <div className="space-y-3">
              <ImageUploader label="美甲服務" contentKey="service_nail" currentSrc={content.serviceImages.nail} />
              <ImageUploader label="美睫服務" contentKey="service_lash" currentSrc={content.serviceImages.lash} />
              <ImageUploader label="霧唇霧眉" contentKey="service_tattoo" currentSrc={content.serviceImages.tattoo} />
              <ImageUploader label="熱蠟除毛" contentKey="service_wax" currentSrc={content.serviceImages.wax} />
            </div>
          </section>

          <section className="pt-8 border-t border-rose/20 space-y-3">
             <button 
               onClick={resetContent}
               className="w-full py-3 border border-red-200 text-red-400 text-sm rounded-lg hover:bg-red-50 transition-colors flex justify-center items-center gap-2"
             >
               <RefreshCcw size={14} /> 重置所有圖片為預設值
             </button>
             
             <button 
               onClick={() => {
                 logout();
                 onClose();
               }}
               className="w-full py-3 bg-text text-white text-sm rounded-lg hover:bg-black transition-colors flex justify-center items-center gap-2"
             >
               <LogOut size={14} /> 登出管理員
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export const AdminLogin: React.FC<{ onClose: () => void, onLoginSuccess: () => void }> = ({ onClose, onLoginSuccess }) => {
  const { login } = useContent();
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pwd)) {
      onLoginSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-text/30 hover:text-text">
          <X size={20} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3 text-accent">
            <Lock size={20} />
          </div>
          <h2 className="font-serif text-2xl text-text">管理員登入</h2>
          <p className="text-xs text-text/50 mt-1">請輸入管理密碼以編輯網站內容</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="password" 
              value={pwd}
              onChange={(e) => {
                setPwd(e.target.value);
                setError(false);
              }}
              placeholder="輸入密碼 (trinh888)"
              className="w-full bg-[#F5F0EB] border-none rounded-lg py-3 px-4 text-center tracking-widest focus:ring-1 focus:ring-accent outline-none transition-all"
              autoFocus
            />
            {error && <p className="text-center text-red-400 text-xs mt-2">密碼錯誤，請重試。</p>}
          </div>
          <button type="submit" className="w-full bg-accent text-white py-3 rounded-lg font-bold shadow-lg shadow-accent/20 hover:bg-primary transition-all">
            登入系統
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
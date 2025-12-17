import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ⚠️ 重要：請前往 Firebase Console (https://console.firebase.google.com/project/nail-mi/settings/general)
// 在「一般 (General)」分頁下方找到「您的應用程式 (Your apps)」
// 選擇 "Config" 並複製內容替換下方的 firebaseConfig 物件

const firebaseConfig = {
  // 請將您的真實設定貼在這邊，例如：
  // apiKey: "AIzaSyD...",
  // authDomain: "nail-mi.firebaseapp.com",
  // projectId: "nail-mi",
  // storageBucket: "nail-mi.appspot.com",
  // messagingSenderId: "...",
  // appId: "..."
  
  // 因為我不知道您的 Key，暫時留空，請您填入才能運作：
  apiKey: "請填入您的API_KEY",
  authDomain: "nail-mi.firebaseapp.com",
  projectId: "nail-mi",
};

// 初始化 Firebase
let app;
let db;

try {
  // 簡單檢查是否有填入設定，避免程式完全崩潰
  if (firebaseConfig.apiKey === "請填入您的API_KEY") {
    console.warn("⚠️ Firebase 尚未設定完成，網站將使用暫存模式。請更新 firebase.ts 檔案。");
  } else {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("✅ Firebase 連線成功");
  }
} catch (e) {
  console.error("Firebase 初始化失敗:", e);
}

export { db };
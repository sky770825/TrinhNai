import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'zh' | 'vi';

interface Translations {
  [key: string]: {
    zh: string;
    vi: string;
  };
}

export const translations = {
  // Navigation
  nav_home: { zh: "首頁", vi: "TRANG CHỦ" },
  nav_services: { zh: "服務項目", vi: "DỊCH VỤ" },
  nav_booking: { zh: "立即預約", vi: "ĐẶT LỊCH" },
  nav_facebook: { zh: "FACEBOOK", vi: "FACEBOOK" },

  // Hero
  hero_badge: { zh: "XIAOZHEN・TRINH NAIL", vi: "XIAOZHEN・TRINH NAIL" },
  hero_subtitle: { zh: "致力於展現妳獨特的美", vi: "Tôn vinh vẻ đẹp độc đáo của bạn" },
  hero_desc_1: { zh: "小貞美甲・美睫", vi: "Trinh Nail - Mi" },
  hero_desc_2: { zh: "在中壢為您打造專屬的精緻體驗，", vi: "Mang đến trải nghiệm làm đẹp tinh tế tại Trung Lịch," },
  hero_desc_3: { zh: "讓每一個細節都完美呈現，展現妳獨特的美。", vi: "Hoàn hảo từng chi tiết, tỏa sáng vẻ đẹp riêng của bạn." },
  hero_cta_book: { zh: "立即預約", vi: "Đặt lịch ngay" },
  hero_cta_line: { zh: "LINE 諮詢", vi: "Tư vấn LINE" },

  // Services
  srv_title: { zh: "Service Menu", vi: "Danh Mục Dịch Vụ" },
  srv_subtitle: { zh: "我們堅持使用高品質材料，搭配細膩的手法，為您提供最安心的變美體驗。", vi: "Chúng tôi sử dụng vật liệu cao cấp và kỹ thuật tinh tế để mang lại trải nghiệm làm đẹp an toàn nhất." },
  srv_goto_booking: { zh: "前往預約", vi: "Đặt lịch ngay" },
  
  srv_nail_title: { zh: "精緻美甲", vi: "Nail Art Tinh Tế" },
  srv_nail_desc: { zh: "單色、造型、暈染、霧面質感，皆可客製化設計，展現指尖藝術。", vi: "Sơn gel, vẽ móng, loang màu, hiệu ứng lì. Thiết kế theo yêu cầu, nghệ thuật trên từng ngón tay." },
  
  srv_lash_title: { zh: "3D/6D 美睫", vi: "Nối Mi 3D/6D" },
  srv_lash_desc: { zh: "自然裸妝感或濃密電眼，量身打造迷人眼神，省去眼妝時間。", vi: "Tự nhiên hoặc dày quyến rũ. Thiết kế dáng mi phù hợp, tiết kiệm thời gian trang điểm." },
  
  srv_tattoo_title: { zh: "霧唇霧眉", vi: "Phun Xăm Thẩm Mỹ" },
  srv_tattoo_desc: { zh: "半永久定妝技術，素顏也能擁有好氣色，改善眉型與唇色。", vi: "Kỹ thuật bán vĩnh viễn. Giữ thần thái tươi tắn ngay cả khi để mặt mộc, cải thiện dáng mày và màu môi." },
  
  srv_wax_title: { zh: "熱蠟除毛", vi: "Waxing Tẩy Lông" },
  srv_wax_desc: { zh: "溫和低痛感除毛，還給肌膚潔淨滑嫩觸感，清爽無負擔。", vi: "Nhẹ nhàng, ít đau. Trả lại làn da mịn màng, sạch sẽ và thoải mái." },

  // Store Info
  store_title: { zh: "聯絡資訊", vi: "Thông tin liên hệ" },
  store_desc: { zh: "提供舒適放鬆的環境，採預約優先制。\n若有急事，請直接撥打電話或使用 Line 聯繫。", vi: "Không gian thư giãn, ưu tiên khách đặt lịch trước.\nNếu cần gấp, vui lòng gọi điện hoặc liên hệ qua Line." },
  store_hours_label: { zh: "營業時間", vi: "Giờ mở cửa" },
  store_hours_val: { zh: "09:00 – 24:00（全年無休）", vi: "09:00 – 24:00 (Mở cửa cả tuần)" },
  store_hours_note: { zh: "＊09:00 前與 20:00 後請務必提前預約", vi: "* Vui lòng đặt lịch trước nếu đến trước 09:00 hoặc sau 20:00" },
  store_phone_label: { zh: "預約專線", vi: "Hotline" },
  store_fb_label: { zh: "Facebook", vi: "Facebook" },
  store_fb_link: { zh: "瀏覽作品與評價", vi: "Xem tác phẩm & Đánh giá" },
  store_loc_1: { zh: "元化店 (前站)", vi: "Chi nhánh Yuanhua (Ga trước)" },
  store_addr_1: { zh: "中壢區元化路 40 號", vi: "No. 40, Yuanhua Rd, Zhongli Dist" },
  store_loc_2: { zh: "忠福店 (黃昏市場對面)", vi: "Chi nhánh Zhongfu (Chợ chiều)" },
  store_addr_2: { zh: "中壢區福州一街 262 號", vi: "No. 262, Fuzhou 1st St, Zhongli Dist" },

  // Booking Form
  bk_title: { zh: "線上預約", vi: "Đặt Lịch Online" },
  bk_subtitle: { zh: "填寫下方資訊，一鍵生成 LINE 預約訊息。", vi: "Điền thông tin bên dưới để tạo tin nhắn đặt lịch qua LINE." },
  bk_name: { zh: "姓名 *", vi: "Họ tên *" },
  bk_name_ph: { zh: "您的稱呼", vi: "Tên của bạn" },
  bk_phone: { zh: "電話 *", vi: "Số điện thoại *" },
  bk_branch: { zh: "分店 *", vi: "Chi nhánh *" },
  bk_branch_ph: { zh: "選擇服務據點", vi: "Chọn chi nhánh" },
  bk_birthday: { zh: "生日優惠", vi: "Ưu đãi sinh nhật" },
  bk_services: { zh: "服務項目 *", vi: "Dịch vụ *" },
  bk_date: { zh: "預約日期 *", vi: "Ngày đặt *" },
  bk_time: { zh: "預約時間", vi: "Giờ đặt" },
  bk_style: { zh: "風格需求", vi: "Yêu cầu kiểu dáng" },
  bk_style_ph: { zh: "例：法式、貓眼...", vi: "VD: Kiểu Pháp, mắt mèo..." },
  bk_matte: { zh: "霧面質感", vi: "Sơn lì / Matte" },
  bk_img: { zh: "參考圖片", vi: "Ảnh mẫu" },
  bk_img_btn: { zh: "選擇圖片", vi: "Chọn ảnh" },
  bk_note: { zh: "備註", vi: "Ghi chú" },
  bk_btn_gen: { zh: "生成預約訊息", vi: "Tạo tin nhắn" },
  bk_msg_title: { zh: "預約訊息已生成", vi: "Đã tạo tin nhắn" },
  bk_msg_copy: { zh: "複製內容", vi: "Sao chép" },
  bk_msg_copied: { zh: "已複製", vi: "Đã chép" },
  bk_msg_hint: { zh: "請複製上方文字，並傳送至 LINE 即可完成預約申請。", vi: "Vui lòng sao chép nội dung trên và gửi qua LINE để hoàn tất đặt lịch." },
  bk_msg_link: { zh: "前往 LINE 貼上訊息 →", vi: "Mở LINE để gửi tin →" },
  
  // Dynamic Options (UI Display)
  opt_branch_1: { zh: "元化店｜中壢區元化路40號", vi: "Yuanhua｜No. 40 Yuanhua Rd" },
  opt_branch_2: { zh: "忠福店｜中壢區福州一街262號", vi: "Zhongfu｜No. 262 Fuzhou 1st St" },
  
  opt_bd_none: { zh: "不適用", vi: "Không có" },
  opt_bd_month: { zh: "本月生日（85折）", vi: "Sinh nhật tháng này (Giảm 15%)" },
  opt_bd_week: { zh: "本週生日（85折）", vi: "Sinh nhật tuần này (Giảm 15%)" },
  
  opt_matte_none: { zh: "未指定", vi: "Không chỉ định" },
  opt_matte_yes: { zh: "要霧面", vi: "Có (Matte)" },
  opt_matte_no: { zh: "不用霧面", vi: "Không (Bóng)" },
  
  // Message Generation Templates (For Line Message)
  msg_greeting: { zh: "您好，我想預約 🙋🏻‍♀️", vi: "Xin chào, tôi muốn đặt lịch 🙋🏻‍♀️" },
  msg_name: { zh: "👤 姓名/電話：", vi: "👤 Tên/SĐT:" },
  msg_loc: { zh: "📍 分店：", vi: "📍 Chi nhánh:" },
  msg_time: { zh: "🗓️ 時間：", vi: "🗓️ Thời gian:" },
  msg_srv: { zh: "🧾 項目：", vi: "🧾 Dịch vụ:" },
  msg_bd: { zh: "🎂 生日：", vi: "🎂 Sinh nhật:" },
  msg_matte: { zh: "✨ 霧面：", vi: "✨ Matte/Lì:" },
  msg_style: { zh: "🖼️ 風格：", vi: "🖼️ Kiểu dáng:" },
  msg_img: { zh: "📷 圖片：", vi: "📷 Ảnh mẫu:" },
  msg_note: { zh: "📝 備註：", vi: "📝 Ghi chú:" },
  msg_footer: { zh: "請協助確認時段與報價，謝謝！", vi: "Vui lòng kiểm tra thời gian và báo giá giúp tôi, cảm ơn!" },
  msg_img_count: { zh: " 張（稍後傳送）", vi: " ảnh (gửi sau)" },
  msg_none: { zh: "無", vi: "Không" },
  msg_warn_early: { zh: "早鳥時段需預約", vi: "Cần đặt trước (Sáng sớm)" },
  msg_warn_late: { zh: "夜間時段需預約", vi: "Cần đặt trước (Đêm)" },
  msg_ok: { zh: "營業時段", vi: "Giờ mở cửa" },
};

// Context setup
interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
  t: (key) => translations[key as keyof typeof translations]?.zh || key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>('zh');

  const t = (key: string) => {
    // @ts-ignore
    return translations[key]?.[lang] || key;
  };

  return React.createElement(
    LanguageContext.Provider,
    { value: { lang, setLang, t } },
    children
  );
};

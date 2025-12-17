export interface BookingData {
  name: string;
  phone: string;
  branch: string;
  birthday: string;
  services: string[];
  date: string;
  time: string;
  style: string;
  matte: string;
  note: string;
  files: File[];
}

export interface TimeStatus {
  isValid: boolean;
  message: string;
  type: 'ok' | 'warn' | 'error' | 'default';
}

export interface SiteContent {
  heroImage: string;
  storeImage: string;
  serviceImages: {
    nail: string;
    lash: string;
    tattoo: string;
    wax: string;
  };
}

export const BRANCH_OPTIONS = [
  "元化店｜中壢區元化路40號（前站）",
  "忠福店｜中壢區福州一街262號（黃昏市場對面）"
];

export const SERVICE_OPTIONS = [
  "美甲",
  "美睫",
  "霧唇",
  "霧眉",
  "熱蠟除毛",
  "想先詢價/討論"
];

export const BIRTHDAY_OPTIONS = [
  "不適用",
  "本月生日（85折）",
  "本週生日（85折）"
];

export const MATTE_OPTIONS = [
  "未指定",
  "要霧面",
  "不用霧面"
];
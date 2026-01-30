export enum RequestType {
  FULLSTACK_APP = 'Lập Trình App Fullstack (Frontend + Backend)',
  NICHE_STRATEGY = 'Chiến Lược Ngách (Coding Niche Strategy)',
  DEEP_ARTICLE = 'Bài Viết Chuyên Sâu (Technical Deep Dive)',
  EMAIL_MARKETING = 'Email Marketing (Bán Khóa Học/Tool)',
  VIDEO_SCRIPT = 'Kịch Bản Video (TikTok/YouTube Tech)',
  STEP_BY_STEP = 'Hướng Dẫn Từng Bước (Tutorial)',
  CODE_REVIEW = 'Review & Audit Code (Chuyên Gia)',
  CONVERSION_ADS = 'Quảng Cáo Chuyển Đổi (Ads Copy)'
}

export enum TechStack {
  REACT_NODE = 'MERN Stack (React, Node.js, MongoDB)',
  NEXT_SUPABASE = 'Modern Stack (Next.js, Supabase, Tailwind)',
  PYTHON_AI = 'AI/Data Stack (Python, FastAPI, PyTorch)',
  FLUTTER_FIREBASE = 'Mobile Stack (Flutter, Firebase)',
  SOLID_RUST = 'Performance Stack (SolidJS, Rust)',
  BLOCKCHAIN = 'Web3 Stack (Solidity, Ethers.js, React)',
  GENERAL_CONCEPTS = 'Tư Duy Lập Trình & Soft Skills'
}

export enum TargetAudience {
  NEWBIE = 'Newbie / Người Mới Bắt Đầu',
  JUNIOR = 'Junior Developer (1-2 năm)',
  SENIOR = 'Senior Developer / Tech Lead',
  FREELANCER = 'Freelancer / Solopreneur',
  NON_TECH = 'Khách Hàng Non-Tech / Business Owner',
  RECRUITER = 'Nhà Tuyển Dụng / HR'
}

export enum ToneStyle {
  EXPERT = 'Chuyên Gia / Authority (Uy tín)',
  WITTY = 'Hài Hước / Gen Z (Dễ tiếp cận)',
  INSPIRATIONAL = 'Truyền Cảm Hứng / Mentor',
  FOMO = 'Gấp Gáp / Bán Hàng (High Conversion)',
  ACADEMIC = 'Hàn Lâm / Giáo Sư (Deep Tech)',
  FRIENDLY = 'Thân Thiện / Chia Sẻ (Community)'
}

export interface UserInput {
  requestType: RequestType;
  techStack: TechStack;
  audience: TargetAudience;
  tone: ToneStyle;
  specificContext: string;
}

export interface GeneratedResult {
  text: string;
  isGenerating: boolean;
}

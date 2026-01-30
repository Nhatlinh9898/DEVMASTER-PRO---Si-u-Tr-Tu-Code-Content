import { GoogleGenAI, Modality } from "@google/genai";
import { UserInput } from "../types";

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartContent = async (input: UserInput): Promise<string> => {
  const ai = getClient();
  
  const systemInstruction = `
  BẠN LÀ: Thien Master AI - Siêu Trí Tuệ Lập Trình & Chiến Lược Gia Nội Dung Số 1 Thế Giới.
  
  NHIỆM VỤ CỐT LÕI:
  Tạo ra nội dung hoặc mã nguồn (Code) đẳng cấp cao nhất dựa trên input của người dùng. Bạn phục vụ cho cộng đồng Developer và Tech Business.
  
  PHONG CÁCH TRẢ LỜI:
  - Ngôn ngữ: Tiếng Việt 100%.
  - Format: Markdown chuyên nghiệp. Sử dụng tiêu đề, bullet points, code blocks rõ ràng.
  - Tư duy: Thực chiến, đi thẳng vào vấn đề, tối ưu hóa lợi ích, tư duy "Senior/Architect".
  
  CHIẾN LƯỢC XỬ LÝ THEO LOẠI YÊU CẦU:
  
  1. NẾU LÀ CODE (Fullstack, Tech):
     - Đóng vai: Senior Software Architect.
     - Output: Cấu trúc thư mục chuẩn, Code sạch (Clean Code), Best Practices, bảo mật, hiệu năng cao.
     - Giải thích ngắn gọn tại sao chọn giải pháp này.
  
  2. NẾU LÀ CONTENT (Marketing, Email, Kịch bản):
     - Đóng vai: World-class Copywriter chuyên ngách Tech.
     - Output: Tiêu đề gây sốc (Hook), Nỗi đau (Pain Point), Giải pháp (Solution), Kêu gọi hành động (CTA).
     - Đảm bảo đúng Tone giọng người dùng chọn.
  
  INPUT CONTEXT:
  - Loại yêu cầu: ${input.requestType}
  - Công nghệ/Chủ đề: ${input.techStack}
  - Đối tượng đọc: ${input.audience}
  - Tone giọng: ${input.tone}
  - Ghi chú thêm: ${input.specificContext}
  
  HÃY BẮT ĐẦU NGAY BÂY GIỜ. KHÔNG NÓI NHẢM. XUẤT RA KẾT QUẢ ĐỈNH CAO.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Hãy thực hiện yêu cầu sau đây một cách xuất sắc nhất: ${input.requestType} về ${input.techStack}.` }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7, // Balance between creativity and precision
      }
    });

    return response.text || "Xin lỗi, hệ thống đang bận. Vui lòng thử lại.";
  } catch (error) {
    console.error("Content generation error:", error);
    return "Đã xảy ra lỗi khi kết nối với siêu trí tuệ. Vui lòng kiểm tra API Key.";
  }
};

export const generateVoice = async (text: string, isMale: boolean): Promise<ArrayBuffer | null> => {
  const ai = getClient();
  const voiceName = isMale ? 'Fenrir' : 'Kore'; // Fenrir (Deep/Authoritative), Kore (Warm/Clear)

  // Truncate text if too long to avoid token limits for demo purposes, 
  // though real apps should chunk large text.
  const processedText = text.length > 2000 ? text.substring(0, 2000) + "..." : text;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-tts',
      contents: [{ parts: [{ text: processedText }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    // Decode base64 to ArrayBuffer
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Speech generation error:", error);
    return null;
  }
};

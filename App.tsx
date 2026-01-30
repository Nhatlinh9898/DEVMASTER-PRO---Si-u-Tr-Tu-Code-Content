import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from './components/Header';
import { InputField } from './components/InputField';
import VoiceStudio from './components/VoiceStudio';
import { 
  RequestType, 
  TechStack, 
  TargetAudience, 
  ToneStyle, 
  UserInput 
} from './types';
import { generateSmartContent } from './services/geminiService';

const App: React.FC = () => {
  const [formData, setFormData] = useState<UserInput>({
    requestType: RequestType.FULLSTACK_APP,
    techStack: TechStack.REACT_NODE,
    audience: TargetAudience.SENIOR,
    tone: ToneStyle.EXPERT,
    specificContext: ''
  });

  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleInputChange = (field: keyof UserInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsGenerating(true);
    setGeneratedContent(''); // Clear previous
    
    // Simulate thinking time for effect + API call
    const result = await generateSmartContent(formData);
    
    setGeneratedContent(result);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen pb-20 font-body text-gray-200">
      <Header />

      <main className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: CONTROL CENTER */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl text-white font-display font-bold mb-6 flex items-center gap-2">
              <span className="text-neon-purple">⚡</span> CẤU HÌNH HỆ THỐNG
            </h3>
            
            <div className="space-y-6">
              <InputField label="1. BẠN MUỐN TẠO GÌ? (REQUEST TYPE)">
                <select 
                  className="w-full bg-cyber-black text-white p-4 rounded-lg border-none focus:ring-2 focus:ring-neon-blue outline-none appearance-none cursor-pointer hover:bg-gray-900 transition-colors"
                  value={formData.requestType}
                  onChange={(e) => handleInputChange('requestType', e.target.value as RequestType)}
                >
                  {Object.values(RequestType).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </InputField>

              <InputField label="2. CÔNG NGHỆ / CHỦ ĐỀ (TECH STACK)">
                <select 
                  className="w-full bg-cyber-black text-white p-4 rounded-lg border-none focus:ring-2 focus:ring-neon-blue outline-none appearance-none cursor-pointer"
                  value={formData.techStack}
                  onChange={(e) => handleInputChange('techStack', e.target.value as TechStack)}
                >
                  {Object.values(TechStack).map(stack => (
                    <option key={stack} value={stack}>{stack}</option>
                  ))}
                </select>
              </InputField>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="3. ĐỐI TƯỢNG (AUDIENCE)">
                  <select 
                    className="w-full bg-cyber-black text-white p-4 rounded-lg border-none focus:ring-2 focus:ring-neon-blue outline-none cursor-pointer"
                    value={formData.audience}
                    onChange={(e) => handleInputChange('audience', e.target.value as TargetAudience)}
                  >
                    {Object.values(TargetAudience).map(aud => (
                      <option key={aud} value={aud}>{aud}</option>
                    ))}
                  </select>
                </InputField>

                <InputField label="4. TONE GIỌNG (TONE)">
                  <select 
                    className="w-full bg-cyber-black text-white p-4 rounded-lg border-none focus:ring-2 focus:ring-neon-blue outline-none cursor-pointer"
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value as ToneStyle)}
                  >
                    {Object.values(ToneStyle).map(tone => (
                      <option key={tone} value={tone}>{tone}</option>
                    ))}
                  </select>
                </InputField>
              </div>

              <InputField label="5. YÊU CẦU CHI TIẾT (CONTEXT)">
                <textarea 
                  className="w-full bg-cyber-black text-gray-300 p-4 rounded-lg border-none focus:ring-2 focus:ring-neon-blue outline-none h-32 resize-none placeholder-gray-600"
                  placeholder="VD: Tạo Landing Page bán khóa học React JS giá 5 triệu, tập trung vào việc cam kết đầu ra việc làm..."
                  value={formData.specificContext}
                  onChange={(e) => handleInputChange('specificContext', e.target.value)}
                />
              </InputField>

              <button
                onClick={handleSubmit}
                disabled={isGenerating}
                className="w-full group relative px-8 py-5 bg-gradient-to-r from-neon-purple to-pink-600 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(188,19,254,0.5)] transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span className="relative text-white font-display font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3">
                  {isGenerating ? 'HỆ THỐNG ĐANG XỬ LÝ...' : '🚀 KÍCH HOẠT SIÊU TRÍ TUỆ'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: OUTPUT DISPLAY */}
        <div className="lg:col-span-7">
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-cyber-dark/80 border border-white/5 rounded-2xl p-6 md:p-8 shadow-2xl relative min-h-[500px] flex flex-col">
              
              {/* Output Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-gray-500 font-mono text-sm">output_terminal_v32.tsx</span>
                </div>
                {generatedContent && (
                  <span className="text-neon-green text-xs font-bold px-2 py-1 bg-neon-green/10 rounded border border-neon-green/30">
                    STATUS: SUCCESS
                  </span>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {isGenerating ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-6">
                    <div className="relative w-24 h-24">
                      <div className="absolute inset-0 border-t-4 border-neon-blue rounded-full animate-spin"></div>
                      <div className="absolute inset-4 border-t-4 border-neon-purple rounded-full animate-spin reverse-spin"></div>
                    </div>
                    <p className="text-neon-blue font-mono animate-pulse">Đang kết nối Neural Network...</p>
                  </div>
                ) : generatedContent ? (
                  <div className="prose prose-invert prose-headings:text-neon-blue prose-a:text-neon-purple prose-code:text-neon-green max-w-none">
                     <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-600">
                    <svg className="w-20 h-20 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    <p className="text-center">Sẵn sàng nhận lệnh.<br/>Vui lòng nhập thông tin bên trái để bắt đầu.</p>
                  </div>
                )}
              </div>
              
              {/* Voice Feature */}
              {generatedContent && !isGenerating && (
                <VoiceStudio content={generatedContent} />
              )}

            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;

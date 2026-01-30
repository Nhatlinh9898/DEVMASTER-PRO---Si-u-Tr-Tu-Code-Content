import React, { useState, useEffect, useRef } from 'react';
import { generateVoice } from '../services/geminiService';
import { createWavHeader, float32ToInt16 } from '../services/audioUtils';

interface VoiceStudioProps {
  content: string;
}

const VoiceStudio: React.FC<VoiceStudioProps> = ({ content }) => {
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize AudioContext
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);

  const handleGenerateAudio = async () => {
    if (!content) return;
    setLoading(true);
    stopAudio(); // Stop any current playback

    try {
      const rawBuffer = await generateVoice(content, voiceGender === 'male');
      
      if (rawBuffer && audioContextRef.current) {
        // Decode the raw PCM data (wrapped in wav container or raw) 
        // Note: The API returns raw PCM usually, but `decodeAudioData` often expects a container or specific handling.
        // However, based on the prompt's provided "Speech" section, the API returns PCM, 
        // and we need to decode it manually as shown in the prompt guidance if we want to stream, 
        // OR we can use the `decodeAudioData` if we package it right. 
        // Let's use the manual decode logic from the prompt guidance adapted for the full buffer.
        
        // Re-implementing decodeAudioData logic manually since `generateVoice` returns raw bytes
        // The generateVoice service returns an ArrayBuffer of the raw bytes.
        
        const rawBytes = new Uint8Array(rawBuffer);
        const dataInt16 = new Int16Array(rawBytes.buffer);
        const numChannels = 1;
        const sampleRate = 24000; // Gemini TTS default
        const frameCount = dataInt16.length; 
        
        const buffer = audioContextRef.current.createBuffer(numChannels, frameCount, sampleRate);
        const channelData = buffer.getChannelData(0);
        
        for (let i = 0; i < frameCount; i++) {
             // Convert Int16 to Float32 [-1.0, 1.0]
             // The prompt example for LIVE API uses / 32768.0. TTS API returns Linear-16 or MP3 depending on config?
             // Actually, Gemini TTS REST/Client usually returns audio/mp3 by default unless specified.
             // BUT, the prompt guidance shows `Modality.AUDIO` returns raw PCM in `inlineData`.
             // Let's assume standard 16-bit PCM for `Modality.AUDIO`.
             channelData[i] = dataInt16[i] / 32768.0;
        }

        setAudioBuffer(buffer);
        // Auto play
        playAudio(buffer);
      }
    } catch (e) {
      console.error("Audio processing failed", e);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (buffer: AudioBuffer) => {
    if (!audioContextRef.current) return;

    // Disconnect old source
    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
    }

    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    
    source.onended = () => setIsPlaying(false);
    
    source.start(0);
    sourceNodeRef.current = source;
    setIsPlaying(true);
  };

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleDownload = () => {
    if (!audioBuffer) return;

    // Convert AudioBuffer back to WAV file for download
    const channelData = audioBuffer.getChannelData(0);
    const int16Data = float32ToInt16(channelData);
    const wavHeader = createWavHeader(audioBuffer.sampleRate, 1, int16Data.length * 2);
    
    const blob = new Blob([wavHeader, int16Data], { type: 'audio/wav' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `devmaster-voice-${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 p-6 bg-cyber-dark/50 border border-white/10 rounded-xl backdrop-blur-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neon-green font-display font-bold text-lg flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
          VOICE STUDIO PRO
        </h3>
        <div className="flex bg-black/40 rounded-lg p-1">
          <button 
            onClick={() => setVoiceGender('male')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${voiceGender === 'male' ? 'bg-cyan-700 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            NAM (Expert)
          </button>
          <button 
            onClick={() => setVoiceGender('female')}
            className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${voiceGender === 'female' ? 'bg-purple-700 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            NỮ (Inspire)
          </button>
        </div>
      </div>

      <div className="flex gap-4">
        {!isPlaying ? (
          <button
            onClick={audioBuffer ? () => playAudio(audioBuffer) : handleGenerateAudio}
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-neon-blue to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                ĐANG XỬ LÝ...
              </>
            ) : audioBuffer ? "NGHE LẠI (REPLAY)" : "ĐỌC NGAY (TTS)"}
          </button>
        ) : (
          <button
            onClick={stopAudio}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
          >
            DỪNG LẠI
          </button>
        )}

        {audioBuffer && (
          <button
            onClick={handleDownload}
            className="px-6 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white font-bold rounded-lg transition-all"
            title="Tải về máy"
          >
             ⬇ MP3/WAV
          </button>
        )}
      </div>
    </div>
  );
};

export default VoiceStudio;

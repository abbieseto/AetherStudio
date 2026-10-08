import React, { useState } from 'react';
import {
  Sparkles,
  Video,
  Image as ImageIcon,
  Wand2,
  UploadCloud,
  Layers,
  Camera,
  Clock,
  Zap,
  Info,
  ChevronRight,
  Flame,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AspectRatio, MediaType } from '../../types';

export const Step1Describe: React.FC = () => {
  const {
    promptText,
    setPromptText,
    mediaType,
    setMediaType,
    aspectRatio,
    setAspectRatio,
    selectedTool,
    setSelectedTool,
    cameraMotion,
    setCameraMotion,
    videoDuration,
    setVideoDuration,
    handleGenerate,
    isGenerating
  } = useApp();

  const [isEnhancing, setIsEnhancing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const promptTemplates = [
    {
      title: 'TikTok Viral Sneaker Hook',
      type: 'video' as MediaType,
      ratio: '9:16' as AspectRatio,
      prompt: 'Kinetic macro close-up of futuristic holographic sneaker material dissolving into neon violet liquid chrome, dynamic 360 spin, shot on 35mm lens, 4k 60fps'
    },
    {
      title: 'Luxury Beauty Serum Ad',
      type: 'image' as MediaType,
      ratio: '1:1' as AspectRatio,
      prompt: 'Minimalist studio lighting, luxury amber glass dropper bottle of vitamin C serum on wet dark obsidian rock with ripples, golden hour rim reflections'
    },
    {
      title: 'YouTube Cinematic Trailer',
      type: 'video' as MediaType,
      ratio: '16:9' as AspectRatio,
      prompt: 'Sweeping drone flythrough over ancient floating obsidian citadel crowned with violet lightning and misty mountain peaks, IMAX 70mm cinematic grade'
    },
    {
      title: 'E-Commerce Cyberpunk Tech',
      type: 'video' as MediaType,
      ratio: '9:16' as AspectRatio,
      prompt: 'Transparent cybernetic smart glasses glowing with cyan HUD wireframes, modeled by a stylish cyberpunk creator in rainy Tokyo night'
    }
  ];

  const aspectRatios: { id: AspectRatio; name: string; tag: string; iconW: string; iconH: string }[] = [
    { id: '9:16', name: '9:16 Story / Reel', tag: 'TikTok, Reels, Shorts', iconW: 'w-3.5', iconH: 'h-6' },
    { id: '16:9', name: '16:9 Cinematic', tag: 'YouTube, Web, Ads', iconW: 'w-6', iconH: 'h-3.5' },
    { id: '1:1', name: '1:1 Square', tag: 'Instagram, Feed, Carousels', iconW: 'w-4.5', iconH: 'h-4.5' },
    { id: '4:5', name: '4:5 Portrait', tag: 'Instagram Feed, FB', iconW: 'w-4', iconH: 'h-5' }
  ];

  const cameraMotions = [
    '360 Orbit & Slow Push',
    'FPV Drone Flythrough',
    'Anamorphic Horizontal Pan',
    'Vertigo Dolly Zoom',
    'Static Cinema Tripod'
  ];

  // AI Prompt Enhancement using server-side Gemini API proxy
  const handleEnhancePrompt = async () => {
    if (!promptText.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/ai/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          mediaType,
          platform: aspectRatio === '9:16' ? 'TikTok' : 'General Social'
        })
      });
      const json = await res.json();
      if (json.success && json.data?.enhancedPrompt) {
        setPromptText(json.data.enhancedPrompt);
      }
    } catch (_err) {
      // Fallback enhancement
      setPromptText(
        `${promptText}, cinematic lighting, photorealistic 8k, shot on 35mm anamorphic prime lens, ultra-detailed textures, volumetric haze in obsidian & neon cyan hues`
      );
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSimulateUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => {
        setUploadedImage(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner / Hero Guidance */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1A1824] via-[#121118] to-[#1A1824] border border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#d0bcff] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-ping" />
            <span>STEP 1 / 4 — VISION &amp; PARAMETERS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Describe Your Idea &amp; Synthesis Mode
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1 max-w-xl">
            Synthesize video with <strong className="text-white">Seedance 2.0</strong> or photorealistic visuals with <strong className="text-white">Nanobanana</strong> via MCP. Fine-tune aspect ratio, motion, and prompt.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#0B0B0F]/80 p-2 rounded-xl border border-white/[0.06] shrink-0">
          <button
            onClick={() => {
              setMediaType('video');
              setSelectedTool('seedance2-video-gen');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mediaType === 'video'
                ? 'bg-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>AI Video (Seedance 2.0)</span>
          </button>
          <button
            onClick={() => {
              setMediaType('image');
              setSelectedTool('nanobanana');
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              mediaType === 'image'
                ? 'bg-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>AI Image (Nanobanana)</span>
          </button>
        </div>
      </div>

      {/* Main Prompt Box (Hero Element in Obsidian Kinetic style) */}
      <div className="glass-card p-5 rounded-2xl relative">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-[#d0bcff] flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
            <span>Prompt Composer</span>
          </label>
          <button
            onClick={handleEnhancePrompt}
            disabled={isEnhancing || !promptText}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 hover:bg-[#8B5CF6]/30 text-[#d0bcff] text-xs font-bold transition-all disabled:opacity-40 cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.25)]"
          >
            <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin' : ''}`} />
            <span>{isEnhancing ? 'Gemini Enhancing...' : 'AI Magic Enhance'}</span>
          </button>
        </div>

        <div className="relative">
          <textarea
            value={promptText}
            onChange={e => setPromptText(e.target.value)}
            rows={4}
            placeholder="Describe what you want to create in cinematic detail... (e.g. Glowing neon motorcycle drifting through raining Cyberpunk Tokyo, 4k 60fps cinematic)"
            className="w-full bg-[#121118] text-white text-sm rounded-xl p-3.5 border border-white/[0.1] focus:border-[#8B5CF6] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/30 transition-all placeholder:text-[#94A3B8]/50 resize-none font-['Plus_Jakarta_Sans']"
          />
        </div>

        {/* Quick Inspiration Pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[11px] font-mono text-[#94A3B8] flex items-center space-x-1 shrink-0">
            <Flame className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Templates:</span>
          </span>
          {promptTemplates.map((t, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPromptText(t.prompt);
                setMediaType(t.type);
                setAspectRatio(t.ratio);
                if (t.type === 'image') setSelectedTool('nanobanana');
                else setSelectedTool('seedance2-video-gen');
              }}
              className="shrink-0 px-2.5 py-1 rounded-full bg-[#121118] border border-white/[0.08] hover:border-[#8B5CF6] text-[#94A3B8] hover:text-white transition-all text-[11px] cursor-pointer"
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Controls: Aspect Ratio, Camera Motion, Image Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Aspect Ratio Selector */}
        <div className="glass-card p-4 rounded-2xl md:col-span-2">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-2 mb-3">
            <Layers className="w-4 h-4 text-[#06B6D4]" />
            <span>Select Aspect Ratio</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {aspectRatios.map(ar => {
              const isSelected = aspectRatio === ar.id;
              return (
                <button
                  key={ar.id}
                  onClick={() => setAspectRatio(ar.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)] ring-1 ring-[#8B5CF6]'
                      : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    {/* Visual aspect ratio wireframe */}
                    <div
                      className={`border-2 rounded-sm ${isSelected ? 'border-[#8B5CF6]' : 'border-[#94A3B8]'} ${ar.iconW} ${ar.iconH} flex items-center justify-center`}
                    />
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                  </div>
                  <div>
                    <p className="text-xs font-bold font-mono text-white">{ar.id}</p>
                    <p className="text-[10px] text-[#94A3B8] truncate">{ar.tag}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reference Image Drop / Upload */}
        <div className="glass-card p-4 rounded-2xl flex flex-col justify-between">
          <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-2 mb-2">
            <UploadCloud className="w-4 h-4 text-[#4edea3]" />
            <span>Image Reference / Pose</span>
          </label>

          {uploadedImage ? (
            <div className="relative rounded-xl overflow-hidden border border-[#8B5CF6]/50 h-28 group">
              <img src={uploadedImage} alt="Uploaded pose" className="w-full h-full object-cover" />
              <button
                onClick={() => setUploadedImage(null)}
                className="absolute top-2 right-2 bg-[#0B0B0F]/80 text-white rounded-full p-1 text-[10px] hover:bg-red-500 transition-colors"
              >
                ✕
              </button>
              <div className="absolute bottom-1 left-2 text-[10px] font-mono text-[#d0bcff] bg-black/60 px-1.5 rounded">
                Ref Loaded
              </div>
            </div>
          ) : (
            <label className="border-2 border-dashed border-white/[0.1] hover:border-[#8B5CF6]/50 rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-[#121118]/60 h-28">
              <UploadCloud className="w-6 h-6 text-[#94A3B8] mb-1" />
              <span className="text-[11px] font-semibold text-white">Upload image guide</span>
              <span className="text-[9px] text-[#94A3B8]">PNG, JPG up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulateUpload}
                className="hidden"
              />
            </label>
          )}

          <p className="text-[10px] text-[#958ea0] mt-2">
            Seedance 2.0 uses image-to-video motion guidance.
          </p>
        </div>
      </div>

      {/* Video Advanced Controls: Motion & Duration (when Video is active) */}
      {mediaType === 'video' && (
        <div className="glass-card p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-2 mb-2">
              <Camera className="w-4 h-4 text-[#8B5CF6]" />
              <span>Camera Motion Dynamics</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {cameraMotions.map(motion => (
                <button
                  key={motion}
                  onClick={() => setCameraMotion(motion)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    cameraMotion === motion
                      ? 'bg-[#8B5CF6] text-white shadow-[0_0_10px_rgba(139,92,246,0.4)]'
                      : 'bg-[#121118] text-[#94A3B8] border border-white/[0.08] hover:text-white'
                  }`}
                >
                  {motion}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-2">
                <Clock className="w-4 h-4 text-[#06B6D4]" />
                <span>Video Duration</span>
              </label>
              <span className="text-xs font-mono font-bold text-[#06B6D4] bg-[#06B6D4]/10 px-2 py-0.5 rounded">
                {videoDuration}s (High FPS)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {[4, 6, 8, 10].map(dur => (
                <button
                  key={dur}
                  onClick={() => setVideoDuration(dur)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    videoDuration === dur
                      ? 'bg-[#06B6D4] text-white shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                      : 'bg-[#121118] border border-white/[0.08] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {dur}s
                </button>
              ))}
            </div>
            <p className="text-[10px] text-[#958ea0] mt-1.5">
              Standard TikTok &amp; Reels hooks perform best at 5-8 seconds.
            </p>
          </div>
        </div>
      )}

      {/* Action Footer Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.08]">
        <div className="flex items-center space-x-2 text-xs text-[#94A3B8]">
          <Info className="w-4 h-4 text-[#8B5CF6]" />
          <span>
            Generates with{' '}
            <strong className="text-white">
              {mediaType === 'video' ? 'Seedance 2.0 (InfoseekAI)' : 'Nanobanana Pro'}
            </strong>{' '}
            • Costs ~{mediaType === 'video' ? '30' : '10'} tokens
          </span>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating || !promptText.trim()}
          className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] text-white text-sm font-extrabold shadow-[0_4px_25px_rgba(139,92,246,0.5)] hover:shadow-[0_6px_30px_rgba(139,92,246,0.7)] transition-all cursor-pointer transform hover:scale-[1.02] disabled:opacity-50"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Generate Content (Step 2)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

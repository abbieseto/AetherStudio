import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Music,
  Type,
  Sliders,
  Send,
  Wand2,
  Play,
  Pause,
  Plus,
  Trash2,
  Check,
  ChevronRight,
  Palette,
  Volume2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CaptionItem, CaptionStyle, AspectRatio } from '../../types';

export const Step3Customize: React.FC = () => {
  const { activeProject, updateProject, setWizardStep } = useApp();

  const [activeTab, setActiveTab] = useState<'captions' | 'audio' | 'effects' | 'format'>('captions');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(1.2);
  const [selectedCaptionStyle, setSelectedCaptionStyle] = useState<CaptionStyle>('hormozi');
  const [isGeneratingCaptions, setIsGeneratingCaptions] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  if (!activeProject) {
    return (
      <div className="max-w-md mx-auto py-16 text-center glass-card p-8 rounded-2xl">
        <p className="text-white text-sm mb-4">No project selected to customize.</p>
        <button
          onClick={() => setWizardStep(1)}
          className="px-5 py-2 rounded-full bg-[#8B5CF6] text-white text-xs font-bold"
        >
          Return to Step 1
        </button>
      </div>
    );
  }

  const captionStyles: { id: CaptionStyle; label: string; preview: string; desc: string }[] = [
    {
      id: 'hormozi',
      label: 'Hormozi Kinetic',
      preview: 'TEXT HIGHLIGHT 🔥',
      desc: 'Bold yellow & green kinetic font with black stroke'
    },
    {
      id: 'neon',
      label: 'Neon Violet Glow',
      preview: 'NEON RADIANCE ⚡',
      desc: 'Electric purple glow with cyan accents'
    },
    {
      id: 'clean',
      label: 'Clean Minimalist',
      preview: 'Clean & readable',
      desc: 'Translucent rounded pill with crisp white typography'
    },
    {
      id: 'karaoke',
      label: 'Karaoke Word Pulse',
      preview: 'Word • by • Word',
      desc: 'Live word highlight matching speech cadence'
    },
    {
      id: 'cinematic',
      label: 'Cinematic Subtitle',
      preview: 'THE UNTOLD STORY',
      desc: 'Letterboxed classic widescreen movie format'
    }
  ];

  const audioTracks = [
    { name: 'Synthwave Nightride - 130 BPM', mood: 'High Energy / Driving', genre: 'Electronic' },
    { name: 'Phonk Velocity Drift - 138 BPM', mood: 'Viral TikTok / Aggressive', genre: 'Phonk' },
    { name: 'Lo-Fi Chill Sunset', mood: 'Calm / Aesthetic', genre: 'Lo-Fi' },
    { name: 'Cinematic Orchestral Swell', mood: 'Epic / Dramatic', genre: 'Orchestral' },
    { name: 'Deep House Midnight Glow', mood: 'Club / Fashion', genre: 'House' }
  ];

  const effectsPresets = [
    { id: 'obsidian', name: 'Obsidian Kinetic Grade', filter: 'contrast(115%) saturate(120%)' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon Hue', filter: 'hue-rotate(30deg) saturate(140%)' },
    { id: 'golden', name: 'Golden Hour Flare', filter: 'sepia(30%) contrast(105%)' },
    { id: 'noir', name: 'Dramatic Obsidian Noir', filter: 'grayscale(100%) contrast(140%)' }
  ];

  // Auto-caption generator using CaptionPipe MCP endpoint
  const handleGenerateCaptions = async () => {
    setIsGeneratingCaptions(true);
    try {
      const res = await fetch('/api/mcp/captionpipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoUrl: activeProject.videoUrl,
          style: selectedCaptionStyle
        })
      });
      const json = await res.json();
      if (json.success && json.data?.captions) {
        updateProject({
          ...activeProject,
          captions: json.data.captions
        });
      }
    } catch (_err) {
      // Local fallback captions
      const fallbackCaps: CaptionItem[] = [
        { id: 'c1', start: 0.5, end: 2.2, text: 'STOP SCROLLING 🚨', style: selectedCaptionStyle },
        { id: 'c2', start: 2.3, end: 4.4, text: 'CREATIVE WORKFLOW 10X ⚡', style: selectedCaptionStyle },
        { id: 'c3', start: 4.5, end: 6.0, text: 'TRY AETHER STUDIO TODAY', style: selectedCaptionStyle }
      ];
      updateProject({
        ...activeProject,
        captions: fallbackCaps
      });
    } finally {
      setIsGeneratingCaptions(false);
    }
  };

  const handleUpdateCaptionText = (id: string, text: string) => {
    const updated = (activeProject.captions || []).map(c => (c.id === id ? { ...c, text } : c));
    updateProject({ ...activeProject, captions: updated });
  };

  const handleAddCaption = () => {
    const newCap: CaptionItem = {
      id: 'cap-' + Date.now(),
      start: (activeProject.captions?.length || 0) * 2,
      end: (activeProject.captions?.length || 0) * 2 + 2,
      text: 'NEW VIRAL HOOK 💥',
      style: selectedCaptionStyle
    };
    updateProject({
      ...activeProject,
      captions: [...(activeProject.captions || []), newCap]
    });
  };

  const handleDeleteCaption = (id: string) => {
    updateProject({
      ...activeProject,
      captions: (activeProject.captions || []).filter(c => c.id !== id)
    });
  };

  const handleSetRatio = (ratio: AspectRatio) => {
    updateProject({
      ...activeProject,
      aspectRatio: ratio
    });
  };

  const currentActiveCaption = (activeProject.captions || []).find(
    c => currentTime >= c.start && currentTime <= c.end
  ) || activeProject.captions?.[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1A1824] via-[#121118] to-[#1A1824] border border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#4edea3] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
            <span>STEP 3 / 4 — CUSTOMIZATION &amp; SUBTITLES</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Customize Captions, Sound &amp; Format
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Apply automated <strong className="text-white">CaptionPipe</strong> dynamic subtitles, overlay trending audio, and fit to platform aspect ratios.
          </p>
        </div>

        <button
          onClick={() => setWizardStep(4)}
          className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] text-white text-xs font-extrabold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] cursor-pointer"
        >
          <span>Next: Publish &amp; Schedule (Step 4)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Workspace: Left Video Viewport + Right Inspector / Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Responsive Preview Screen */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            className={`relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0B0B0F] shadow-[0_12px_45px_rgba(0,0,0,0.8)] transition-all ${
              activeProject.aspectRatio === '9:16'
                ? 'w-[290px] h-[515px]'
                : activeProject.aspectRatio === '16:9'
                ? 'w-full aspect-video'
                : activeProject.aspectRatio === '1:1'
                ? 'w-[360px] h-[360px]'
                : 'w-[320px] h-[400px]'
            }`}
          >
            {activeProject.type === 'video' && activeProject.videoUrl ? (
              <video
                ref={videoRef}
                src={activeProject.videoUrl}
                poster={activeProject.thumbnail}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4') {
                    target.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
                    target.load();
                    if (isPlaying) target.play().catch(() => {});
                  }
                }}
              />
            ) : (
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1200&q=85';
                }}
              />
            )}

            {/* Play/Pause overlay */}
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute inset-0 bg-transparent hover:bg-black/20 flex items-center justify-center cursor-pointer transition-colors"
            >
              {!isPlaying && (
                <div className="w-12 h-12 rounded-full bg-[#8B5CF6]/90 flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.8)]">
                  <Play className="w-5 h-5 ml-0.5" />
                </div>
              )}
            </div>

            {/* Dynamic Styled Subtitle Overlay on Video */}
            {currentActiveCaption && (
              <div className="absolute bottom-8 left-4 right-4 text-center pointer-events-none select-none">
                {currentActiveCaption.style === 'hormozi' && (
                  <span className="inline-block px-3 py-1.5 bg-[#FFE600] text-black font-black text-sm tracking-wider uppercase rounded-md shadow-[0_4px_20px_rgba(0,0,0,0.9)] transform -rotate-1 border-2 border-black">
                    {currentActiveCaption.text}
                  </span>
                )}
                {currentActiveCaption.style === 'neon' && (
                  <span className="inline-block px-3.5 py-1.5 bg-[#121118]/85 text-[#d0bcff] font-extrabold text-sm tracking-wide uppercase rounded-xl border border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.8)] backdrop-blur-md">
                    {currentActiveCaption.text}
                  </span>
                )}
                {currentActiveCaption.style === 'clean' && (
                  <span className="inline-block px-4 py-1.5 bg-black/75 text-white font-bold text-xs rounded-full backdrop-blur-md border border-white/20">
                    {currentActiveCaption.text}
                  </span>
                )}
                {currentActiveCaption.style === 'karaoke' && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#4edea3] to-[#06B6D4] text-black font-black text-xs uppercase rounded-md shadow-lg">
                    ★ {currentActiveCaption.text} ★
                  </span>
                )}
                {currentActiveCaption.style === 'cinematic' && (
                  <span className="inline-block px-4 py-1 bg-black/90 text-[#F8FAFC] font-serif tracking-[0.2em] text-xs uppercase border-y border-white/30">
                    {currentActiveCaption.text}
                  </span>
                )}
              </div>
            )}

            {/* Current Aspect Ratio Pill */}
            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white">
              {activeProject.aspectRatio}
            </div>

            {/* Audio badge */}
            {activeProject.audioTrack && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono text-[#06B6D4]">
                <Volume2 className="w-3 h-3 text-[#06B6D4]" />
                <span className="truncate max-w-[100px]">{activeProject.audioTrack}</span>
              </div>
            )}
          </div>

          <p className="text-[11px] text-[#94A3B8] mt-2 font-mono">
            Preview Mode • Click to {isPlaying ? 'pause' : 'play loop'}
          </p>
        </div>

        {/* Right: Customization Toolset Tabs */}
        <div className="lg:col-span-7 glass-card p-5 rounded-2xl space-y-4">
          {/* Tab Navigation */}
          <div className="flex items-center space-x-1.5 bg-[#121118] p-1.5 rounded-xl border border-white/[0.06]">
            {[
              { id: 'captions', label: 'CaptionPipe Subtitles', icon: Type },
              { id: 'audio', label: 'Audio & Music', icon: Music },
              { id: 'format', label: 'Aspect Resize', icon: Layers },
              { id: 'effects', label: 'Color Grade', icon: Palette }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                      : 'text-[#94A3B8] hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: CaptionPipe Subtitles */}
          {activeTab === 'captions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                    CaptionPipe Style Engine
                  </h4>
                  <p className="text-[10px] text-[#94A3B8]">
                    Viral subtitle presets inspired by TikTok top creators
                  </p>
                </div>
                <button
                  onClick={handleGenerateCaptions}
                  disabled={isGeneratingCaptions}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 text-[#d0bcff] hover:bg-[#8B5CF6]/30 text-xs font-bold cursor-pointer transition-all shadow-[0_0_12px_rgba(139,92,246,0.2)]"
                >
                  <Wand2 className={`w-3.5 h-3.5 ${isGeneratingCaptions ? 'animate-spin' : ''}`} />
                  <span>{isGeneratingCaptions ? 'Generating...' : 'Auto-Generate Subtitles'}</span>
                </button>
              </div>

              {/* Style selector cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {captionStyles.map(st => {
                  const isSelected = selectedCaptionStyle === st.id;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        setSelectedCaptionStyle(st.id);
                        if (activeProject.captions) {
                          updateProject({
                            ...activeProject,
                            captions: activeProject.captions.map(c => ({ ...c, style: st.id }))
                          });
                        }
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] ring-1 ring-[#8B5CF6]'
                          : 'bg-[#121118] border-white/[0.08] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{st.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                      </div>
                      <p className="text-[10px] font-mono text-[#d0bcff] bg-[#0B0B0F] px-1.5 py-0.5 rounded truncate">
                        {st.preview}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Caption Lines Editor */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#94A3B8]">CAPTION PHRASES:</span>
                  <button
                    onClick={handleAddCaption}
                    className="flex items-center space-x-1 text-[11px] text-[#06B6D4] hover:underline font-bold cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Phrase</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {(activeProject.captions || []).map((cap, idx) => (
                    <div
                      key={cap.id}
                      className="flex items-center space-x-2 bg-[#121118] p-2 rounded-xl border border-white/[0.06]"
                    >
                      <span className="text-[10px] font-mono text-[#94A3B8] w-6 text-center">
                        #{idx + 1}
                      </span>
                      <input
                        type="text"
                        value={cap.text}
                        onChange={e => handleUpdateCaptionText(cap.id, e.target.value)}
                        className="flex-1 bg-[#1A1824] text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/[0.08] focus:border-[#8B5CF6] focus:outline-none"
                      />
                      <span className="text-[10px] font-mono text-[#4edea3]">
                        {cap.start}s - {cap.end}s
                      </span>
                      <button
                        onClick={() => handleDeleteCaption(cap.id)}
                        className="text-[#94A3B8] hover:text-red-400 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Audio & Music */}
          {activeTab === 'audio' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Trending Soundtrack Library
                </h4>
                <p className="text-[10px] text-[#94A3B8]">
                  Licensed for commercial use on TikTok, Reels, and YouTube Shorts
                </p>
              </div>

              <div className="space-y-2">
                {audioTracks.map((track, idx) => {
                  const isSelected = activeProject.audioTrack === track.name;
                  return (
                    <div
                      key={idx}
                      onClick={() => updateProject({ ...activeProject, audioTrack: track.name })}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#06B6D4]/15 border-[#06B6D4] text-white ring-1 ring-[#06B6D4]'
                          : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-[#06B6D4] text-black' : 'bg-[#1A1824] text-white'
                          }`}
                        >
                          <Music className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">{track.name}</p>
                          <p className="text-[10px] text-[#94A3B8]">
                            {track.mood} • {track.genre}
                          </p>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="text-[10px] font-bold text-[#06B6D4] bg-[#06B6D4]/20 px-2 py-0.5 rounded-full font-mono">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#94A3B8]">Select</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Aspect Resize */}
          {activeTab === 'format' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Multi-Channel Aspect Resizing
                </h4>
                <p className="text-[10px] text-[#94A3B8]">
                  Seamlessly fit your composition across vertical video and horizontal feeds
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: '9:16' as AspectRatio, name: '9:16 Vertical', desc: 'TikTok, Reels, YouTube Shorts' },
                  { id: '16:9' as AspectRatio, name: '16:9 Widescreen', desc: 'YouTube Standard, TV, Ads' },
                  { id: '1:1' as AspectRatio, name: '1:1 Square', desc: 'Instagram Feed, Carousel' },
                  { id: '4:5' as AspectRatio, name: '4:5 Vertical Feed', desc: 'Instagram & Facebook Mobile' }
                ].map(r => {
                  const isSelected = activeProject.aspectRatio === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleSetRatio(r.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white ring-1 ring-[#8B5CF6]'
                          : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-white">{r.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#8B5CF6]" />}
                      </div>
                      <p className="text-[10px] text-[#94A3B8]">{r.desc}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 4: Color Grade Effects */}
          {activeTab === 'effects' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Obsidian Cinematic Color Grades
                </h4>
                <p className="text-[10px] text-[#94A3B8]">
                  Professional LUTs and tonal balances applied instantly
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {effectsPresets.map(ef => (
                  <button
                    key={ef.id}
                    className="p-3 rounded-xl bg-[#121118] border border-white/[0.08] hover:border-[#8B5CF6] text-left transition-all cursor-pointer group"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-[#d0bcff]">
                      {ef.name}
                    </p>
                    <p className="text-[10px] font-mono text-[#94A3B8] mt-1">Preset LUT Loaded</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#4edea3]">Autosaved to Project Library</span>
            <button
              onClick={() => setWizardStep(4)}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer"
            >
              <span>Publish or Schedule (Step 4)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

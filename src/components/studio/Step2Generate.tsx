import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Download,
  Share2,
  Check,
  Film,
  Zap,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Step2Generate: React.FC = () => {
  const {
    activeProject,
    isGenerating,
    generationProgress,
    handleGenerate,
    setWizardStep,
    setCurrentTab
  } = useApp();

  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<number>(1);
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

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="glass-card p-10 rounded-3xl relative overflow-hidden max-w-xl mx-auto border border-[#8B5CF6]/30 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1A1824]">
            <div
              className="h-full bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#4edea3] transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            />
          </div>

          {/* Kinetic pulsating rings */}
          <div className="relative w-28 h-28 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#8B5CF6]/40 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-[#06B6D4]/50 animate-pulse" />
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.8)]">
              <Cpu className="w-8 h-8 text-white animate-spin" />
            </div>
          </div>

          <h3 className="text-xl font-extrabold text-white font-['Plus_Jakarta_Sans'] mb-2">
            Synthesizing Neural Frames...
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-6">
            Dispatching latent guidance through <strong className="text-white">Seedance 2.0 / Nanobanana MCP</strong> pipeline.
          </p>

          <div className="bg-[#121118] p-3.5 rounded-xl border border-white/[0.06] text-left text-xs font-mono space-y-1.5 mb-6">
            <div className="flex justify-between text-[#94A3B8]">
              <span>Pipeline:</span>
              <span className="text-[#06B6D4]">smithery.ai/abigail-seto</span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Inference Stage:</span>
              <span className="text-[#4edea3]">
                {generationProgress < 40
                  ? 'Latent Diffusion Denoising'
                  : generationProgress < 75
                  ? 'Temporal Motion Interpolation 60FPS'
                  : 'Anamorphic HDR Color Pass'}
              </span>
            </div>
            <div className="flex justify-between text-[#94A3B8]">
              <span>Progress:</span>
              <span className="text-white font-bold">{generationProgress}%</span>
            </div>
          </div>

          <div className="w-full bg-[#0B0B0F] h-2.5 rounded-full overflow-hidden border border-white/[0.08]">
            <div
              className="bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] h-full transition-all duration-300"
              style={{ width: `${generationProgress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (!activeProject) {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center glass-card p-8 rounded-2xl">
        <Sparkles className="w-12 h-12 text-[#8B5CF6] mx-auto mb-3" />
        <h3 className="text-lg font-bold text-white mb-2">No Active Generation Found</h3>
        <p className="text-xs text-[#94A3B8] mb-4">
          Start by describing your vision in Step 1 to trigger neural synthesis.
        </p>
        <button
          onClick={() => setWizardStep(1)}
          className="px-6 py-2.5 rounded-full bg-[#8B5CF6] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)]"
        >
          Go to Step 1: Describe
        </button>
      </div>
    );
  }

  // Variations list tailored to project type
  const variations = activeProject.type === 'video'
    ? [
        {
          id: 1,
          name: 'Variation A (High Dynamic)',
          thumb: activeProject.thumbnail,
          videoUrl: activeProject.videoUrl || 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          badge: 'Selected'
        },
        {
          id: 2,
          name: 'Variation B (Cinematic Bloom)',
          thumb: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=400&q=80',
          videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
          badge: 'Alternative'
        },
        {
          id: 3,
          name: 'Variation C (Anamorphic Drift)',
          thumb: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
          videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
          badge: 'Alternative'
        }
      ]
    : [
        {
          id: 1,
          name: 'Variation A (Studio Staging)',
          thumb: activeProject.thumbnail,
          videoUrl: '',
          badge: 'Selected'
        },
        {
          id: 2,
          name: 'Variation B (Obsidian Grade)',
          thumb: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80',
          videoUrl: '',
          badge: 'Alternative'
        },
        {
          id: 3,
          name: 'Variation C (Ambient Neon)',
          thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
          videoUrl: '',
          badge: 'Alternative'
        }
      ];

  const currentVar = variations.find(v => v.id === selectedVariation) || variations[0];
  const activeThumb = currentVar.thumb || activeProject.thumbnail;
  const activeVideo = currentVar.videoUrl || activeProject.videoUrl;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1A1824] via-[#121118] to-[#1A1824] border border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#06B6D4] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span>STEP 2 / 4 — GENERATION PREVIEW &amp; VARIATIONS</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Review Generated AI Media
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Synthesized via <strong className="text-white">{activeProject.model}</strong>. Pick a variation or regenerate with fresh seed.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleGenerate()}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#1A1824] border border-white/[0.1] hover:border-[#8B5CF6] text-white text-xs font-bold transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8B5CF6]" />
            <span>Regenerate</span>
          </button>
          <button
            onClick={() => setWizardStep(3)}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.4)] cursor-pointer"
          >
            <span>Customize (Step 3)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Media Viewport */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            className={`relative rounded-2xl overflow-hidden border border-white/[0.1] bg-[#0B0B0F] shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${
              activeProject.aspectRatio === '9:16'
                ? 'w-[290px] h-[515px]'
                : activeProject.aspectRatio === '16:9'
                ? 'w-full aspect-video'
                : activeProject.aspectRatio === '1:1'
                ? 'w-[360px] h-[360px]'
                : 'w-[320px] h-[400px]'
            }`}
          >
            {activeProject.type === 'video' ? (
              <div className="w-full h-full relative group">
                <video
                  ref={videoRef}
                  src={activeVideo}
                  poster={activeThumb}
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
                {/* Floating overlay play button */}
                <div
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="absolute inset-0 bg-black/25 flex items-center justify-center cursor-pointer transition-opacity group-hover:bg-black/35"
                >
                  <div className="w-14 h-14 rounded-full bg-[#8B5CF6]/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_25px_rgba(139,92,246,0.8)] transform group-hover:scale-110 transition-transform">
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
                  </div>
                </div>

                {/* Simulated live subtitle preview badge */}
                <div className="absolute bottom-4 left-3 right-3 text-center pointer-events-none">
                  <span className="px-3 py-1 rounded bg-black/80 border border-[#8B5CF6]/60 text-white font-extrabold text-xs shadow-lg uppercase tracking-wide">
                    {activeProject.captions?.[0]?.text || 'NEXT-GEN AI GENERATED 🔥'}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <img
                  src={activeThumb}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85';
                  }}
                />
              </div>
            )}

            {/* Badge top-left */}
            <div className="absolute top-3 left-3 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/[0.1] text-[10px] font-mono text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
              <span>{activeProject.aspectRatio}</span>
              <span>•</span>
              <span>{activeProject.type.toUpperCase()}</span>
            </div>

            {/* Model note top-right */}
            <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#8B5CF6]/80 text-white text-[9px] font-mono font-bold uppercase">
              {activeProject.type === 'video' ? 'Seedance 2.0' : 'Nanobanana Pro'}
            </div>
          </div>

          <div className="mt-3 flex items-center space-x-3 text-xs text-[#94A3B8]">
            <span>Click canvas to {isPlaying ? 'pause' : 'play loop'}</span>
            <span>•</span>
            <button
              onClick={() => {
                setCurrentTab('editor');
              }}
              className="text-[#06B6D4] hover:underline flex items-center space-x-1 font-semibold cursor-pointer"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Open in Multi-Track Timeline Editor</span>
            </button>
          </div>
        </div>

        {/* Right: Variations & Metadata Drawer */}
        <div className="lg:col-span-5 space-y-4">
          {/* Variations Selector */}
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-[#8B5CF6]" />
                <span>Generated Variations</span>
              </label>
              <span className="text-[10px] font-mono text-[#94A3B8]">3 Renders</span>
            </div>

            <div className="space-y-2">
              {variations.map(v => {
                const isSelected = selectedVariation === v.id;
                return (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVariation(v.id)}
                    className={`flex items-center space-x-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]'
                        : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                    }`}
                  >
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#0B0B0F] shrink-0 border border-white/[0.1]">
                      <img src={v.thumb} alt={v.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-xs font-bold text-white truncate">{v.name}</p>
                      <p className="text-[10px] text-[#94A3B8]">60fps • Anamorphic Grade</p>
                    </div>
                    {isSelected ? (
                      <span className="px-2 py-0.5 rounded bg-[#8B5CF6] text-white text-[10px] font-bold font-mono">
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#94A3B8] font-mono hover:text-white">
                        Select
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Prompt & Generation Metadata Card */}
          <div className="glass-card p-4 rounded-2xl space-y-2.5 text-xs">
            <div className="flex items-center justify-between text-[#94A3B8] font-mono text-[11px] border-b border-white/[0.06] pb-2">
              <span>SYNTHESIS METRICS</span>
              <span className="text-[#4edea3]">Rendered in 3.8s</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Prompt Prompted:</span>
              <p className="text-white bg-[#121118] p-2.5 rounded-xl border border-white/[0.06] text-xs leading-relaxed max-h-24 overflow-y-auto font-['Plus_Jakarta_Sans']">
                {activeProject.prompt}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#94A3B8] pt-1">
              <div className="bg-[#121118] p-2 rounded-lg border border-white/[0.04]">
                <span className="block text-[9px] text-[#958ea0]">MODEL</span>
                <span className="text-white font-semibold">{activeProject.model}</span>
              </div>
              <div className="bg-[#121118] p-2 rounded-lg border border-white/[0.04]">
                <span className="block text-[9px] text-[#958ea0]">ASPECT</span>
                <span className="text-white font-semibold">{activeProject.aspectRatio}</span>
              </div>
            </div>
          </div>

          {/* Action to Step 3 */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1A1824] to-[#121118] border border-[#8B5CF6]/30">
            <h4 className="text-xs font-bold text-white mb-1">Ready to add captions &amp; music?</h4>
            <p className="text-[11px] text-[#94A3B8] mb-3">
              Proceed to Step 3 to auto-transcribe subtitles with <strong className="text-white">CaptionPipe</strong> and resize for all social feeds.
            </p>
            <button
              onClick={() => setWizardStep(3)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] text-white text-xs font-extrabold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_28px_rgba(139,92,246,0.6)] cursor-pointer transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>Customize Content (Step 3)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

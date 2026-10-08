import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Scissors,
  Type,
  Music,
  Sparkles,
  Download,
  Share2,
  Layers,
  ZoomIn,
  ZoomOut,
  Undo2,
  Redo2,
  Plus,
  Trash2,
  Eye,
  Sliders,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AspectRatio, CaptionItem, CaptionStyle } from '../../types';

export const EditorView: React.FC = () => {
  const { activeProject, updateProject, setWizardStep, setCurrentTab, showToast } = useApp();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playheadTime, setPlayheadTime] = useState<number>(1.5);
  const [timelineZoom, setTimelineZoom] = useState<number>(1);
  const [selectedTrack, setSelectedTrack] = useState<'video' | 'captions' | 'audio'>('captions');
  const [selectedCaptionId, setSelectedCaptionId] = useState<string | null>(null);

  const totalDuration = activeProject?.duration || 6.4;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Playhead animation loop when playing
  useEffect(() => {
    let animId: number;
    let lastStamp = performance.now();

    const loop = (stamp: number) => {
      const delta = (stamp - lastStamp) / 1000;
      lastStamp = stamp;

      if (isPlaying) {
        setPlayheadTime(prev => {
          const next = prev + delta;
          if (next >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, totalDuration]);

  if (!activeProject) {
    return (
      <div className="max-w-md mx-auto py-20 text-center glass-card p-8 rounded-2xl">
        <p className="text-white text-sm mb-4">No active video or project to edit.</p>
        <button
          onClick={() => {
            setCurrentTab('studio');
            setWizardStep(1);
          }}
          className="px-6 py-2.5 rounded-full bg-[#8B5CF6] text-white text-xs font-bold"
        >
          Create New in AI Studio
        </button>
      </div>
    );
  }

  const captions = activeProject.captions || [];
  const activeCaption = captions.find(
    c => playheadTime >= c.start && playheadTime <= c.end
  ) || captions[0];

  const formatTimecode = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = Math.floor(sec % 60);
    const millis = Math.floor((sec % 1) * 100);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(millis).padStart(2, '0')}`;
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * totalDuration;
    setPlayheadTime(newTime);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-[#0B0B0F] text-[#e4e1e7] select-none">
      {/* Top CapCut / Canva-inspired Editor Toolbar */}
      <div className="h-14 border-b border-white/[0.08] bg-[#121118] px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 pr-3 border-r border-white/[0.08]">
            <span className="text-xs font-mono font-bold text-white truncate max-w-[200px]">
              {activeProject.title}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#8B5CF6]/20 text-[#d0bcff]">
              {activeProject.aspectRatio}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-1">
            <button
              title="Split clip at playhead"
              className="p-2 rounded-lg bg-[#1A1824] hover:bg-[#242233] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <Scissors className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const newCap: CaptionItem = {
                  id: 'c-' + Date.now(),
                  start: Number(playheadTime.toFixed(1)),
                  end: Number((playheadTime + 2).toFixed(1)),
                  text: 'NEW CAPTION HOOK 🔥',
                  style: 'hormozi'
                };
                updateProject({
                  ...activeProject,
                  captions: [...captions, newCap]
                });
              }}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#1A1824] hover:bg-[#242233] text-xs font-semibold text-[#06B6D4] transition-colors cursor-pointer"
            >
              <Type className="w-3.5 h-3.5" />
              <span>+ Caption</span>
            </button>
            <button
              onClick={() =>
                updateProject({
                  ...activeProject,
                  audioTrack: 'Synthwave Nightride - 130 BPM'
                })
              }
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-[#1A1824] hover:bg-[#242233] text-xs font-semibold text-[#4edea3] transition-colors cursor-pointer"
            >
              <Music className="w-3.5 h-3.5" />
              <span>+ Audio Track</span>
            </button>
          </div>
        </div>

        {/* Right side controls: Undo/Redo, Export */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-[#94A3B8] pr-2 border-r border-white/[0.08]">
            <button className="p-1.5 hover:text-white rounded hover:bg-[#1A1824] cursor-pointer">
              <Undo2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:text-white rounded hover:bg-[#1A1824] cursor-pointer">
              <Redo2 className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              setCurrentTab('studio');
              setWizardStep(4);
            }}
            className="flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.35)] cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Publish / Schedule</span>
          </button>
        </div>
      </div>

      {/* Center Viewport + Inspector Panel */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Canvas Viewport */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-[#0B0B0F] relative overflow-hidden">
          {/* Aspect ratio frame */}
          <div
            className={`relative rounded-2xl overflow-hidden border border-white/[0.12] bg-black shadow-[0_16px_50px_rgba(0,0,0,0.9)] flex items-center justify-center transition-all ${
              activeProject.aspectRatio === '9:16'
                ? 'w-[280px] h-[498px]'
                : activeProject.aspectRatio === '16:9'
                ? 'w-[640px] aspect-video'
                : activeProject.aspectRatio === '1:1'
                ? 'w-[380px] h-[380px]'
                : 'w-[320px] h-[400px]'
            }`}
          >
            {activeProject.type === 'video' && activeProject.videoUrl ? (
              <video
                ref={videoRef}
                src={activeProject.videoUrl}
                poster={activeProject.thumbnail}
                className="w-full h-full object-cover pointer-events-none"
                muted
              />
            ) : (
              <img
                src={activeProject.thumbnail}
                alt={activeProject.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Subtitle Overlay Rendering based on playhead position */}
            {activeCaption && (
              <div className="absolute bottom-8 left-3 right-3 text-center pointer-events-none">
                {activeCaption.style === 'hormozi' && (
                  <span className="inline-block px-3.5 py-1.5 bg-[#FFE600] text-black font-black text-sm uppercase rounded-md shadow-2xl border-2 border-black tracking-wide">
                    {activeCaption.text}
                  </span>
                )}
                {activeCaption.style === 'neon' && (
                  <span className="inline-block px-3.5 py-1.5 bg-[#121118]/90 text-[#d0bcff] font-extrabold text-sm uppercase rounded-xl border border-[#8B5CF6] shadow-[0_0_20px_rgba(139,92,246,0.8)] backdrop-blur-md">
                    {activeCaption.text}
                  </span>
                )}
                {activeCaption.style === 'clean' && (
                  <span className="inline-block px-4 py-1.5 bg-black/80 text-white font-bold text-xs rounded-full backdrop-blur-md border border-white/20">
                    {activeCaption.text}
                  </span>
                )}
                {activeCaption.style === 'karaoke' && (
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#4edea3] to-[#06B6D4] text-black font-black text-xs uppercase rounded-md">
                    ★ {activeCaption.text} ★
                  </span>
                )}
                {activeCaption.style === 'cinematic' && (
                  <span className="inline-block px-4 py-1 bg-black/90 text-[#F8FAFC] font-serif tracking-widest text-xs uppercase border-y border-white/30">
                    {activeCaption.text}
                  </span>
                )}
              </div>
            )}

            {/* Canvas grid guide watermark */}
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-[#94A3B8]">
              {activeProject.aspectRatio} Safe Zone
            </div>
          </div>

          {/* Canvas Playback Controls Bar */}
          <div className="mt-3 flex items-center space-x-4 bg-[#121118] px-4 py-2 rounded-full border border-white/[0.08] shadow-lg">
            <button
              onClick={() => setPlayheadTime(0)}
              className="text-[#94A3B8] hover:text-white cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center hover:bg-[#7C3AED] transition-all cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={() => setPlayheadTime(totalDuration)}
              className="text-[#94A3B8] hover:text-white cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <span className="text-xs font-mono font-bold text-white px-2">
              {formatTimecode(playheadTime)} / {formatTimecode(totalDuration)}
            </span>

            <div className="flex items-center space-x-1 pl-2 border-l border-white/[0.08]">
              <Volume2 className="w-4 h-4 text-[#94A3B8]" />
              <div className="w-16 h-1 bg-[#1A1824] rounded-full overflow-hidden">
                <div className="w-3/4 h-full bg-[#06B6D4]" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Context Inspector Panel */}
        <div className="w-80 border-l border-white/[0.08] bg-[#121118] p-4 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2">
              <span className="text-xs font-mono font-bold uppercase text-white">
                Inspector
              </span>
              <span className="text-[10px] font-mono text-[#06B6D4]">
                {selectedTrack.toUpperCase()} PROPERTIES
              </span>
            </div>

            {/* Caption style picker */}
            <div>
              <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-2">
                Caption Preset Style
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['hormozi', 'neon', 'clean', 'karaoke', 'cinematic'] as CaptionStyle[]).map(st => (
                  <button
                    key={st}
                    onClick={() => {
                      updateProject({
                        ...activeProject,
                        captions: captions.map(c => ({ ...c, style: st }))
                      });
                    }}
                    className={`p-2 rounded-lg text-xs font-bold capitalize text-left border cursor-pointer ${
                      activeCaption?.style === st
                        ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white ring-1 ring-[#8B5CF6]'
                        : 'bg-[#1A1824] border-white/[0.06] text-[#94A3B8] hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Audio Track Inspector */}
            <div className="pt-2 border-t border-white/[0.06]">
              <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                Audio Bed
              </label>
              <p className="text-xs font-bold text-white truncate">
                {activeProject.audioTrack || 'Synthwave Nightride - 130 BPM'}
              </p>
              <p className="text-[10px] text-[#4edea3] mt-0.5 font-mono">
                Audio Ducking Enabled (Auto-levels behind speech)
              </p>
            </div>

            {/* Model Generation Specs */}
            <div className="pt-2 border-t border-white/[0.06] space-y-1 text-[11px] font-mono">
              <div className="flex justify-between text-[#94A3B8]">
                <span>Engine:</span>
                <span className="text-white">Seedance 2.0</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>Pipeline:</span>
                <span className="text-[#06B6D4]">CaptionPipe v2</span>
              </div>
              <div className="flex justify-between text-[#94A3B8]">
                <span>FPS:</span>
                <span className="text-[#4edea3]">60 fps Ultra</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <button
              onClick={() => {
                showToast('Exporting 4K 60FPS video with embedded CaptionPipe subtitles...');
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-full bg-[#1A1824] hover:bg-[#242233] text-white border border-white/[0.1] text-xs font-bold transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Rendered MP4</span>
            </button>
          </div>
        </div>
      </div>

      {/* CapCut-inspired Multi-Track Horizontal Ribbon Timeline */}
      <div className="h-64 border-t border-white/[0.08] bg-[#121118] flex flex-col shrink-0">
        {/* Timeline Header strip with time markings */}
        <div className="h-8 border-b border-white/[0.06] bg-[#0E0E12] px-4 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <div className="flex items-center space-x-4">
            <span className="text-[#06B6D4] font-bold">TIMELINE</span>
            <span>00:00</span>
            <span>00:02</span>
            <span>00:04</span>
            <span>00:06</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setTimelineZoom(Math.max(0.7, timelineZoom - 0.2))}
              className="p-1 hover:text-white cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px]">{Math.round(timelineZoom * 100)}%</span>
            <button
              onClick={() => setTimelineZoom(Math.min(2, timelineZoom + 0.2))}
              className="p-1 hover:text-white cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tracks Area with Razor-thin 1.5px Neon Cyan Playhead Laser */}
        <div
          onClick={handleTimelineClick}
          className="flex-1 p-3 space-y-2 relative overflow-x-auto overflow-y-hidden cursor-crosshair bg-[#0B0B0F]/90"
        >
          {/* Vertical Playhead Needle with Diamond Head */}
          <div
            className="absolute top-0 bottom-0 pointer-events-none z-30 transition-none"
            style={{
              left: `${(playheadTime / totalDuration) * 100}%`
            }}
          >
            {/* Diamond Head Handle */}
            <div className="w-3 h-3 bg-[#06B6D4] rotate-45 -ml-1.5 shadow-[0_0_10px_#06B6D4]" />
            {/* Razor-thin 1.5px vertical laser line */}
            <div className="w-[1.5px] h-full bg-[#06B6D4] shadow-[0_0_8px_#06B6D4]" />
          </div>

          {/* Track 1: Subtitle & Captions Strip */}
          <div className="h-10 rounded-xl bg-[#1A1824]/80 border border-[#8B5CF6]/30 flex items-center px-2 relative overflow-hidden group">
            <span className="text-[10px] font-mono text-[#d0bcff] uppercase w-20 shrink-0 flex items-center space-x-1">
              <Type className="w-3 h-3 text-[#8B5CF6]" />
              <span>Captions</span>
            </span>
            <div className="flex-1 flex items-center space-x-1.5 h-7 relative">
              {captions.map(c => {
                const widthPct = Math.max(15, ((c.end - c.start) / totalDuration) * 100);
                return (
                  <div
                    key={c.id}
                    onClick={ev => {
                      ev.stopPropagation();
                      setSelectedCaptionId(c.id);
                      setPlayheadTime(c.start);
                    }}
                    style={{ width: `${widthPct}%` }}
                    className="h-full rounded-lg bg-gradient-to-r from-[#8B5CF6]/40 to-[#7C3AED]/40 border border-[#8B5CF6] px-2 flex items-center justify-between text-[10px] font-bold text-white truncate cursor-pointer hover:bg-[#8B5CF6]/60 transition-colors shadow-sm"
                  >
                    <span className="truncate">{c.text}</span>
                    <span className="text-[9px] font-mono text-[#d0bcff] shrink-0 ml-1">
                      {c.start}s
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Track 2: Video Media Strip (Thumbnails) */}
          <div className="h-14 rounded-xl bg-[#1A1824]/80 border border-white/[0.08] flex items-center px-2 relative overflow-hidden">
            <span className="text-[10px] font-mono text-[#94A3B8] uppercase w-20 shrink-0 flex items-center space-x-1">
              <Layers className="w-3 h-3 text-[#06B6D4]" />
              <span>Video</span>
            </span>
            <div className="flex-1 h-10 rounded-lg bg-[#0B0B0F] border border-white/[0.1] flex overflow-hidden relative">
              {/* Repeating filmstrip thumbnails */}
              <div className="flex-1 flex overflow-hidden">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="flex-1 h-full border-r border-black/40 overflow-hidden">
                    <img
                      src={activeProject.thumbnail}
                      alt="frame"
                      className="w-full h-full object-cover opacity-70"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute top-1 left-2 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white">
                Seedance 2.0 (Master Clip)
              </div>
            </div>
          </div>

          {/* Track 3: Audio Waveform Strip */}
          <div className="h-10 rounded-xl bg-[#1A1824]/80 border border-[#06B6D4]/30 flex items-center px-2 relative overflow-hidden">
            <span className="text-[10px] font-mono text-[#06B6D4] uppercase w-20 shrink-0 flex items-center space-x-1">
              <Music className="w-3 h-3 text-[#06B6D4]" />
              <span>Audio</span>
            </span>
            <div className="flex-1 h-7 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/40 flex items-center px-3 justify-between">
              <span className="text-[10px] font-mono text-[#06B6D4] font-bold truncate">
                ♫ {activeProject.audioTrack || 'Synthwave Nightride - 130 BPM'}
              </span>
              {/* Simulated sound waves */}
              <div className="flex items-center space-x-0.5 h-3">
                {[6, 12, 8, 16, 20, 14, 10, 18, 12, 14, 8, 18, 22, 14, 10, 16].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}px` }}
                    className="w-1 bg-[#06B6D4] rounded-full opacity-80"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

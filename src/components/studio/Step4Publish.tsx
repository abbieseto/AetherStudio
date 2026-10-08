import React, { useState } from 'react';
import {
  Send,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  Share2,
  Hash,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Step4Publish: React.FC = () => {
  const {
    activeProject,
    socialAccounts,
    toggleSocialAccount,
    addScheduledPost,
    setCurrentTab,
    resetStudioWorkflow
  } = useApp();

  const [selectedPlatforms, setSelectedPlatforms] = useState<('tiktok' | 'instagram' | 'youtube')[]>([
    'tiktok',
    'instagram'
  ]);
  const [postCaption, setPostCaption] = useState<string>(
    activeProject
      ? `${activeProject.title} 🔥 Built with Aether Studio AI #seedance #viral #creator`
      : 'Unreal cinematic AI output 🔥 Created with Aether Studio'
  );
  const [hashtags, setHashtags] = useState<string[]>([
    '#aivideo',
    '#seedance2',
    '#creators',
    '#viralcontent',
    '#editing',
    '#cyberpunk'
  ]);
  const [scheduleMode, setScheduleMode] = useState<'immediate' | 'schedule'>('immediate');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-10-08T18:00');
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!activeProject) {
    return (
      <div className="max-w-md mx-auto py-16 text-center glass-card p-8 rounded-2xl">
        <p className="text-white text-sm mb-4">No project ready to publish.</p>
        <button
          onClick={() => setCurrentTab('studio')}
          className="px-5 py-2 rounded-full bg-[#8B5CF6] text-white text-xs font-bold"
        >
          Go to AI Studio
        </button>
      </div>
    );
  }

  const togglePlatform = (p: 'tiktok' | 'instagram' | 'youtube') => {
    setSelectedPlatforms(prev =>
      prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]
    );
  };

  const handlePublishSubmit = async () => {
    if (selectedPlatforms.length === 0) return;
    setIsPublishing(true);

    try {
      addScheduledPost({
        projectId: activeProject.id,
        title: activeProject.title,
        platforms: selectedPlatforms,
        scheduledTime: scheduleMode === 'schedule' ? scheduledDate : new Date().toISOString(),
        status: scheduleMode === 'schedule' ? 'scheduled' : 'published',
        caption: postCaption,
        hashtags: hashtags,
        engagement:
          scheduleMode === 'immediate'
            ? { views: 42, likes: 12, shares: 3 }
            : undefined
      });

      setTimeout(() => {
        setIsPublishing(false);
        setIsSuccess(true);
      }, 900);
    } catch (_err) {
      setIsPublishing(false);
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4 text-center">
        <div className="glass-card p-8 rounded-3xl border border-[#10B981]/40 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
          <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981] flex items-center justify-center mx-auto mb-4 text-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.5)]">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] mb-2">
            {scheduleMode === 'immediate' ? 'Dispatched to Social Feeds!' : 'Scheduled on Content Calendar!'}
          </h3>
          <p className="text-xs text-[#94A3B8] max-w-md mx-auto mb-6">
            Your generation has been queued for {selectedPlatforms.map(p => p.toUpperCase()).join(' & ')}. Webhooks are transmitting to connected accounts.
          </p>

          <div className="bg-[#121118] p-4 rounded-2xl border border-white/[0.06] flex items-center space-x-4 max-w-md mx-auto mb-6 text-left">
            <img
              src={activeProject.thumbnail}
              alt={activeProject.title}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{activeProject.title}</p>
              <p className="text-[10px] text-[#94A3B8] truncate">{postCaption}</p>
              <div className="flex gap-1 mt-1">
                {selectedPlatforms.map(p => (
                  <span
                    key={p}
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#8B5CF6]/20 text-[#d0bcff]"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentTab('calendar')}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#06B6D4] text-black text-xs font-extrabold shadow-[0_0_15px_rgba(6,182,212,0.4)] cursor-pointer"
            >
              View in Publishing Calendar
            </button>
            <button
              onClick={() => {
                resetStudioWorkflow();
                setIsSuccess(false);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#1A1824] hover:bg-[#242233] text-white text-xs font-bold border border-white/[0.1] cursor-pointer"
            >
              Create New Generation
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#1A1824] via-[#121118] to-[#1A1824] border border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#06B6D4] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span>STEP 4 / 4 — MULTI-CHANNEL DISTRIBUTION</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Publish or Schedule Posts
          </h2>
          <p className="text-xs text-[#94A3B8] mt-1">
            Distribute directly to <strong className="text-white">TikTok, Instagram Reels &amp; YouTube Shorts</strong> with optimized metadata.
          </p>
        </div>

        <button
          onClick={handlePublishSubmit}
          disabled={isPublishing || selectedPlatforms.length === 0}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] text-white text-xs font-extrabold shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] cursor-pointer disabled:opacity-40"
        >
          <Send className="w-4 h-4" />
          <span>{scheduleMode === 'immediate' ? 'Publish Immediately' : 'Confirm Schedule'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Target Platforms & Media Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Media Card */}
          <div className="glass-card p-4 rounded-2xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-20 rounded-xl overflow-hidden bg-[#0B0B0F] border border-white/10 shrink-0">
                <img
                  src={activeProject.thumbnail}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-mono text-[#d0bcff] uppercase">Output Asset</span>
                <p className="text-xs font-bold text-white truncate">{activeProject.title}</p>
                <p className="text-[10px] text-[#94A3B8] mt-0.5">
                  Aspect: {activeProject.aspectRatio} • {activeProject.captions?.length || 0} Subtitle layers
                </p>
              </div>
            </div>
          </div>

          {/* Connected Accounts Selector */}
          <div className="glass-card p-4 rounded-2xl space-y-3">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center justify-between">
              <span>Select Destination Feeds</span>
              <span className="text-[10px] text-[#06B6D4] font-normal cursor-pointer" onClick={() => setCurrentTab('social')}>
                Manage Accounts →
              </span>
            </label>

            <div className="space-y-2">
              {socialAccounts.map(acc => {
                const isSelected = selectedPlatforms.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => {
                      if (!acc.connected) {
                        toggleSocialAccount(acc.id);
                      }
                      togglePlatform(acc.id);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.2)]'
                        : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-[#1A1824] border border-white/10 shrink-0">
                        <img src={acc.avatar} alt={acc.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-bold text-white flex items-center space-x-1.5">
                          <span>{acc.name}</span>
                          <span className="text-[9px] font-mono text-[#94A3B8]">{acc.handle}</span>
                        </p>
                        <p className="text-[10px] text-[#4edea3] font-mono">
                          {acc.followers} followers • {acc.monthlyViews}/mo views
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isSelected ? (
                        <span className="w-5 h-5 rounded-full bg-[#8B5CF6] text-white flex items-center justify-center text-xs font-bold">
                          ✓
                        </span>
                      ) : (
                        <span className="w-5 h-5 rounded-full border border-white/20" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Caption, Hashtags & Timing */}
        <div className="lg:col-span-7 glass-card p-5 rounded-2xl space-y-4">
          {/* Post Caption */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                Social Caption &amp; Hook
              </label>
              <span className="text-[10px] text-[#94A3B8]">{postCaption.length} / 2200</span>
            </div>
            <textarea
              value={postCaption}
              onChange={e => setPostCaption(e.target.value)}
              rows={3}
              className="w-full bg-[#121118] text-white text-xs rounded-xl p-3 border border-white/[0.1] focus:border-[#8B5CF6] focus:outline-none"
            />
          </div>

          {/* Hashtag Cloud */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-white flex items-center space-x-1.5">
                <Hash className="w-3.5 h-3.5 text-[#06B6D4]" />
                <span>Viral Hashtags</span>
              </label>
              <button
                onClick={() =>
                  setHashtags(prev => [...prev, '#aetherstudio', '#aitrends'])
                }
                className="text-[10px] font-mono text-[#06B6D4] hover:underline cursor-pointer"
              >
                + Suggest More
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-[#121118] border border-white/[0.08] text-[#d0bcff] text-[11px] font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Timing Switcher */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <label className="text-xs font-bold font-mono uppercase tracking-wider text-white">
              Publication Schedule
            </label>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setScheduleMode('immediate')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  scheduleMode === 'immediate'
                    ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-white ring-1 ring-[#8B5CF6]'
                    : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-bold text-white mb-0.5">
                  <Send className="w-3.5 h-3.5 text-[#8B5CF6]" />
                  <span>Publish Immediately</span>
                </div>
                <p className="text-[10px] text-[#94A3B8]">Dispatch now to connected APIs</p>
              </button>

              <button
                onClick={() => setScheduleMode('schedule')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  scheduleMode === 'schedule'
                    ? 'bg-[#06B6D4]/15 border-[#06B6D4] text-white ring-1 ring-[#06B6D4]'
                    : 'bg-[#121118] border-white/[0.08] text-[#94A3B8] hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-2 text-xs font-bold text-white mb-0.5">
                  <Calendar className="w-3.5 h-3.5 text-[#06B6D4]" />
                  <span>Schedule for Best Time</span>
                </div>
                <p className="text-[10px] text-[#94A3B8]">Peak audience engagement queue</p>
              </button>
            </div>

            {scheduleMode === 'schedule' && (
              <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#94A3B8]">Target Date &amp; Time:</span>
                <input
                  type="datetime-local"
                  value={scheduledDate}
                  onChange={e => setScheduledDate(e.target.value)}
                  className="bg-[#1A1824] text-white text-xs px-2.5 py-1.5 rounded-lg border border-white/[0.1] focus:border-[#06B6D4] focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Dispatch Button */}
          <div className="pt-3">
            <button
              onClick={handlePublishSubmit}
              disabled={isPublishing || selectedPlatforms.length === 0}
              className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-full bg-gradient-to-r from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] text-white text-xs font-extrabold shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] cursor-pointer disabled:opacity-40 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>
                {isPublishing
                  ? 'Transmitting Webhooks...'
                  : scheduleMode === 'immediate'
                  ? 'Broadcast to All Selected Channels'
                  : 'Add to Publishing Calendar'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

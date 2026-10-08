import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  Send,
  Plus,
  TrendingUp,
  Share2,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CalendarView: React.FC = () => {
  const { scheduledPosts, setCurrentTab, setWizardStep, showToast } = useApp();
  const [selectedDay, setSelectedDay] = useState<number>(8);

  const days = [
    { day: 'Mon', date: 5, active: false },
    { day: 'Tue', date: 6, active: false },
    { day: 'Wed', date: 7, active: false },
    { day: 'Thu', date: 8, active: true },
    { day: 'Fri', date: 9, active: false },
    { day: 'Sat', date: 10, active: false },
    { day: 'Sun', date: 11, active: false }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-[#06B6D4] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
            <span>CROSS-PLATFORM CONTENT PIPELINE</span>
          </div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Publishing Calendar
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Auto-post schedule for TikTok, Instagram Reels, and YouTube Shorts.
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentTab('studio');
            setWizardStep(1);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule New Video</span>
        </button>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Scheduled Posts</span>
          <p className="text-2xl font-black text-white mt-1">{scheduledPosts.length}</p>
          <span className="text-[10px] text-[#4edea3] font-mono">Ready to broadcast</span>
        </div>
        <div className="glass-card p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Estimated Reach</span>
          <p className="text-2xl font-black text-[#06B6D4] mt-1">280K+</p>
          <span className="text-[10px] text-[#94A3B8] font-mono">Based on peak algorithms</span>
        </div>
        <div className="glass-card p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Best Time Today</span>
          <p className="text-2xl font-black text-[#d0bcff] mt-1">18:30</p>
          <span className="text-[10px] text-[#94A3B8] font-mono">Optimal TikTok / Reels window</span>
        </div>
        <div className="glass-card p-4 rounded-2xl">
          <span className="text-[10px] font-mono text-[#94A3B8] uppercase">Publishing Success</span>
          <p className="text-2xl font-black text-[#10B981] mt-1">100%</p>
          <span className="text-[10px] text-[#10B981] font-mono">Webhooks Active</span>
        </div>
      </div>

      {/* Weekly Date Navigator */}
      <div className="glass-card p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono font-bold text-white uppercase">October 2026</span>
            <span className="text-[11px] text-[#94A3B8]">Week 41</span>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded hover:bg-[#1A1824] text-[#94A3B8] hover:text-white cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 rounded hover:bg-[#1A1824] text-[#94A3B8] hover:text-white cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map(d => {
            const isSelected = selectedDay === d.date;
            return (
              <button
                key={d.date}
                onClick={() => setSelectedDay(d.date)}
                className={`py-3 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#8B5CF6]/20 border-[#8B5CF6] text-white ring-1 ring-[#8B5CF6]'
                    : 'bg-[#121118] border-white/[0.06] text-[#94A3B8] hover:border-white/20'
                }`}
              >
                <span className="block text-[10px] font-mono text-[#94A3B8] uppercase">{d.day}</span>
                <span className="block text-base font-extrabold text-white mt-1">{d.date}</span>
                {d.date === 8 && (
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#06B6D4] mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scheduled Items Feed */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Queued Broadcasts ({scheduledPosts.length})
          </span>
          <span className="text-[11px] font-mono text-[#94A3B8]">Times in UTC-7</span>
        </div>

        <div className="space-y-3">
          {scheduledPosts.map(post => (
            <div
              key={post.id}
              className="glass-card p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/[0.08] hover:border-[#8B5CF6]/40 transition-all"
            >
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#1A1824] border border-white/[0.1] flex items-center justify-center shrink-0 text-[#8B5CF6]">
                  <Clock className="w-5 h-5 text-[#06B6D4]" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-xs font-bold text-white">{post.title}</h4>
                    <span className="text-[9px] px-2 py-0.5 rounded-full font-mono bg-[#10B981]/20 text-[#10B981]">
                      {post.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] mt-1 max-w-xl leading-relaxed">
                    {post.caption}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {post.platforms.map(p => (
                      <span
                        key={p}
                        className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#8B5CF6]/15 text-[#d0bcff]"
                      >
                        {p}
                      </span>
                    ))}
                    {post.hashtags.map((h, i) => (
                      <span key={i} className="text-[9px] font-mono text-[#94A3B8]">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end md:self-center shrink-0">
                <div className="text-right font-mono text-xs">
                  <span className="block text-white font-bold">
                    {new Date(post.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">
                    {new Date(post.scheduledTime).toLocaleDateString()}
                  </span>
                </div>
                <button
                  onClick={() => showToast(`Post "${post.title}" broadcast triggered immediately!`)}
                  className="px-3.5 py-1.5 rounded-full bg-[#1A1824] border border-white/[0.1] hover:border-[#8B5CF6] text-white text-xs font-bold transition-all cursor-pointer"
                >
                  Send Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Share2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SocialAccountsView: React.FC = () => {
  const { socialAccounts, toggleSocialAccount } = useApp();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-[#06B6D4] mb-1">
          <span className="w-2 h-2 rounded-full bg-[#06B6D4]" />
          <span>SOCIAL INTEGRATION HUBS</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          Connected Social Accounts
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Authenticate TikTok, Instagram, and YouTube for zero-friction one-click publishing.
        </p>
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {socialAccounts.map(account => {
          return (
            <div
              key={account.id}
              className={`glass-card p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                account.connected
                  ? 'border-white/[0.1] hover:border-[#8B5CF6]/40'
                  : 'border-white/[0.05] opacity-75'
              }`}
            >
              <div>
                {/* Top header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shrink-0">
                      <img
                        src={account.avatar}
                        alt={account.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-['Plus_Jakarta_Sans']">
                        {account.name}
                      </h4>
                      <p className="text-xs font-mono text-[#06B6D4]">{account.handle}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      account.connected
                        ? 'bg-[#10B981]/20 text-[#10B981]'
                        : 'bg-white/10 text-[#94A3B8]'
                    }`}
                  >
                    {account.connected ? 'Connected' : 'Offline'}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-[#121118] p-3 rounded-xl border border-white/[0.04] mb-4">
                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8] block">Followers</span>
                    <span className="text-sm font-black text-white font-mono">
                      {account.followers}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#94A3B8] block">Monthly Reach</span>
                    <span className="text-sm font-black text-[#4edea3] font-mono">
                      {account.monthlyViews}
                    </span>
                  </div>
                </div>

                {/* Permissions & Security details */}
                <div className="space-y-1.5 text-[11px] text-[#94A3B8] mb-4">
                  <div className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                    <span>OAuth 2.0 Webhook Active</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <RefreshCw className="w-3.5 h-3.5 text-[#8B5CF6]" />
                    <span>Auto-resizes to platform aspect ratio</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => toggleSocialAccount(account.id)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    account.connected
                      ? 'bg-[#1A1824] hover:bg-[#242233] text-[#ffb4ab] border border-white/[0.08]'
                      : 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                  }`}
                >
                  {account.connected ? 'Disconnect Channel' : 'Connect Account'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publishing Guidelines Box */}
      <div className="glass-card p-5 rounded-2xl border border-white/[0.08]">
        <h4 className="text-sm font-bold text-white mb-2 flex items-center space-x-2">
          <TrendingUp className="w-4 h-4 text-[#8B5CF6]" />
          <span>Social Media Algorithm Best Practices</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#94A3B8]">
          <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.04]">
            <p className="font-bold text-white mb-1">TikTok Algorithm</p>
            <p className="leading-relaxed text-[11px]">
              Keep hook within first 1.8 seconds. Use bold Hormozi kinetic captions and 128-135 BPM audio.
            </p>
          </div>
          <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.04]">
            <p className="font-bold text-white mb-1">Instagram Reels</p>
            <p className="leading-relaxed text-[11px]">
              Prefers 9:16 vertical resolution with clean text padding 15% from bottom to avoid UI overlap.
            </p>
          </div>
          <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.04]">
            <p className="font-bold text-white mb-1">YouTube Shorts</p>
            <p className="leading-relaxed text-[11px]">
              Higher retention on 10-15s loops. Use clear, evocative title keywords and #Shorts in description.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

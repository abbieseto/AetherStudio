import React from 'react';
import {
  Wand2,
  Film,
  FolderKanban,
  CalendarDays,
  Share2,
  Cpu,
  CreditCard,
  Sparkles,
  TrendingUp,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
}

export const Sidebar: React.FC = () => {
  const { currentTab, setCurrentTab, resetStudioWorkflow } = useApp();

  const navItems: NavItem[] = [
    { id: 'studio', label: 'AI Studio (4-Step)', icon: Wand2, badge: 'Main', badgeColor: 'bg-[#8B5CF6]/20 text-[#d0bcff]' },
    { id: 'editor', label: 'Timeline Editor', icon: Film, badge: 'CapCut', badgeColor: 'bg-[#06B6D4]/20 text-[#06B6D4]' },
    { id: 'projects', label: 'Projects & Media', icon: FolderKanban },
    { id: 'calendar', label: 'Publishing Calendar', icon: CalendarDays, badge: 'Auto', badgeColor: 'bg-[#10B981]/20 text-[#10B981]' },
    { id: 'social', label: 'Social Accounts', icon: Share2 },
    { id: 'mcp', label: 'MCP Toolbox Hub', icon: Cpu, badge: 'Smithery', badgeColor: 'bg-[#8B5CF6]/20 text-[#d0bcff]' },
    { id: 'pricing', label: 'Plans & Subscriptions', icon: CreditCard }
  ];

  return (
    <aside className="w-64 border-r border-white/[0.08] bg-[#121118] flex flex-col justify-between shrink-0 select-none">
      <div className="p-3">
        {/* Navigation list */}
        <div className="space-y-1">
          <p className="px-3 pt-2 pb-1 text-[11px] font-mono font-bold tracking-wider text-[#94A3B8] uppercase">
            Workspaces
          </p>

          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'studio' && currentTab !== 'studio') {
                    // keep current wizard step
                  }
                  setCurrentTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B5CF6]/25 to-[#7C3AED]/10 text-white border border-[#8B5CF6]/40 shadow-[0_2px_12px_rgba(139,92,246,0.18)]'
                    : 'text-[#94A3B8] hover:text-white hover:bg-[#1A1824]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-[#8B5CF6] text-white' : 'bg-[#1A1824] text-[#94A3B8]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                      item.badgeColor || 'bg-white/10 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Highlights Box */}
        <div className="mt-6 mx-1 p-3.5 rounded-2xl bg-gradient-to-br from-[#1A1824] to-[#121118] border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-[#8B5CF6]/15 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center space-x-2 text-xs font-bold text-white mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>AI Multi-Channel Engine</span>
          </div>
          <p className="text-[11px] text-[#94A3B8] leading-relaxed mb-2.5">
            1 Click idea → Seedance 2.0 AI Video → CaptionPipe Subtitles → TikTok/IG/YouTube Schedule.
          </p>
          <div className="flex items-center justify-between text-[11px] font-mono text-[#06B6D4] font-semibold bg-[#0B0B0F]/60 p-2 rounded-xl border border-white/[0.04]">
            <span>Avg Video Gen:</span>
            <span className="text-[#4edea3]">~4.2 sec</span>
          </div>
        </div>
      </div>

      {/* Footer MCP status & documentation link */}
      <div className="p-3 border-t border-white/[0.08]">
        <div className="p-2.5 rounded-xl bg-[#0B0B0F] border border-white/[0.06] text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-mono text-[#94A3B8]">MCP Endpoint</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] font-mono">
              Online
            </span>
          </div>
          <p className="text-[10px] text-white font-mono truncate select-all">
            mcp.smithery.ai/abigail-seto
          </p>
          <p className="text-[9px] text-[#958ea0] mt-0.5">
            Seedance 2.0 • CaptionPipe • Nanobanana
          </p>
        </div>
      </div>
    </aside>
  );
};

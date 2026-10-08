import React from 'react';
import { Sparkles, Zap, Coins, Bell, Cpu, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const { tokenBalance, setWizardStep, setCurrentTab, resetStudioWorkflow } = useApp();

  return (
    <header className="h-16 border-b border-white/[0.08] bg-[#121118]/80 backdrop-blur-xl sticky top-0 z-40 px-4 lg:px-6 flex items-center justify-between">
      {/* Brand logo & Badge */}
      <div className="flex items-center space-x-3">
        <div
          onClick={() => {
            resetStudioWorkflow();
            setCurrentTab('studio');
          }}
          className="cursor-pointer flex items-center space-x-2.5 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B5CF6] via-[#7C3AED] to-[#06B6D4] p-[1.5px] shadow-[0_0_20px_rgba(139,92,246,0.4)] group-hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all">
            <div className="w-full h-full bg-[#0B0B0F] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#d0bcff]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white font-['Plus_Jakarta_Sans']">
                AETHER
              </span>
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-[#8B5CF6]/20 border border-[#8B5CF6]/40 text-[#d0bcff] font-semibold">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] text-[#94A3B8] font-mono tracking-wide -mt-0.5">
              MCP KINETIC SUITE
            </p>
          </div>
        </div>

        {/* Live MCP Status Pill */}
        <div
          onClick={() => setCurrentTab('mcp')}
          className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1A1824] border border-white/[0.08] hover:border-[#06B6D4]/50 cursor-pointer transition-colors text-xs"
        >
          <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse"></span>
          <span className="text-[#94A3B8] font-mono text-[11px]">MCP: Seedance 2.0 &amp; CaptionPipe</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#06B6D4]/10 text-[#06B6D4] font-medium">
            Active
          </span>
        </div>
      </div>

      {/* Right controls: Token balance, Quick action, Profile */}
      <div className="flex items-center space-x-3">
        {/* Token Credits Counter */}
        <div
          onClick={() => setCurrentTab('pricing')}
          className="flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#1A1824] border border-[#8B5CF6]/30 hover:border-[#8B5CF6] transition-all cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.15)]"
          title="Click to manage subscription & tokens"
        >
          <Coins className="w-4 h-4 text-[#d0bcff]" />
          <div className="text-left">
            <span className="text-xs font-mono font-bold text-white tracking-tight">
              {tokenBalance}
            </span>
            <span className="text-[10px] text-[#94A3B8] ml-1">Tokens</span>
          </div>
          <span className="text-[10px] font-bold text-[#8B5CF6] bg-[#8B5CF6]/20 px-1.5 py-0.5 rounded-full uppercase tracking-wider ml-1">
            + Top Up
          </span>
        </div>

        {/* Quick Create Button */}
        <button
          onClick={() => {
            resetStudioWorkflow();
            setCurrentTab('studio');
            setWizardStep(1);
          }}
          className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] hover:to-[#8B5CF6] text-white text-xs font-bold shadow-[0_4px_16px_rgba(139,92,246,0.35)] hover:shadow-[0_6px_22px_rgba(139,92,246,0.5)] transition-all cursor-pointer transform hover:scale-[1.02]"
        >
          <Zap className="w-3.5 h-3.5 fill-white" />
          <span>New Generation</span>
        </button>

        {/* User Profile Mini */}
        <div className="flex items-center space-x-2 pl-2 border-l border-white/[0.08]">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#8B5CF6]/40">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
              alt="Creator Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="hidden xl:block text-left text-xs">
            <p className="font-semibold text-white leading-tight">Abigail S.</p>
            <p className="text-[10px] text-[#4edea3]">Pro Studio Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
};

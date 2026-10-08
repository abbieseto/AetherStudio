import React, { useState } from 'react';
import {
  CreditCard,
  Coins,
  Check,
  Zap,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessModelView: React.FC = () => {
  const { tokenBalance, setTokenBalance, showToast } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: 'Creator Free',
      price: '$0',
      period: '/mo',
      tokens: '50 tokens/mo',
      features: [
        '5 Seedance 2.0 Video Renders',
        'CaptionPipe Basic Subtitles',
        'Standard 720p Resolution',
        'Manual Download'
      ],
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro Studio',
      price: billingCycle === 'monthly' ? '$29' : '$24',
      period: '/mo',
      tokens: '500 tokens/mo',
      features: [
        '50+ Seedance 2.0 HD 60FPS Videos',
        'Unlimited CaptionPipe Subtitles',
        'Nanobanana Photoreal Synthesizer',
        'Auto-Publish to TikTok, IG & YouTube',
        'Priority GPU Rendering'
      ],
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Enterprise',
      price: billingCycle === 'monthly' ? '$99' : '$79',
      period: '/mo',
      tokens: '2,000 tokens/mo',
      features: [
        'Multi-Account Social Scheduling',
        'Custom Brand Kits & Fonts',
        'Dedicated MCP API Endpoints',
        'Commercial Resell Rights',
        '24/7 Priority Support & Webhooks'
      ],
      popular: false
    }
  ];

  const tokenPacks = [
    { tokens: 100, price: '$9', bonus: '' },
    { tokens: 300, price: '$22', bonus: '+30 Bonus' },
    { tokens: 1000, price: '$65', bonus: '+150 Bonus' }
  ];

  const handleBuyTokens = (tokens: number) => {
    setTokenBalance(prev => prev + tokens);
    showToast(`Successfully credited +${tokens} tokens to your account!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8B5CF6] mb-1">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>PLANS &amp; TOKEN CREDITS</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          Plans &amp; Token Subscriptions
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Select a creator plan or top up token packs for on-demand synthesis.
        </p>
      </div>

      {/* Subscription Plans */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Subscription Tiers (Revenue Stream 1)
          </h3>
          <div className="bg-[#121118] p-1 rounded-full border border-white/[0.08] flex items-center space-x-1 text-xs">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                billingCycle === 'monthly' ? 'bg-[#8B5CF6] text-white font-bold' : 'text-[#94A3B8]'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3 py-1 rounded-full transition-all cursor-pointer ${
                billingCycle === 'yearly' ? 'bg-[#8B5CF6] text-white font-bold' : 'text-[#94A3B8]'
              }`}
            >
              Yearly (Save 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map(plan => {
            const isSelected = selectedPlan === plan.id;
            return (
              <div
                key={plan.id}
                className={`glass-card p-6 rounded-3xl border transition-all relative flex flex-col justify-between ${
                  plan.popular
                    ? 'border-[#8B5CF6] ring-1 ring-[#8B5CF6] shadow-[0_0_30px_rgba(139,92,246,0.25)]'
                    : 'border-white/[0.08]'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}

                <div>
                  <h4 className="text-base font-black text-white">{plan.name}</h4>
                  <div className="flex items-baseline space-x-1 my-3">
                    <span className="text-3xl font-black text-white font-mono">{plan.price}</span>
                    <span className="text-xs text-[#94A3B8]">{plan.period}</span>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-[#121118] border border-white/[0.06] text-xs font-mono text-[#06B6D4] font-semibold mb-4">
                    {plan.tokens}
                  </div>

                  <ul className="space-y-2.5 text-xs text-[#94A3B8] mb-6">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#4edea3] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    setSelectedPlan(plan.id);
                    showToast(`Switched active plan to ${plan.name}!`);
                  }}
                  className={`w-full py-3 rounded-full text-xs font-extrabold cursor-pointer transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]'
                      : 'bg-[#1A1824] hover:bg-[#242233] text-white border border-white/[0.1]'
                  }`}
                >
                  {isSelected ? 'Current Active Tier' : `Select ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Token Top-up Packs (Revenue Stream 2) */}
      <div className="glass-card p-6 rounded-3xl border border-white/[0.08]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider flex items-center space-x-2">
              <Coins className="w-4 h-4 text-[#d0bcff]" />
              <span>Token Top-Up Packs (Instant Credit)</span>
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Current Balance: <strong className="text-white font-mono">{tokenBalance} Tokens</strong>
            </p>
          </div>
          <span className="text-[10px] font-mono text-[#4edea3]">No expiration date</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {tokenPacks.map((pack, idx) => (
            <div
              key={idx}
              className="bg-[#121118] p-4 rounded-2xl border border-white/[0.06] flex items-center justify-between"
            >
              <div>
                <p className="text-lg font-black text-white font-mono">+{pack.tokens} Tokens</p>
                <p className="text-xs text-[#94A3B8]">{pack.price} one-time {pack.bonus && <span className="text-[#06B6D4] font-bold">({pack.bonus})</span>}</p>
              </div>
              <button
                onClick={() => handleBuyTokens(pack.tokens)}
                className="px-4 py-2 rounded-xl bg-[#8B5CF6]/20 border border-[#8B5CF6]/50 hover:bg-[#8B5CF6] text-white text-xs font-bold transition-all cursor-pointer shadow-[0_0_12px_rgba(139,92,246,0.2)]"
              >
                Top Up
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  CreditCard,
  Coins,
  Check,
  TrendingUp,
  DollarSign,
  PieChart,
  Users,
  Sparkles,
  Zap,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BusinessModelView: React.FC = () => {
  const { tokenBalance, setTokenBalance } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [affiliateCopied, setAffiliateCopied] = useState(false);

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
    alert(`Successfully credited +${tokens} tokens to your Aether Studio account!`);
  };

  const copyAffiliate = () => {
    navigator.clipboard.writeText('https://aether.studio/ref/abigail-seto');
    setAffiliateCopied(true);
    setTimeout(() => setAffiliateCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-xs font-mono text-[#8B5CF6] mb-1">
          <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
          <span>COMMERCIAL ARCHITECTURE &amp; REVENUE ENGINE</span>
        </div>
        <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
          Plans, Tokens &amp; Business Model Canvas
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Grounded directly in the Strategyzer Business Model Canvas specifications.
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
                    alert(`Switched active plan to ${plan.name}!`);
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

      {/* Business Model Canvas Matrix (Directly from CSV) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-white font-['Plus_Jakarta_Sans']">
            Strategyzer Business Model Canvas Architecture
          </h3>
          <p className="text-xs text-[#94A3B8]">
            Complete 9-building-block framework implemented into Aether Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Key Partners */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#8B5CF6] uppercase block">
              1. Key Partners
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>AI model providers (InfoseekAI Seedance, Nanobanana)</li>
              <li>Social platforms: TikTok, YouTube &amp; Instagram</li>
              <li>Creative agencies &amp; production studios</li>
              <li>Cloud and computing providers</li>
              <li>Smithery MCP Hub infrastructure</li>
            </ul>
          </div>

          {/* Key Activities */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#06B6D4] uppercase block">
              2. Key Activities
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>Acquire customers &amp; manage subscriptions</li>
              <li>Improve generation speed &amp; prompt fidelity</li>
              <li>Integrate social media publishing APIs</li>
              <li>Maintain CaptionPipe auto-subtitle pipeline</li>
            </ul>
          </div>

          {/* Key Propositions */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#4edea3] uppercase block">
              3. Value Propositions
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>Ease of use of video creation in 4 steps</li>
              <li>Platform-optimized content (TikTok, Shorts, Reels)</li>
              <li>Create, edit, and publish in one place</li>
              <li>Save time and production money</li>
              <li>Professional content without technical skills</li>
            </ul>
          </div>

          {/* Customer Relationships */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#d0bcff] uppercase block">
              4. Customer Relationships
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>Monthly newsfeed &amp; product drops</li>
              <li>Creator Discord &amp; prompt sharing community</li>
              <li>Automated AI prompt recommendations</li>
            </ul>
          </div>

          {/* Customer Segments */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#acedff] uppercase block">
              5. Customer Segments
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>Content creators &amp; viral TikTokers</li>
              <li>Advertisers &amp; performance marketers</li>
              <li>Small businesses &amp; E-commerce brands</li>
              <li>Digital marketing agencies</li>
            </ul>
          </div>

          {/* Channels */}
          <div className="glass-card p-4 rounded-2xl border border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono font-bold text-[#ffb4ab] uppercase block">
              6. Channels
            </span>
            <ul className="space-y-1.5 text-[#94A3B8] list-disc list-inside">
              <li>TikTok viral organic hooks</li>
              <li>Instagram Reels showcases</li>
              <li>Influencer sponsorships</li>
              <li>YouTube tutorials &amp; workflow breakdowns</li>
            </ul>
          </div>
        </div>

        {/* Cost Structure vs Revenue Streams from CSV */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cost Structure */}
          <div className="glass-card p-5 rounded-2xl border border-white/[0.08]">
            <span className="text-[10px] font-mono font-bold text-[#ffb4ab] uppercase block mb-2">
              Cost Structure (S$60,000 Initial Budget - 6 Months)
            </span>
            <div className="space-y-2 font-mono text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-[#121118]">
                <span>AI APIs &amp; Infrastructure:</span>
                <span className="text-white font-bold">S$11,000</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121118]">
                <span>Marketing &amp; Creator Outreach:</span>
                <span className="text-white font-bold">S$10,000</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121118]">
                <span>Social Media Integrations:</span>
                <span className="text-white font-bold">S$5,000</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#121118]">
                <span>Testing &amp; Miscellaneous:</span>
                <span className="text-white font-bold">S$4,000</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-[#1A1824] border border-white/10 font-bold text-[#4edea3]">
                <span>Total 6-Month Allocated:</span>
                <span>S$60,000 (With Runway)</span>
              </div>
            </div>
          </div>

          {/* Revenue Streams & Affiliate */}
          <div className="glass-card p-5 rounded-2xl border border-white/[0.08] flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#4edea3] uppercase block mb-2">
                Revenue Streams &amp; Creator Affiliates
              </span>
              <ul className="text-xs text-[#94A3B8] space-y-1.5 mb-4">
                <li>• Monthly &amp; Annual Subscriptions ($29 - $99/mo)</li>
                <li>• On-demand Token Packs ($9 - $65)</li>
                <li>• Affiliate Marketing (20% lifetime creator commission)</li>
                <li>• Sponsored brand style templates</li>
              </ul>
            </div>

            <div className="bg-[#121118] p-3 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] font-mono text-[#94A3B8] block mb-1">
                YOUR CREATOR AFFILIATE LINK (20% RECURRING):
              </span>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value="https://aether.studio/ref/abigail-seto"
                  className="flex-1 bg-[#1A1824] text-[#d0bcff] text-xs font-mono px-2.5 py-1.5 rounded-lg border border-white/[0.06]"
                />
                <button
                  onClick={copyAffiliate}
                  className="px-3 py-1.5 rounded-lg bg-[#8B5CF6] text-white text-xs font-bold cursor-pointer"
                >
                  {affiliateCopied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

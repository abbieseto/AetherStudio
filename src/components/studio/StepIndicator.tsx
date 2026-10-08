import React from 'react';
import { PenTool, Sparkles, Sliders, Send, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StepIndicator: React.FC = () => {
  const { wizardStep, setWizardStep, activeProject } = useApp();

  const steps = [
    { number: 1, title: 'Describe Idea', subtitle: 'Prompts & Ratios', icon: PenTool },
    { number: 2, title: 'Generate AI', subtitle: 'Seedance & Nanobanana', icon: Sparkles },
    { number: 3, title: 'Customize', subtitle: 'Captions & Timeline', icon: Sliders },
    { number: 4, title: 'Publish', subtitle: 'TikTok, IG & YouTube', icon: Send }
  ];

  return (
    <div className="w-full bg-[#121118]/90 border-b border-white/[0.08] px-4 py-3 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = wizardStep === step.number;
          const isDone = wizardStep > step.number;
          const canClick = isDone || isCurrent || (step.number === 3 && activeProject) || (step.number === 4 && activeProject);

          return (
            <React.Fragment key={step.number}>
              <div
                onClick={() => {
                  if (canClick) setWizardStep(step.number);
                }}
                className={`flex items-center space-x-3 cursor-pointer group transition-all select-none ${
                  !canClick ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_18px_rgba(139,92,246,0.55)] ring-2 ring-[#8B5CF6]/50'
                      : isDone
                      ? 'bg-[#10B981] text-white shadow-[0_0_12px_rgba(16,185,129,0.35)]'
                      : 'bg-[#1A1824] border border-white/[0.1] text-[#94A3B8]'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>

                {/* Step Label */}
                <div className="text-left hidden sm:block">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-[10px] font-mono text-[#94A3B8]">0{step.number}</span>
                    <p
                      className={`text-xs font-bold font-['Plus_Jakarta_Sans'] ${
                        isCurrent
                          ? 'text-white'
                          : isDone
                          ? 'text-[#e4e1e7]'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  <p className="text-[10px] text-[#958ea0] truncate max-w-[120px]">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 max-w-[60px] md:max-w-[100px] h-[2px] mx-2 bg-[#1A1824] relative overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      wizardStep > idx + 1
                        ? 'bg-[#10B981] w-full'
                        : wizardStep === idx + 1
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#1A1824] w-1/2'
                        : 'w-0'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

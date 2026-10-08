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
    <div className="w-full bg-[#121118]/95 border-b border-white/[0.1] px-4 py-3.5 sticky top-16 z-30 backdrop-blur-lg shadow-lg">
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
                  className={`w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center font-black text-sm md:text-base font-mono transition-all shrink-0 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_24px_rgba(139,92,246,0.7)] ring-2 ring-white/60 scale-105'
                      : isDone
                      ? 'bg-[#10B981] text-white shadow-[0_0_16px_rgba(16,185,129,0.45)]'
                      : 'bg-[#1A1824] border-2 border-white/20 text-[#e4e1e7]'
                  }`}
                >
                  {isDone ? (
                    <Check className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                {/* Step Label - Larger & Highly Readable */}
                <div className="text-left">
                  <div className="flex flex-col">
                    <span
                      className={`text-xs md:text-sm font-mono font-black uppercase tracking-wider ${
                        isCurrent
                          ? 'text-[#d0bcff]'
                          : isDone
                          ? 'text-[#4edea3]'
                          : 'text-[#94A3B8]'
                      }`}
                    >
                      STEP {step.number}
                    </span>
                    <p
                      className={`text-sm md:text-base font-extrabold font-['Plus_Jakarta_Sans'] leading-tight ${
                        isCurrent
                          ? 'text-white drop-shadow-[0_2px_8px_rgba(139,92,246,0.3)]'
                          : isDone
                          ? 'text-[#F8FAFC]'
                          : 'text-[#cbc3d7]'
                      }`}
                    >
                      {step.title}
                    </p>
                  </div>
                  <p className="text-[11px] md:text-xs text-[#958ea0] truncate max-w-[140px] hidden sm:block mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </div>

              {/* Connecting line */}
              {idx < steps.length - 1 && (
                <div className="flex-1 max-w-[45px] sm:max-w-[80px] md:max-w-[110px] h-[3px] mx-2 bg-[#1A1824] rounded-full overflow-hidden shrink-0">
                  <div
                    className={`h-full transition-all duration-300 ${
                      wizardStep > idx + 1
                        ? 'bg-[#10B981] w-full'
                        : wizardStep === idx + 1
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#1A1824] w-2/3'
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

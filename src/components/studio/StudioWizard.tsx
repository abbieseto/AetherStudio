import React from 'react';
import { useApp } from '../../context/AppContext';
import { StepIndicator } from './StepIndicator';
import { Step1Describe } from './Step1Describe';
import { Step2Generate } from './Step2Generate';
import { Step3Customize } from './Step3Customize';
import { Step4Publish } from './Step4Publish';

export const StudioWizard: React.FC = () => {
  const { wizardStep } = useApp();

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#0B0B0F] text-[#e4e1e7]">
      <StepIndicator />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {wizardStep === 1 && <Step1Describe />}
        {wizardStep === 2 && <Step2Generate />}
        {wizardStep === 3 && <Step3Customize />}
        {wizardStep === 4 && <Step4Publish />}
      </div>
    </div>
  );
};

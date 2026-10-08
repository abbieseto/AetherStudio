import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { StudioWizard } from './components/studio/StudioWizard';
import { EditorView } from './components/editor/EditorView';
import { ProjectsView } from './components/projects/ProjectsView';
import { CalendarView } from './components/calendar/CalendarView';
import { SocialAccountsView } from './components/social/SocialAccountsView';
import { BusinessModelView } from './components/business/BusinessModelView';
import { CheckCircle2, X } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { currentTab, toastMessage, closeToast } = useApp();

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0B0B0F] overflow-hidden relative">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0B0B0F] relative">
          {currentTab === 'studio' && <StudioWizard />}
          {currentTab === 'editor' && <EditorView />}
          {currentTab === 'projects' && <ProjectsView />}
          {currentTab === 'calendar' && <CalendarView />}
          {currentTab === 'social' && <SocialAccountsView />}
          {currentTab === 'pricing' && <BusinessModelView />}
        </main>
      </div>

      {/* In-app Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#1A1824]/95 border border-[#8B5CF6]/50 text-white shadow-[0_8px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(139,92,246,0.35)] backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#4edea3] shrink-0" />
          <p className="text-xs font-semibold font-['Plus_Jakarta_Sans'] pr-2">
            {toastMessage}
          </p>
          <button
            onClick={closeToast}
            className="text-[#94A3B8] hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

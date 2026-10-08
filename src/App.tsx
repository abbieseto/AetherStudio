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

const MainLayout: React.FC = () => {
  const { currentTab } = useApp();

  return (
    <div className="flex flex-col h-screen w-screen bg-[#0B0B0F] overflow-hidden">
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

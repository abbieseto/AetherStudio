import React, { useState } from 'react';
import {
  FolderKanban,
  Video,
  Image as ImageIcon,
  Play,
  Film,
  Download,
  Trash2,
  Copy,
  Plus,
  Share2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Project } from '../../types';

export const ProjectsView: React.FC = () => {
  const {
    projects,
    setActiveProject,
    setCurrentTab,
    setWizardStep,
    deleteProject,
    resetStudioWorkflow,
    setPromptText,
    setMediaType,
    setAspectRatio
  } = useApp();

  const [filterType, setFilterType] = useState<'all' | 'video' | 'image'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projects.filter(p => {
    if (filterType !== 'all' && p.type !== filterType) return false;
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !p.prompt.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleOpenInEditor = (p: Project) => {
    setActiveProject(p);
    setCurrentTab('editor');
  };

  const handleRemix = (p: Project) => {
    setActiveProject(p);
    setPromptText(p.prompt);
    setMediaType(p.type);
    setAspectRatio(p.aspectRatio);
    setWizardStep(1);
    setCurrentTab('studio');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Plus_Jakarta_Sans'] tracking-tight">
            Projects &amp; Asset Vault
          </h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">
            Manage your AI generations, remix prompts, and export to social platforms.
          </p>
        </div>

        <button
          onClick={() => {
            resetStudioWorkflow();
            setCurrentTab('studio');
            setWizardStep(1);
          }}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#9d71ff] text-white text-xs font-bold shadow-[0_0_20px_rgba(139,92,246,0.35)] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Generation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#121118] p-3 rounded-2xl border border-white/[0.08]">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {(['all', 'video', 'image'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                filterType === type
                  ? 'bg-[#8B5CF6] text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                  : 'text-[#94A3B8] hover:text-white bg-[#1A1824]'
              }`}
            >
              {type === 'all' ? 'All Assets' : `${type}s`}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search prompts or title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#1A1824] text-white text-xs px-3.5 py-2 rounded-xl border border-white/[0.08] focus:border-[#8B5CF6] focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-2xl p-8">
          <FolderKanban className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
          <h3 className="text-base font-bold text-white mb-1">No Projects Found</h3>
          <p className="text-xs text-[#94A3B8] mb-4">
            Try adjusting your search filter or generate a new video with Seedance 2.0.
          </p>
          <button
            onClick={() => {
              resetStudioWorkflow();
              setCurrentTab('studio');
            }}
            className="px-5 py-2 rounded-full bg-[#8B5CF6] text-white text-xs font-bold"
          >
            Go to AI Studio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map(proj => (
            <div
              key={proj.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/[0.08] hover:border-[#8B5CF6]/50 transition-all group flex flex-col justify-between"
            >
              {/* Media Thumbnail Container */}
              <div className="relative aspect-video bg-[#0B0B0F] overflow-hidden">
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-white border border-white/10 flex items-center space-x-1">
                    {proj.type === 'video' ? <Video className="w-3 h-3 text-[#8B5CF6]" /> : <ImageIcon className="w-3 h-3 text-[#06B6D4]" />}
                    <span>{proj.aspectRatio}</span>
                  </span>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#8B5CF6]/80 backdrop-blur-md text-white text-[9px] font-mono font-bold">
                  {proj.model.includes('Seedance') ? 'Seedance 2.0' : 'Nanobanana'}
                </div>

                {/* Hover Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2.5 backdrop-blur-[2px]">
                  <button
                    onClick={() => handleOpenInEditor(proj)}
                    className="p-2.5 rounded-full bg-[#8B5CF6] text-white hover:bg-[#9d71ff] shadow-[0_0_15px_rgba(139,92,246,0.6)] cursor-pointer"
                    title="Open in Timeline Editor"
                  >
                    <Film className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemix(proj)}
                    className="p-2.5 rounded-full bg-[#1A1824] border border-white/20 text-white hover:bg-[#242233] cursor-pointer"
                    title="Remix Prompt"
                  >
                    <Sparkles className="w-4 h-4 text-[#06B6D4]" />
                  </button>
                  <button
                    onClick={() => {
                      setActiveProject(proj);
                      setCurrentTab('studio');
                      setWizardStep(4);
                    }}
                    className="p-2.5 rounded-full bg-[#1A1824] border border-white/20 text-white hover:bg-[#242233] cursor-pointer"
                    title="Publish or Schedule"
                  >
                    <Share2 className="w-4 h-4 text-[#4edea3]" />
                  </button>
                </div>
              </div>

              {/* Content info */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-xs font-bold text-white truncate font-['Plus_Jakarta_Sans']">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-[#94A3B8] line-clamp-2 mt-1 leading-relaxed">
                    {proj.prompt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[10px] font-mono text-[#94A3B8]">
                  <span>{new Date(proj.createdAt).toLocaleDateString()}</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleOpenInEditor(proj)}
                      className="text-[#06B6D4] hover:underline font-bold cursor-pointer"
                    >
                      Editor →
                    </button>
                    <button
                      onClick={() => deleteProject(proj.id)}
                      className="text-[#94A3B8] hover:text-red-400 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

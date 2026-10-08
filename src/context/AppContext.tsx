import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, ScheduledPost, SocialAccount, MCPToolInfo, AspectRatio, MediaType } from '../types';

interface AppContextType {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  // Wizard state
  wizardStep: number;
  setWizardStep: (step: number) => void;
  activeProject: Project | null;
  setActiveProject: (p: Project | null) => void;
  // Prompt & generation draft state
  promptText: string;
  setPromptText: (text: string) => void;
  mediaType: MediaType;
  setMediaType: (type: MediaType) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ar: AspectRatio) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
  cameraMotion: string;
  setCameraMotion: (motion: string) => void;
  videoDuration: number;
  setVideoDuration: (dur: number) => void;
  isGenerating: boolean;
  setIsGenerating: (g: boolean) => void;
  generationProgress: number;
  // Projects & scheduled
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  scheduledPosts: ScheduledPost[];
  setScheduledPosts: React.Dispatch<React.SetStateAction<ScheduledPost[]>>;
  socialAccounts: SocialAccount[];
  toggleSocialAccount: (id: 'tiktok' | 'instagram' | 'youtube') => void;
  mcpTools: MCPToolInfo[];
  tokenBalance: number;
  setTokenBalance: React.Dispatch<React.SetStateAction<number>>;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  closeToast: () => void;
  // Actions
  handleGenerate: () => Promise<void>;
  addScheduledPost: (post: Omit<ScheduledPost, 'id'>) => void;
  updateProject: (updated: Project) => void;
  deleteProject: (id: string) => void;
  resetStudioWorkflow: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<string>('studio');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [tokenBalance, setTokenBalance] = useState<number>(840);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(current => (current === msg ? null : current));
    }, 3800);
  };

  const closeToast = () => setToastMessage(null);

  // Studio form states
  const [promptText, setPromptText] = useState<string>(
    'Futuristic holographic sneaker spinning in zero gravity with neon violet trails and liquid chrome splashes, 8k hyper-realistic'
  );
  const [mediaType, setMediaType] = useState<MediaType>('video');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [selectedTool, setSelectedTool] = useState<string>('seedance2-video-gen');
  const [cameraMotion, setCameraMotion] = useState<string>('360 Orbit & Slow Push');
  const [videoDuration, setVideoDuration] = useState<number>(6);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);

  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    {
      id: 'tiktok',
      name: 'TikTok Pro',
      handle: '@aether.creator',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      connected: true,
      followers: '124.8K',
      monthlyViews: '1.4M',
      autoSchedule: true
    },
    {
      id: 'instagram',
      name: 'Instagram Reels',
      handle: '@aether_studios',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      connected: true,
      followers: '48.2K',
      monthlyViews: '620K',
      autoSchedule: true
    },
    {
      id: 'youtube',
      name: 'YouTube Shorts',
      handle: 'Aether Studio AI',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      connected: false,
      followers: '12.1K',
      monthlyViews: '180K',
      autoSchedule: false
    }
  ]);

  const [mcpTools] = useState<MCPToolInfo[]>([
    {
      id: 'seedance2-video-gen',
      name: 'Seedance 2.0 (InfoseekAI)',
      type: 'Video Synthesis',
      endpoint: 'https://server.smithery.ai/InfoseekAI/seedance2-video-gen',
      directEndpoint: 'https://prod.infoseek.ai/api/mcp/a7034de3-f7fe-4df7-bff7-215ec8027e34/seedance-video',
      status: 'connected',
      features: ['Anamorphic Motion', 'Prompt Adherence', 'Multi-Aspect 9:16/16:9/1:1', 'Camera Panning'],
      latencyMs: 142
    },
    {
      id: 'captionpipe',
      name: 'CaptionPipe Subtitle Engine',
      type: 'Auto-Subtitles & Audio',
      endpoint: 'https://server.smithery.ai/mobiletechmediallc/captionpipe',
      status: 'connected',
      features: ['Word-Level Sync', 'Hormozi Kinetic Style', 'Neon Glow Preset', 'Auto Emojis'],
      latencyMs: 98
    },
    {
      id: 'nanobanana',
      name: 'Nanobanana Synthesizer',
      type: 'Hyper-Res Image Gen',
      endpoint: 'https://server.smithery.ai/nanobanana',
      status: 'authenticated',
      features: ['Studio Product Staging', 'Dynamic Lighting', 'Obsidian Kinetic Grade', 'Fast 4K Upscale'],
      latencyMs: 115
    }
  ]);

  // Load initial projects from server
  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data.length > 0) {
          setProjects(data.data);
          setActiveProject(data.data[0]);
        }
      })
      .catch(() => {
        // Fallback local projects if server is still spinning
      });

    fetch('/api/social/scheduled')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setScheduledPosts(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const toggleSocialAccount = (id: 'tiktok' | 'instagram' | 'youtube') => {
    setSocialAccounts(prev =>
      prev.map(acc => (acc.id === id ? { ...acc, connected: !acc.connected } : acc))
    );
  };

  const resetStudioWorkflow = () => {
    setWizardStep(1);
    setPromptText('');
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(15);
    setWizardStep(2);

    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 400);

    try {
      const res = await fetch('/api/mcp/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: mediaType === 'video' ? selectedTool : 'nanobanana',
          prompt: promptText,
          aspectRatio,
          duration: videoDuration,
          style: cameraMotion
        })
      });

      clearInterval(progressInterval);
      setGenerationProgress(100);

      const json = await res.json();
      if (json.success && json.data) {
        setActiveProject(json.data);
        setProjects(prev => [json.data, ...prev]);
        setTokenBalance(prev => Math.max(0, prev - (mediaType === 'video' ? 30 : 10)));
      }
    } catch (err) {
      clearInterval(progressInterval);
      // Fallback synthetic project
      const fallbackProject: Project = {
        id: 'proj-' + Date.now(),
        title: promptText.slice(0, 32) + '...',
        prompt: promptText,
        model: mediaType === 'video' ? 'Seedance 2.0 (InfoseekAI)' : 'Nanobanana Synthesizer',
        type: mediaType,
        aspectRatio,
        duration: mediaType === 'video' ? videoDuration : 0,
        status: 'ready',
        thumbnail: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        captions: [
          { id: 'c-1', start: 0.5, end: 2.5, text: 'NEXT-LEVEL AI VIDEO ⚡', style: 'hormozi' },
          { id: 'c-2', start: 2.6, end: 4.8, text: 'READY TO GO VIRAL 🔥', style: 'neon' }
        ],
        audioTrack: 'Synthwave Nightride - 130 BPM',
        createdAt: new Date().toISOString(),
        platforms: ['tiktok', 'instagram']
      };
      setActiveProject(fallbackProject);
      setProjects(prev => [fallbackProject, ...prev]);
      setTokenBalance(prev => Math.max(0, prev - 25));
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    }
  };

  const addScheduledPost = (post: Omit<ScheduledPost, 'id'>) => {
    const newPost: ScheduledPost = {
      ...post,
      id: 'sched-' + Date.now()
    };
    setScheduledPosts(prev => [newPost, ...prev]);

    // Also inform server
    fetch('/api/social/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPost)
    }).catch(() => {});
  };

  const updateProject = (updated: Project) => {
    setActiveProject(updated);
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    }).catch(() => {});
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    if (activeProject?.id === id) {
      setActiveProject(projects.find(p => p.id !== id) || null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        wizardStep,
        setWizardStep,
        activeProject,
        setActiveProject,
        promptText,
        setPromptText,
        mediaType,
        setMediaType,
        aspectRatio,
        setAspectRatio,
        selectedTool,
        setSelectedTool,
        cameraMotion,
        setCameraMotion,
        videoDuration,
        setVideoDuration,
        isGenerating,
        setIsGenerating,
        generationProgress,
        projects,
        setProjects,
        scheduledPosts,
        setScheduledPosts,
        socialAccounts,
        toggleSocialAccount,
        mcpTools,
        tokenBalance,
        setTokenBalance,
        toastMessage,
        showToast,
        closeToast,
        handleGenerate,
        addScheduledPost,
        updateProject,
        deleteProject,
        resetStudioWorkflow
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

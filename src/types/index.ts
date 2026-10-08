export type AspectRatio = '9:16' | '16:9' | '1:1' | '4:5';

export type MediaType = 'video' | 'image';

export type CaptionStyle = 'hormozi' | 'neon' | 'clean' | 'karaoke' | 'cinematic';

export interface CaptionItem {
  id: string;
  start: number;
  end: number;
  text: string;
  style: CaptionStyle;
}

export interface Project {
  id: string;
  title: string;
  prompt: string;
  model: string;
  type: MediaType;
  aspectRatio: AspectRatio;
  duration: number;
  status: 'ready' | 'generating' | 'draft';
  thumbnail: string;
  videoUrl: string;
  captions: CaptionItem[];
  audioTrack: string;
  createdAt: string;
  platforms: string[];
  mcpNote?: string;
}

export interface ScheduledPost {
  id: string;
  projectId: string;
  title: string;
  platforms: ('tiktok' | 'instagram' | 'youtube')[];
  scheduledTime: string;
  status: 'scheduled' | 'published';
  caption: string;
  hashtags: string[];
  engagement?: {
    views: number;
    likes: number;
    shares: number;
  };
}

export interface SocialAccount {
  id: 'tiktok' | 'instagram' | 'youtube';
  name: string;
  handle: string;
  avatar: string;
  connected: boolean;
  followers: string;
  monthlyViews: string;
  autoSchedule: boolean;
}

export interface MCPToolInfo {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  directEndpoint?: string;
  status: 'connected' | 'authenticated' | 'standby';
  features: string[];
  latencyMs?: number;
}

import React, { useEffect } from 'react';
import { X, ExternalLink, Play } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    title: string;
    url: string;
  } | null;
}

export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ isOpen, onClose, video }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const videoId = extractYouTubeId(video.url);
  const watchUrl = videoId ? `https://www.youtube.com/watch?v=${videoId}` : video.url;

  const handleClose = () => {
    triggerHaptic(ImpactStyle.Light);
    onClose();
  };

  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(ImpactStyle.Medium);
    try {
      window.open(watchUrl, '_blank');
    } catch {}
  };

  return (
    <div 
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200 select-none"
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-700/60 rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 animate-in slide-in-from-bottom-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile drag handle indicator */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-10 h-1 rounded-full bg-slate-600/70" />
        </div>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
          <div className="flex items-center space-x-2 overflow-hidden mr-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 animate-pulse" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400 shrink-0">
              Video Guide
            </span>
            <span className="text-slate-600">·</span>
            <h3 className="text-xs sm:text-sm font-semibold text-white truncate">
              {video.title}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 active:bg-slate-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Close video"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="w-full aspect-video bg-black relative flex items-center justify-center">
          {videoId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1`}
              title={video.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="p-6 text-center text-slate-400">
              <Play className="w-10 h-10 mx-auto mb-2 text-rose-500 opacity-80" />
              <p className="text-sm font-medium text-white mb-1">{video.title}</p>
              <p className="text-xs text-slate-400 mb-4">Direct playback link</p>
              <button
                onClick={handleOpenExternal}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-rose-600 text-white rounded-xl font-bold text-xs"
              >
                <span>Open Video</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between gap-2.5">
          <button
            onClick={handleOpenExternal}
            className="apple-press flex-1 py-2.5 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors border border-slate-700/50"
          >
            <ExternalLink className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <span className="truncate">Open in YouTube</span>
          </button>

          <button
            onClick={handleClose}
            className="apple-press py-2.5 px-5 rounded-xl bg-white hover:bg-slate-100 active:bg-slate-200 text-slate-900 font-bold text-xs transition-colors shrink-0"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

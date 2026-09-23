import React, { useState } from 'react';
import { Star, X, Sparkles } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { ImpactStyle } from '@capacitor/haptics';

interface NativeReviewPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
}

export const NativeReviewPromptModal: React.FC<NativeReviewPromptModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedRating, setSelectedRating] = useState<number>(5);

  if (!isOpen) return null;

  const handleStarClick = (rating: number) => {
    triggerHaptic(ImpactStyle.Light);
    setSelectedRating(rating);
  };

  const handleRate = () => {
    triggerHaptic(ImpactStyle.Medium);
    onSubmit(selectedRating);
  };

  const handleDismiss = () => {
    triggerHaptic(ImpactStyle.Light);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in select-none">
      <div 
        className="w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/80 p-6 flex flex-col items-center text-center space-y-4 transform transition-all duration-300"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-title"
      >
        {/* Top App Icon with radiant purple accent */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-100 via-purple-50 to-indigo-100 border border-purple-200/80 flex items-center justify-center text-purple-700 shadow-inner relative">
          <Sparkles className="w-8 h-8 stroke-[2]" />
          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-purple-600 animate-ping" />
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1 px-1">
          <h3 id="review-title" className="text-lg font-bold text-slate-900 font-google tracking-tight">
            Enjoying App Blueprint?
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Tap a star to rate your developer experience. Your feedback helps us improve every checklist and guide.
          </p>
        </div>

        {/* 5-Star Rating Selector */}
        <div className="flex items-center justify-center space-x-2 py-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              className="apple-press p-1 focus:outline-none transition-transform active:scale-125"
              aria-label={`Rate ${star} out of 5 stars`}
            >
              <Star
                className={`w-7 h-7 transition-colors duration-150 ${
                  star <= selectedRating
                    ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                    : 'text-slate-200 fill-slate-100'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Actions (Native iOS Style Stacked Buttons) */}
        <div className="w-full space-y-2 pt-2">
          <button
            type="button"
            onClick={handleRate}
            className="apple-press w-full py-2.5 px-4 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Submit Rating
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="apple-press w-full py-2 px-4 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition-colors cursor-pointer"
          >
            Not Now
          </button>
        </div>
      </div>
    </div>
  );
};

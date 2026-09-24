import React, { useEffect, useState, useRef } from 'react';
import { AppLogo } from './AppLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const hasDismissedRef = useRef(false);

  const dismiss = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 310);
  };

  // Snappy, Apple-standard launch pacing (~850ms hold + 300ms fade-out)
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 850);

    return () => {
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: fadingOut ? 'none' : 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Launch Screen"
    >
      <style>{`
        @keyframes splashSmoothFadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .splash-logo-container {
          animation: splashSmoothFadeIn 420ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        .splash-title-text {
          animation: splashSmoothFadeIn 420ms cubic-bezier(0.16, 1, 0.3, 1) 50ms both;
          will-change: opacity;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
      `}</style>

      {/* Content wrapper with clean 120fps opacity dissolve on exit */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: fadingOut ? 0 : 1,
          transition: 'opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'opacity',
        }}
      >
        {/* 1. Centered Flat White Logo */}
        <div
          className="splash-logo-container"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 280,
            height: 280,
          }}
        >
          <AppLogo 
            size={280} 
            color="#FFFFFF" 
            expanded15={true} 
            style={{ pointerEvents: 'none' }}
          />
        </div>

        {/* 2. Title cleanly positioned with fixed offset (never shifts or jumps on safe-area resolution) */}
        <div
          style={{
            position: 'absolute',
            bottom: 56,
            left: 0,
            right: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <span
            className="splash-title-text"
            style={{
              fontFamily: "'Google Sans', 'GoogleSans-Medium', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
              fontSize: 34,
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.5px',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
              display: 'block',
            }}
          >
            App Blueprint
          </span>
        </div>
      </div>
    </div>
  );
};

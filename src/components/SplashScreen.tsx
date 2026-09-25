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
    }, 250);
  };

  // Launch pacing: 1.5s forward-fuzzing animation hold + smooth fade-out
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 1550);

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
        transition: 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'opacity',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Launch Screen"
    >
      <style>{`
        @keyframes splashLogoFuzzForward {
          0% {
            opacity: 0;
            transform: scale(0.68);
            filter: blur(24px) drop-shadow(0 0 35px rgba(255, 255, 255, 0.95));
          }
          30% {
            opacity: 0.85;
            transform: scale(0.84);
            filter: blur(12px) drop-shadow(0 0 25px rgba(255, 255, 255, 0.7));
          }
          65% {
            opacity: 0.98;
            transform: scale(0.96);
            filter: blur(4px) drop-shadow(0 0 12px rgba(255, 255, 255, 0.4));
          }
          85% {
            opacity: 1;
            transform: scale(1.02);
            filter: blur(1px) drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
          }
          100% {
            opacity: 1;
            transform: scale(1.05);
            filter: blur(0px) drop-shadow(0 0 0px rgba(255, 255, 255, 0));
          }
        }

        .splash-logo-container {
          animation: splashLogoFuzzForward 1500ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, opacity, filter;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          transform-origin: center center;
        }

        @keyframes splashTitleIntro {
          0% {
            opacity: 0;
            transform: translateY(12px);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        .splash-title-text {
          animation: splashTitleIntro 800ms cubic-bezier(0.16, 1, 0.3, 1) 450ms both;
          will-change: transform, opacity, filter;
          -webkit-backface-visibility: hidden;
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
          transition: 'opacity 250ms ease-out',
          willChange: 'opacity',
        }}
      >
        {/* 1. Centered Flat White Logo (Exact geometric center matching native iOS LaunchScreen) */}
        <div
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

        {/* 2. Title cleanly positioned down below */}
        <div
          style={{
            position: 'absolute',
            bottom: 'max(calc(env(safe-area-inset-bottom, 0px) + 32px), 48px)',
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

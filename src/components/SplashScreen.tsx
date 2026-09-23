import React, { useEffect, useState, useRef } from 'react';

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
    }, 350);
  };

  // Play animation (1.7 seconds) brisk and smooth
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 1700);

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
        transform: fadingOut ? 'scale(1.1)' : 'scale(1)',
        transition: 'opacity 350ms cubic-bezier(0.16, 1, 0.3, 1), transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Launch Screen"
    >
      <style>{`
        @keyframes splashSlowZoom {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 1;
            transform: scale(1.03);
          }
        }

        @keyframes splashTitleReveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .splash-logo-container {
          animation: splashSlowZoom 1.9s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: transform, opacity;
        }

        .splash-title-text {
          animation: splashTitleReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
          will-change: opacity;
        }
      `}</style>

      {/* 1. Centered Flat White Logo (Expanded by 15%, No Highlights) */}
      <div
        style={{
          position: 'relative',
          marginTop: -48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="splash-logo-container"
          style={{
            position: 'relative',
            width: 276,
            height: 276,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="./logo.png"
            alt="App Blueprint Logo"
            style={{
              width: 276,
              height: 276,
              objectFit: 'contain',
              pointerEvents: 'none',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* 2. Simple Title Only Down Below (No Subtext) */}
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
        }}
      >
        <span
          className="splash-title-text"
          style={{
            fontFamily: "'Google Sans', 'GoogleSans-Medium', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.8)',
            display: 'block',
          }}
        >
          App Blueprint
        </span>
      </div>
    </div>
  );
};

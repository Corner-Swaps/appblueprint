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
    }, 380);
  };

  // Play animation slowly (3.0 seconds) so the user can clearly see the logo and title
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 3000);

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
        transform: fadingOut ? 'scale(1.02)' : 'scale(1)',
        transition: 'opacity 380ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Launch Screen"
    >
      <style>{`
        @keyframes splashGlowPulse {
          0% {
            opacity: 0.1;
            transform: scale(0.75);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.15);
          }
          100% {
            opacity: 0.55;
            transform: scale(1);
          }
        }

        @keyframes splashLogoReveal {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
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
          animation: splashLogoReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: opacity;
        }

        .splash-title-text {
          animation: splashTitleReveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;
          will-change: opacity;
        }
      `}</style>

      {/* Ambient luminous radial glow expanding smoothly behind the logo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.14) 0px, rgba(255, 255, 255, 0.04) 190px, transparent 360px)',
          animation: 'splashGlowPulse 2.8s ease-out forwards',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Centered Original 3D Chrome Checkmark & Rocket Logo (Unified locked together, zero movement) */}
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
            width: 240,
            height: 240,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 16px 36px rgba(255, 255, 255, 0.2))',
          }}
        >
          <img
            src="./logo.png"
            alt="App Blueprint Logo"
            style={{
              width: 240,
              height: 240,
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

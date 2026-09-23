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
    }, 380);
  };

  // Play animation slowly so user can appreciate every detail, then smoothly transition into app
  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 2500);

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
        transform: fadingOut ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 380ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 380ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Intro"
    >
      <style>{`
        @keyframes splashGlowPulse {
          0% {
            opacity: 0.15;
            transform: scale(0.8);
          }
          55% {
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
            transform: translateY(24px) scale(0.88);
          }
          65% {
            opacity: 1;
            transform: translateY(-4px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes splashCheckmarkSweep {
          0% {
            opacity: 0;
            transform: translate(-14px, 14px) scale(0.92);
          }
          65% {
            opacity: 1;
            transform: translate(0, 0) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes splashRocketRise {
          0% {
            opacity: 0;
            transform: translate(16px, 22px) scale(0.9);
          }
          65% {
            opacity: 1;
            transform: translate(-2px, -4px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes splashFloatBreath {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes splashTitleReveal {
          0% {
            opacity: 0;
            transform: translateY(16px);
            letter-spacing: 0.06em;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            letter-spacing: -0.3px;
          }
        }

        @keyframes splashSubReveal {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 0.7;
            transform: translateY(0);
          }
        }

        .splash-anim-checkmark {
          animation: splashCheckmarkSweep 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .splash-anim-rocket {
          animation: splashRocketRise 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .splash-logo-container {
          animation: splashLogoReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .splash-float-container {
          animation: splashFloatBreath 3.2s ease-in-out infinite 1.6s;
        }

        .splash-title-text {
          animation: splashTitleReveal 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
        }

        .splash-sub-text {
          animation: splashSubReveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s both;
        }
      `}</style>

      {/* Ambient luminous radial glow expanding smoothly behind the logo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.12) 0px, rgba(255, 255, 255, 0.04) 180px, transparent 340px)',
          animation: 'splashGlowPulse 2.4s ease-out forwards',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Centered Crisp White Checkmark & Simple Rocket Logo */}
      <div
        className="splash-float-container"
        style={{
          position: 'relative',
          marginTop: -52,
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
            width: 230,
            height: 230,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0 14px 34px rgba(255, 255, 255, 0.16))',
          }}
        >
          <AppLogo size={230} animate={true} color="#FFFFFF" />
        </div>
      </div>

      {/* 2. App Blueprint Title & Subtitle Positioned Lower at the Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 54,
          left: 0,
          right: 0,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
        }}
      >
        <span
          className="splash-title-text"
          style={{
            fontFamily: "'Google Sans', 'GoogleSans-Medium', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: 34,
            fontWeight: 700,
            color: '#FFFFFF',
            textShadow: '0 2px 12px rgba(0, 0, 0, 0.8)',
            display: 'block',
          }}
        >
          App Blueprint
        </span>
        <span
          className="splash-sub-text"
          style={{
            fontFamily: "'Google Sans', -apple-system, BlinkMacSystemFont, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: '#A1A1AA',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            display: 'block',
          }}
        >
          Mobile Production OS
        </span>
      </div>
    </div>
  );
};

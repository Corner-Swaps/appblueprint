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

  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 2450);

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
        background: 'radial-gradient(circle at 50% 44%, #FAF5FF 0%, #F3E8FF 40%, #EDE9FE 70%, #E9D5FF 100%)',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 380ms cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="LaunchReady Intro"
    >
      {/* Soft central ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 44%, rgba(255, 255, 255, 0.95) 0px, rgba(216, 180, 254, 0.35) 200px, transparent 380px)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Centered Crisp White Icon with Radiant Violet Drop Shadow (210x210) */}
      <div
        className="lr-splash-icon"
        style={{
          position: 'relative',
          width: 210,
          height: 210,
          marginTop: -48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src="/launchready_logo_white.png"
          alt="LaunchReady"
          style={{
            width: 210,
            height: 210,
            objectFit: 'contain',
            position: 'relative',
            zIndex: 2,
            filter: 'drop-shadow(0 16px 32px rgba(124, 58, 237, 0.28)) drop-shadow(0 4px 10px rgba(139, 92, 246, 0.18))',
          }}
        />
      </div>

      {/* 2. LaunchReady Title Positioned Lower at the Bottom */}
      <div
        className="lr-splash-title"
        style={{
          position: 'absolute',
          bottom: 52,
          left: 0,
          right: 0,
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: "'Google Sans', 'GoogleSans-Medium', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: 34,
            fontWeight: 600,
            color: '#2E1065',
            letterSpacing: '-0.3px',
            textShadow: '0 2px 10px rgba(124, 58, 237, 0.14)',
          }}
        >
          LaunchReady
        </span>
      </div>
    </div>
  );
};

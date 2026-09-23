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

  useEffect(() => {
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 400);

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
        background: 'radial-gradient(ellipse at 50% 45%, #FAF5FF 0%, #F3E8FF 40%, #E9D5FF 80%, #DDD6FE 100%)',
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 250ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Intro"
    >
      {/* 1. Centered Crisp Purple Gradient Rocket Logo with Radiant Halo */}
      <div
        className="lr-splash-icon"
        style={{
          position: 'relative',
          width: 250,
          height: 250,
          marginTop: -48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 16px 36px rgba(126, 34, 206, 0.25))',
        }}
      >
        <AppLogo size={250} />
      </div>

      {/* 2. App Blueprint Title Positioned Lower at the Bottom */}
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
            fontWeight: 700,
            color: '#3B0764',
            letterSpacing: '-0.3px',
          }}
        >
          App Blueprint
        </span>
      </div>
    </div>
  );
};

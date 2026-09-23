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
        background: '#000000',
        opacity: fadingOut ? 0 : 1,
        transform: fadingOut ? 'scale(1.03)' : 'scale(1)',
        transition: 'opacity 250ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 250ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Intro"
    >
      {/* Soft central ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.08) 0px, rgba(255, 255, 255, 0.02) 180px, transparent 320px)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Centered Crisp White Rocket Icon */}
      <div
        className="lr-splash-icon"
        style={{
          position: 'relative',
          width: 230,
          height: 230,
          marginTop: -48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'drop-shadow(0 12px 32px rgba(255, 255, 255, 0.15))',
        }}
      >
        <img
          src="/logo_solid_white.png"
          alt="App Blueprint"
          style={{
            width: 230,
            height: 230,
            objectFit: 'contain',
            display: 'block',
          }}
        />
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
            color: '#FFFFFF',
            letterSpacing: '-0.3px',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
          }}
        >
          App Blueprint
        </span>
      </div>
    </div>
  );
};

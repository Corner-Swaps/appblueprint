import React, { useEffect, useState, useRef } from 'react';
import { Capacitor } from '@capacitor/core';
import { AppLogo } from './AppLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // If running natively in Capacitor on iOS, native SwiftUI BlueprintSplashIntroView handles the intro seamlessly!
  if (typeof window !== 'undefined' && Capacitor.isNativePlatform()) {
    return null;
  }

  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const hasDismissedRef = useRef(false);

  const dismiss = () => {
    if (hasDismissedRef.current) return;
    hasDismissedRef.current = true;
    setFadingOut(true);
    setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 350);
  };

  useEffect(() => {
    // 0.08s initial delay before expansion starts (matching Essential Timer exact timing)
    const animTimer = setTimeout(() => {
      setAnimating(true);
    }, 80);

    // 2.18s total time (0.08s delay + 1.55s ease curve + 0.55s hold breath)
    const dismissTimer = setTimeout(() => {
      dismiss();
    }, 2180);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(dismissTimer);
    };
  }, []);

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        cursor: 'pointer',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        pointerEvents: (!visible || fadingOut) ? 'none' : 'auto',
        display: visible ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000000',
        opacity: fadingOut ? 0 : 1,
        transition: 'opacity 350ms cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
      }}
      aria-label="App Blueprint Launch Screen"
    >
      {/* Soft central ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 20px, transparent 280px)',
          pointerEvents: 'none',
        }}
      />

      {/* 1. Centered White Logo (201x201) with marginTop: -48 (Matching Essential Timer exact optical centering) */}
      <div
        style={{
          position: 'relative',
          width: 201,
          height: 201,
          marginTop: -48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: animating ? 'scale(1)' : 'scale(0.92)',
          filter: animating ? 'blur(0px)' : 'blur(5px)',
          opacity: animating ? 1 : 0,
          transition: 'transform 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0), filter 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0), opacity 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0)',
          willChange: 'transform, filter, opacity',
        }}
      >
        <AppLogo 
          size={201} 
          color="#FFFFFF" 
          expanded15={true} 
          style={{ pointerEvents: 'none' }}
        />
      </div>

      {/* 2. Title Positioned Lower at the Bottom (Matching Essential Timer exact bottom placement & typography) */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          textAlign: 'center',
          transform: animating ? 'scale(1)' : 'scale(0.94)',
          filter: animating ? 'blur(0px)' : 'blur(5px)',
          opacity: animating ? 1 : 0,
          transition: 'transform 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0), filter 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0), opacity 1550ms cubic-bezier(0.20, 0.0, 0.15, 1.0)',
          willChange: 'transform, filter, opacity',
        }}
      >
        <span
          style={{
            fontFamily: "'Google Sans', 'GoogleSans-Medium', -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
            fontSize: 34,
            fontWeight: 500,
            color: '#FFFFFF',
            letterSpacing: '-0.3px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.40)',
          }}
        >
          App Blueprint
        </span>
      </div>
    </div>
  );
};

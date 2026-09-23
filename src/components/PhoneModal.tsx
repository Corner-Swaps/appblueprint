import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { copyToClipboard } from '../utils/clipboard';
import { 
  X, 
  Smartphone, 
  Share, 
  PlusSquare, 
  Copy, 
  CheckCheck, 
  Wifi, 
  ExternalLink,
  Layers,
  ArrowRight
} from 'lucide-react';

interface PhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  localIp?: string;
}

export const PhoneModal: React.FC<PhoneModalProps> = ({ isOpen, onClose, localIp = '192.168.10.36' }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // The local network URL that the phone on the same Wi-Fi can open
  const networkUrl = `http://${localIp}:3000`;

  // Close modal on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    QRCode.toDataURL(networkUrl, {
      width: 260,
      margin: 2,
      color: {
        dark: '#0071e3',
        light: '#ffffff'
      }
    }).then(url => {
      setQrDataUrl(url);
    }).catch(err => {
      console.error('Failed to generate QR code', err);
    });
  }, [networkUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    copyToClipboard(networkUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md transition-opacity">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-xl bg-white dark:bg-apple-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-apple-gray-200 dark:border-apple-gray-800 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-apple-gray-200 dark:border-apple-gray-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/logo.png"
              alt="App Blueprint Logo"
              className="w-10 h-10 rounded-xl shadow-xs object-cover border border-slate-200/60"
            />
            <div>
              <h2 className="text-lg font-bold text-apple-gray-900 dark:text-white">
                Load App Blueprint on Your Phone
              </h2>
              <p className="text-xs text-apple-gray-500 dark:text-apple-gray-400">
                Install as a standalone home-screen app on your iPhone or Android
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-apple-gray-400 hover:text-apple-gray-600 dark:hover:text-apple-200 hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-apple-gray-700 dark:text-apple-300">
          
          {/* QR Code & Direct URL Container */}
          <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200 dark:border-apple-gray-800">
            {/* QR Image */}
            <div className="bg-white p-2.5 rounded-2xl shadow-apple-md shrink-0">
              {qrDataUrl ? (
                <img src={qrDataUrl} alt="QR Code to load app on phone" className="w-40 h-40 rounded-xl" />
              ) : (
                <div className="w-40 h-40 flex items-center justify-center text-xs text-apple-gray-400">
                  Generating QR...
                </div>
              )}
            </div>

            {/* URL details */}
            <div className="space-y-3 flex-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-xs text-apple-green font-semibold">
                <Wifi className="w-3.5 h-3.5" />
                <span>Wi-Fi Network Server Active</span>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-wider text-apple-gray-400 font-bold block mb-1">
                  Local Network Address:
                </span>
                <div className="font-mono text-xs font-bold text-apple-gray-900 dark:text-white bg-white dark:bg-apple-gray-900 p-2 rounded-lg border border-apple-gray-200 dark:border-apple-gray-800 flex items-center justify-between">
                  <span className="truncate pr-2">{networkUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1 text-apple-gray-500 hover:text-apple-blue"
                    title="Copy URL"
                  >
                    {copiedUrl ? <CheckCheck className="w-3.5 h-3.5 text-apple-green" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <p className="text-[11px] text-apple-gray-500 leading-relaxed">
                Ensure your phone is connected to the same Wi-Fi network.
              </p>
            </div>
          </div>

          {/* Step-by-Step for iPhone / iOS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400 flex items-center space-x-1.5">
              <span>iPhone 1-Tap Installation Steps (Safari)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200 dark:border-apple-gray-800 space-y-1">
                <span className="w-5 h-5 rounded-full bg-apple-blue text-white font-bold text-[11px] flex items-center justify-center">
                  1
                </span>
                <p className="font-semibold text-apple-gray-900 dark:text-white pt-1">
                  Scan QR with Camera
                </p>
                <p className="text-[11px] text-apple-gray-500">
                  Open Camera on your iPhone, point at the QR code above, and tap the yellow Safari link.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200 dark:border-apple-gray-800 space-y-1">
                <span className="w-5 h-5 rounded-full bg-apple-blue text-white font-bold text-[11px] flex items-center justify-center">
                  2
                </span>
                <p className="font-semibold text-apple-gray-900 dark:text-white pt-1 flex items-center space-x-1">
                  <span>Tap Share</span>
                  <Share className="w-3.5 h-3.5 text-apple-blue" />
                </p>
                <p className="text-[11px] text-apple-gray-500">
                  Tap the standard Share button at the bottom of Safari (the square with an arrow pointing up).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200 dark:border-apple-gray-800 space-y-1">
                <span className="w-5 h-5 rounded-full bg-apple-blue text-white font-bold text-[11px] flex items-center justify-center">
                  3
                </span>
                <p className="font-semibold text-apple-gray-900 dark:text-white pt-1 flex items-center space-x-1">
                  <span>Add to Home Screen</span>
                  <PlusSquare className="w-3.5 h-3.5 text-apple-green" />
                </p>
                <p className="text-[11px] text-apple-gray-500">
                  Scroll down and tap <strong>"Add to Home Screen"</strong>, then tap <strong>"Add"</strong> in the top right.
                </p>
              </div>
            </div>
          </div>

          {/* Native Xcode / Capacitor Option */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-apple-blue flex items-center space-x-1.5">
                <Layers className="w-4 h-4" />
                <span>Want to build it as a Native iOS App in Xcode?</span>
              </span>
            </div>
            <p className="text-[11px] text-apple-gray-600 dark:text-apple-300 leading-relaxed">
              We have also initialized a native <strong>Capacitor iOS project</strong>. You can open it in Xcode and run it directly on your connected iPhone 16 Pro Max!
            </p>
            <div className="font-mono text-[11px] bg-apple-gray-950 text-apple-gray-200 p-2.5 rounded-lg">
              <code>npx cap open ios</code>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

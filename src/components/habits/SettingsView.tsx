import React from 'react';
import { 
  Settings, 
  Moon, 
  Sun, 
  RotateCcw, 
  Download, 
  Upload, 
  Smartphone, 
  ShieldCheck, 
  Bell, 
  Volume2,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface SettingsViewProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onResetHabits: () => void;
  onOpenPhoneModal: () => void;
  onExportJson: () => void;
  onImportJson: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  isDarkMode,
  toggleDarkMode,
  onResetHabits,
  onOpenPhoneModal,
  onExportJson,
  onImportJson,
}) => {
  return (
    <div className="w-full pb-36 px-4 ios-safe-top space-y-6 max-w-xl mx-auto text-white">
      
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-lg">
            <Settings className="w-6 h-6 stroke-white text-white" />
          </div>
          <div>
            <span className="text-[11px] font-bold tracking-widest uppercase text-white/60">
              System & Preferences
            </span>
            <h1 className="text-2xl font-black text-white tracking-tight">
              Settings
            </h1>
          </div>
        </div>
      </div>

      {/* Card 1: Appearance & Touch Haptics */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-5 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Appearance & Touch
        </h3>

        {/* OLED Dark Theme Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Moon className="w-4 h-4 stroke-white text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Dark OLED Theme
              </span>
              <span className="text-xs text-white/60">
                High-contrast pure black canvas with white text
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 border border-white/25 text-white text-xs font-bold">
            Active
          </span>
        </div>

        {/* Tactile Feedback Row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center space-x-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Volume2 className="w-4 h-4 stroke-white text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">
                Apple Fluid Motion
              </span>
              <span className="text-xs text-white/60">
                Interactive tactile spring curves on tap
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-white/20 border border-white/25 text-white text-xs font-bold">
            Enabled
          </span>
        </div>
      </div>

      {/* Card 2: Device Sync & Phone Loading */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Device & Live Testing
        </h3>

        <button
          onClick={onOpenPhoneModal}
          className="apple-press w-full p-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-between shadow-lg transition-all"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-white">
              <Smartphone className="w-5 h-5 stroke-white text-white" />
            </div>
            <div className="text-left">
              <span className="text-sm font-bold text-white block">
                Load on iPhone
              </span>
              <span className="text-xs text-white/70">
                Connected: iPhone 16 Pro Max (Slava)
              </span>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 stroke-white text-white" />
        </button>
      </div>

      {/* Card 3: App Store Identity */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Store Configuration
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between items-center py-1">
            <span className="text-white/60">Bundle Identifier:</span>
            <span className="font-mono text-white font-semibold">com.slava.launchready</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-white/10">
            <span className="text-white/60">Architecture:</span>
            <span className="text-white font-semibold">TypeScript • React • Capacitor Native</span>
          </div>
          <div className="flex justify-between items-center py-1 border-t border-white/10">
            <span className="text-white/60">Target Systems:</span>
            <span className="text-white font-semibold">iOS 17+ • Android API 34+</span>
          </div>
        </div>
      </div>

      {/* Card 4: Data Management */}
      <div className="rounded-3xl bg-[#121216] border border-white/10 p-6 space-y-4 shadow-2xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-white/60">
          Data & Backup
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onExportJson}
            className="apple-press p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <Download className="w-4 h-4 stroke-white text-white" />
            <span>Export Backup</span>
          </button>

          <label className="apple-press p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs flex items-center justify-center space-x-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 stroke-white text-white" />
            <span>Restore JSON</span>
            <input type="file" accept=".json" onChange={onImportJson} className="hidden" />
          </label>
        </div>

        <button
          onClick={onResetHabits}
          className="apple-press w-full p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4 stroke-white text-white" />
          <span>Reset All Checklist Data</span>
        </button>
      </div>

    </div>
  );
};

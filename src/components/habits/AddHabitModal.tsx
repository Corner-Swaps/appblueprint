import React, { useState, useEffect } from 'react';
import { HabitTask, HabitCategory, PastelColorTheme, HabitIconName } from '../../types';
import { PASTEL_THEMES } from '../../data/habits';
import { 
  X, 
  Trash2, 
  Lightbulb, 
  ShieldCheck, 
  Scale, 
  Store, 
  Terminal, 
  Smartphone, 
  Rocket, 
  Code, 
  Zap, 
  Sparkles, 
  Check
} from 'lucide-react';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: HabitTask) => void;
  onDelete?: (id: string) => void;
  editingHabit?: HabitTask | null;
}

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  editingHabit,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [badgeText, setBadgeText] = useState('');
  const [category, setCategory] = useState<HabitCategory>('architecture');
  const [targetValue, setTargetValue] = useState(1);
  const [currentValue, setCurrentValue] = useState(0);
  const [unit, setUnit] = useState('tasks');
  const [step, setStep] = useState(1);
  const [streakLabel, setStreakLabel] = useState('Phase 1');
  const [colorTheme, setColorTheme] = useState<PastelColorTheme>('cyan');
  const [iconName, setIconName] = useState<HabitIconName>('lightbulb');

  useEffect(() => {
    if (editingHabit) {
      setTitle(editingHabit.title);
      setSubtitle(editingHabit.subtitle || '');
      setBadgeText(editingHabit.badgeText || '');
      setCategory(editingHabit.category);
      setTargetValue(editingHabit.targetValue);
      setCurrentValue(editingHabit.currentValue);
      setUnit(editingHabit.unit);
      setStep(editingHabit.step);
      setStreakLabel(editingHabit.streakLabel || `${editingHabit.streakDays} Days`);
      setColorTheme(editingHabit.colorTheme);
      setIconName(editingHabit.iconName);
    } else {
      setTitle('');
      setSubtitle('');
      setBadgeText('');
      setCategory('architecture');
      setTargetValue(1);
      setCurrentValue(0);
      setUnit('tasks');
      setStep(1);
      setStreakLabel('Phase 1');
      setColorTheme('cyan');
      setIconName('lightbulb');
    }
  }, [editingHabit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const habitToSave: HabitTask = {
      id: editingHabit ? editingHabit.id : `task-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      badgeText: badgeText.trim() || undefined,
      category,
      targetValue: Number(targetValue) || 1,
      currentValue: Number(currentValue) || 0,
      unit: unit.trim(),
      step: Number(step) || 1,
      streakDays: 1,
      streakLabel: streakLabel.trim() || 'Sprint 1',
      colorTheme,
      iconName,
      isCompleted: editingHabit ? editingHabit.isCompleted : false,
      completedDates: editingHabit ? editingHabit.completedDates : []
    };

    onSave(habitToSave);
    onClose();
  };

  const icons: { name: HabitIconName; label: string; component: React.ComponentType<{ className?: string }> }[] = [
    { name: 'lightbulb', label: 'Idea', component: Lightbulb },
    { name: 'shield', label: 'Security', component: ShieldCheck },
    { name: 'scale', label: 'Legal', component: Scale },
    { name: 'store', label: 'Store', component: Store },
    { name: 'terminal', label: 'Build', component: Terminal },
    { name: 'smartphone', label: 'QA', component: Smartphone },
    { name: 'rocket', label: 'Launch', component: Rocket },
    { name: 'code', label: 'Code', component: Code },
    { name: 'zap', label: 'Fast', component: Zap },
    { name: 'sparkles', label: 'Special', component: Sparkles },
  ];

  const colorThemes: PastelColorTheme[] = [
    'cyan', 'coral', 'periwinkle', 'blush', 'mint', 'peach', 'sky', 'lavender'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="fixed inset-0" onClick={onClose} />

      <div 
        className="relative w-full max-w-lg bg-[#121216] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/15 z-10 max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-200 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-base font-bold text-white">
            {editingHabit ? 'Edit Task' : 'New Launch Task'}
          </h2>
          <button
            onClick={onClose}
            className="apple-press p-1.5 rounded-full text-white/60 hover:text-white bg-white/10"
          >
            <X className="w-5 h-5 stroke-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 overflow-y-auto flex-1 text-xs text-white">
          
          {/* Title */}
          <div>
            <label className="font-bold text-white/80 block mb-1">
              Task Title:
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. PrivacyInfo.xcprivacy Manifest, In-App Purchases..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 outline-none text-xs sm:text-sm text-white placeholder-white/40 focus:ring-1 focus:ring-white"
            />
          </div>

          {/* Subtitle & Pill Badge */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-white/80 block mb-1">
                Subtitle:
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. 3/3 Core Specs Scoped"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 outline-none text-xs text-white placeholder-white/40"
              />
            </div>

            <div>
              <label className="font-bold text-white/80 block mb-1">
                Badge Text:
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                placeholder="e.g. Mandatory, iOS 17+"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 outline-none text-xs text-white placeholder-white/40"
              />
            </div>
          </div>

          {/* Category & Sprint Label */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-white/80 block mb-1">
                Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as HabitCategory)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white font-medium outline-none cursor-pointer"
              >
                <option value="architecture" className="bg-[#16161A] text-white">Architecture</option>
                <option value="security" className="bg-[#16161A] text-white">Security & Privacy</option>
                <option value="legal" className="bg-[#16161A] text-white">Legal & Compliance</option>
                <option value="store" className="bg-[#16161A] text-white">Store Guidelines</option>
                <option value="qa" className="bg-[#16161A] text-white">QA Testing</option>
                <option value="launch" className="bg-[#16161A] text-white">Submission & Launch</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-white/80 block mb-1">
                Sprint / Phase Tag:
              </label>
              <input
                type="text"
                value={streakLabel}
                onChange={(e) => setStreakLabel(e.target.value)}
                placeholder="e.g. Phase 1, Sprint 2"
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
              />
            </div>
          </div>

          {/* Target & Unit */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-white/80 block mb-1">
                Target Steps:
              </label>
              <input
                type="number"
                min="1"
                value={targetValue}
                onChange={(e) => setTargetValue(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-white/80 block mb-1">
                Unit:
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="steps, specs..."
                className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 text-white outline-none"
              />
            </div>
          </div>

          {/* Dark Color Theme Picker */}
          <div>
            <label className="font-bold text-white/80 block mb-1.5">
              Card Theme:
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {colorThemes.map((themeKey) => {
                const t = PASTEL_THEMES[themeKey];
                const isSelected = colorTheme === themeKey;
                return (
                  <button
                    key={themeKey}
                    type="button"
                    onClick={() => setColorTheme(themeKey)}
                    className={`apple-press h-10 rounded-xl border flex items-center justify-center transition-all ${
                      isSelected ? 'ring-2 ring-white scale-105' : 'hover:scale-102'
                    }`}
                    style={{ backgroundColor: t.bg, borderColor: 'rgba(255,255,255,0.2)' }}
                  >
                    {isSelected && <Check className="w-4 h-4 stroke-white stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Icon Selector (Zero Emojis, Pure White Vectors) */}
          <div>
            <label className="font-bold text-white/80 block mb-1.5">
              Vector SVG Icon:
            </label>
            <div className="grid grid-cols-5 gap-2">
              {icons.map((item) => {
                const IconComponent = item.component;
                const isSelected = iconName === item.name;
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIconName(item.name)}
                    className={`apple-press p-2.5 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all ${
                      isSelected 
                        ? 'bg-white/25 border-white text-white shadow-sm' 
                        : 'bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 stroke-white" />
                    <span className="text-[10px] font-medium truncate w-full text-center">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 flex items-center justify-between border-t border-white/10">
            {editingHabit && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Delete this task?')) {
                    onDelete(editingHabit.id);
                    onClose();
                  }
                }}
                className="apple-press px-3.5 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 font-bold flex items-center space-x-1"
              >
                <Trash2 className="w-4 h-4 stroke-white" />
                <span>Delete</span>
              </button>
            ) : <div />}

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="apple-press px-4 py-2 rounded-full border border-white/20 text-white/80 font-bold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apple-press px-5 py-2 rounded-full bg-white text-black font-bold shadow-md hover:bg-white/90"
              >
                {editingHabit ? 'Save Changes' : 'Add Task'}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

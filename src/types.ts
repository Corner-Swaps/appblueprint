export interface Project {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  completedItemIds: string[];
  color?: string;
  phaseOrder?: string[];
  customPhases?: Phase[];
  customItems?: Record<string, ChecklistItem[]>;
  deletedPhaseIds?: string[];
}

export type Platform = 'ios' | 'android' | 'both';

export type Category = 'security' | 'legal' | 'design' | 'functionality' | 'store' | 'cicd';

export type Priority = 'blocker' | 'high' | 'medium';

export type ItemStatus = 'not_started' | 'in_progress' | 'blocked' | 'completed';

export interface CodeSnippet {
  language: string;
  filename: string;
  code: string;
  explanation?: string;
}

export interface StoreGuidelineRef {
  name: string;
  url: string;
  codeRef?: string;
}

export interface ChecklistItem {
  id: string;
  phaseId: string;
  title: string;
  shortDescription: string;
  category: Category;
  platform: Platform;
  priority: Priority;
  storeGuideline?: StoreGuidelineRef;
  whyItMatters: string;
  implementationSteps: string[];
  agentPrompt?: string;
  codeSnippet?: CodeSnippet;
  commonRejectionTraps: string[];
  verificationQuestions: string[];
}

export interface Phase {
  id: string;
  number: number;
  title: string;
  shortTitle: string;
  description: string;
  iconName: string;
  items: ChecklistItem[];
}

export interface TroubleshootingScenario {
  id: string;
  title: string;
  category: 'rejection' | 'build' | 'runtime' | 'store_ops';
  platform: Platform;
  triggerSymptom: string;
  rootCauses: string[];
  immediateFix: string[];
  codeSnippet?: CodeSnippet;
  appStoreGuidelineRef?: string;
  googlePlayPolicyRef?: string;
}

export interface ProjectState {
  projectName: string;
  appIdentifier: string;
  completedItemIds: string[];
  itemNotes: Record<string, string>;
  itemStatus: Record<string, ItemStatus>;
  lastUpdated: string;
}

export type NavigationTab = 'today' | 'blueprint' | 'advisor' | 'readiness' | 'settings';

export type HabitCategory = 
  | 'all' 
  | 'architecture' 
  | 'security' 
  | 'legal' 
  | 'store' 
  | 'qa' 
  | 'launch'
  | 'health' 
  | 'fitness' 
  | 'mind' 
  | 'nutrition' 
  | 'dev';

export type PastelColorTheme = 
  | 'cyan' 
  | 'coral' 
  | 'periwinkle' 
  | 'blush' 
  | 'mint' 
  | 'peach' 
  | 'sky' 
  | 'lavender';

export type HabitIconName = 
  | 'lightbulb'
  | 'shield'
  | 'scale'
  | 'store'
  | 'terminal'
  | 'smartphone'
  | 'rocket'
  | 'code'
  | 'zap'
  | 'sparkles'
  | 'droplet' 
  | 'activity' 
  | 'coffee' 
  | 'utensils' 
  | 'footprints' 
  | 'heart' 
  | 'book' 
  | 'dumbbell';

export interface HabitTask {
  id: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  category: HabitCategory;
  currentValue: number;
  targetValue: number;
  unit: string;
  step: number;
  streakDays: number;
  streakLabel?: string; // e.g. "Phase 1", "365 Days", "Sprint 1"
  colorTheme: PastelColorTheme;
  iconName: HabitIconName;
  isCompleted: boolean;
  completedDates: string[]; // e.g. "2026-09-09"
  phaseId?: string; // Links to PHASES_DATA
  priority?: Priority;
  whyItMatters?: string;
  implementationSteps?: string[];
  commonRejectionTraps?: string[];
  storeGuidelineRef?: string;
}

export interface CalendarDay {
  dayName: string; // "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"
  dateNumber: number; // 3, 4, 5, 6, 7, 8, 9
  fullDate: string; // "2026-09-09"
  hasMilestone?: boolean;
}


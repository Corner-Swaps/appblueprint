import React from 'react';
import { ResourceCategory, RESOURCES_DATA } from '../data/resources';
import { 
  Brain, 
  Layout, 
  Type, 
  Database, 
  Lock, 
  EyeOff, 
  ScrollText, 
  Rocket, 
  BarChart2, 
  ExternalLink,
  ChevronRight,
  BookOpen,
  GraduationCap
} from 'lucide-react';

export interface CategoryMeta {
  id: ResourceCategory;
  title: string;
  badge: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const RESOURCE_CATEGORY_CONFIGS: CategoryMeta[] = [
  {
    id: 'ai_models',
    title: 'AI Models & Coding Agents',
    badge: 'Core Intelligence',
    iconBg: 'bg-purple-600',
    icon: <Brain className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'design',
    title: 'Design Systems & UI/UX',
    badge: 'Interface Systems',
    iconBg: 'bg-rose-500',
    icon: <Layout className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'typography',
    title: 'Typography & Font Systems',
    badge: 'Curated Fonts',
    iconBg: 'bg-indigo-600',
    icon: <Type className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'github_repos',
    title: 'Frameworks & Verified SDKs',
    badge: 'Verified SDKs',
    iconBg: 'bg-blue-600',
    icon: (
      <svg className="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    )
  },
  {
    id: 'backend',
    title: 'Backend, Database & Cloud',
    badge: 'Serverless Cloud',
    iconBg: 'bg-teal-600',
    icon: <Database className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'security',
    title: 'Security & Keychain Auth',
    badge: 'Hardware Enclave',
    iconBg: 'bg-emerald-600',
    icon: <Lock className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'privacy',
    title: 'Privacy & Store Compliance',
    badge: 'Store Compliance',
    iconBg: 'bg-indigo-600',
    icon: <EyeOff className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'legal',
    title: 'Legal & Privacy Templates',
    badge: 'Terms & Policies',
    iconBg: 'bg-amber-600',
    icon: <ScrollText className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'launch',
    title: 'App Store Launch & Release',
    badge: 'Store Publishing',
    iconBg: 'bg-cyan-600',
    icon: <Rocket className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  },
  {
    id: 'analytics',
    title: 'Crash Reporting & Diagnostics',
    badge: 'Telemetry & Health',
    iconBg: 'bg-violet-600',
    icon: <BarChart2 className="w-4.5 h-4.5 text-white stroke-[2.2]" />
  }
];

interface ResourcesSidebarProps {
  activeCategoryId: ResourceCategory;
  onSelectCategory: (categoryId: ResourceCategory) => void;
}

export const ResourcesSidebar: React.FC<ResourcesSidebarProps> = ({
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <aside className="space-y-4">
      {/* Academy Header Card */}
      <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-black/8 shadow-sm p-4 sm:p-5 space-y-3.5">
        <div className="flex items-center justify-between pb-2.5 border-b border-black/5">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-purple-600 stroke-[2.2]" />
            <h2 className="text-sm font-black text-slate-900 font-google uppercase tracking-wider">
              Academy &amp; Resources
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            10 Categories
          </span>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Select any resource category below to open its verified tools, SDKs, and 1-click AI coding prompts.
        </p>

        {/* Category List */}
        <div className="space-y-2 pt-1">
          {RESOURCE_CATEGORY_CONFIGS.map((cat) => {
            const items = RESOURCES_DATA.filter(r => r.category === cat.id);
            const isActive = activeCategoryId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`w-full text-left p-3.5 sm:p-4 rounded-2xl flex items-center justify-between group transition-all duration-150 border ${
                  isActive
                    ? 'bg-blue-50/80 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                    : 'bg-white/70 hover:bg-slate-50/90 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 pr-2">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${cat.iconBg} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center space-x-1.5 mb-0.5">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {cat.badge}
                      </span>
                    </div>
                    <p className={`text-sm sm:text-base font-bold font-google leading-snug break-words transition-colors ${
                      isActive ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {cat.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/80 shadow-2xs">
                    {items.length}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-slate-300 group-hover:text-slate-600'
                  }`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Developer Reference & Guidelines Quick Card */}
      <div className="bg-white/80 rounded-3xl border border-black/8 p-4 space-y-2.5 text-xs">
        <div className="flex items-center space-x-2 text-slate-800 font-bold font-google">
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Developer Knowledge Base</span>
        </div>
        <ul className="space-y-1.5 text-slate-600 pt-1">
          <li>
            <a
              href="https://developer.apple.com/design/human-interface-guidelines"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Apple Human Interface Guidelines</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
          <li>
            <a
              href="https://m3.material.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Material Design 3 Guidelines</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
          <li>
            <a
              href="https://developer.android.com/distribute/play-policies"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <span>Google Play Developer Policy Center</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

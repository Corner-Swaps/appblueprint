import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  Flame, 
  Heart, 
  ShieldCheck, 
  UserPlus, 
  Award,
  CheckCircle2
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const [cheeredIds, setCheeredIds] = useState<string[]>([]);

  const toggleCheer = (id: string) => {
    setCheeredIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const members = [
    { id: '1', name: 'Alex Rivera', habit: 'Drink water (3000ml)', streak: 365, avatar: 'AR' },
    { id: '2', name: 'Sarah Chen', habit: '10,000 Steps Walk', streak: 366, avatar: 'SC' },
    { id: '3', name: 'Marcus Vance', habit: 'Morning Yoga 30m', streak: 342, avatar: 'MV' },
    { id: '4', name: 'Elena Rostov', habit: 'Meditation 30m', streak: 289, avatar: 'ER' },
  ];

  return (
    <div className="max-w-md mx-auto w-full pb-28 px-4 pt-4 space-y-4">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-apple-gray-900 dark:text-white tracking-tight">
            Community & Squads
          </h1>
          <p className="text-xs text-apple-gray-500">
            Share consistency, compete in challenges, cheer squad mates
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-apple-purple/10 text-apple-purple flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      {/* Active Squad Challenge Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-tr from-[#FF4B72] to-[#FF8FA3] text-white shadow-apple-md space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider opacity-90">
          <Trophy className="w-4 h-4" />
          <span>Active Squad Challenge</span>
        </div>
        <h2 className="text-base font-bold">
          30-Day Zero Excuses Consistency Sprint
        </h2>
        <p className="text-xs opacity-90 leading-relaxed">
          Complete at least 5 habits daily with 14 squad mates. Current team rank: #3 Global.
        </p>
        <div className="pt-2 flex items-center justify-between text-xs font-semibold">
          <span>Day 18 of 30</span>
          <span className="bg-white/20 px-2.5 py-0.5 rounded-full">94% Squad Rate</span>
        </div>
      </div>

      {/* Leaderboard & Feed */}
      <div className="p-5 rounded-2xl bg-white dark:bg-apple-gray-900 border border-apple-gray-200 dark:border-apple-gray-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-apple-gray-400">
            Squad Leaderboard
          </h3>
          <span className="text-xs text-apple-blue font-semibold">
            4 Active Members
          </span>
        </div>

        <div className="space-y-3">
          {members.map((member, idx) => {
            const hasCheered = cheeredIds.includes(member.id);
            return (
              <div 
                key={member.id}
                className="flex items-center justify-between p-3 rounded-xl bg-apple-gray-50 dark:bg-apple-gray-950 border border-apple-gray-200/60 dark:border-apple-gray-800/80"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-5 text-center font-black text-xs text-apple-gray-400">
                    {idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-apple-blue/15 text-apple-blue text-xs font-bold flex items-center justify-center">
                    {member.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-apple-gray-900 dark:text-white">
                      {member.name}
                    </h4>
                    <p className="text-[11px] text-apple-gray-500">
                      {member.habit}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-0.5 text-xs font-bold text-amber-600">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{member.streak}d</span>
                  </div>

                  <button
                    onClick={() => toggleCheer(member.id)}
                    className={`apple-press p-2 rounded-xl border transition-all ${
                      hasCheered
                        ? 'bg-apple-red/10 border-apple-red/30 text-apple-red'
                        : 'bg-white dark:bg-apple-gray-900 border-apple-gray-200 dark:border-apple-gray-800 text-apple-gray-400 hover:text-apple-red'
                    }`}
                    title="Cheer"
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasCheered ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

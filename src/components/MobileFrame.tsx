import React from 'react';
import { Wifi, BatteryMedium, Signal, Home, Wallet, Clock, MapPin } from 'lucide-react';
import { Language } from '../types';

interface MobileFrameProps {
  children: React.ReactNode;
  activeNavTab: 'home' | 'wallet' | 'tracker' | 'zone';
  onNavTabChange: (tab: 'home' | 'wallet' | 'tracker' | 'zone') => void;
  language: Language;
  walletBalance: number;
  hasActiveOrder: boolean;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeNavTab,
  onNavTabChange,
  language,
  walletBalance,
  hasActiveOrder
}) => {
  const isBn = language === 'bn';

  return (
    <div className="flex justify-center py-4 sm:py-8 px-2">
      {/* Outer Phone Hardware Bezel */}
      <div className="relative w-full max-w-[420px] h-[840px] bg-stone-900 rounded-[50px] p-3 shadow-2xl border-4 border-stone-700/80 ring-1 ring-stone-800 flex flex-col">
        {/* Dynamic Island / Top Speaker */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-stone-950 rounded-full z-40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-800 mr-2"></div>
          <div className="w-10 h-1.5 rounded-full bg-stone-800"></div>
        </div>

        {/* Screen Bezel / Container */}
        <div className="w-full h-full bg-stone-100 rounded-[40px] overflow-hidden flex flex-col relative">
          {/* Status Bar */}
          <div className="h-10 bg-stone-900 text-stone-300 text-[11px] font-bold px-7 flex items-center justify-between shrink-0 select-none z-30 pt-1">
            <span>09:41</span>
            <div className="flex items-center gap-2">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <BatteryMedium className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto relative scrollbar-none pb-16">
            {children}
          </div>

          {/* Flutter-style Bottom Navigation Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-stone-200/80 px-4 flex items-center justify-around z-30 shadow-lg">
            {/* Home */}
            <button
              onClick={() => onNavTabChange('home')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeNavTab === 'home' ? 'text-amber-600 font-extrabold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[10px]">{isBn ? 'হোম' : 'Home'}</span>
            </button>

            {/* Wallet (bKash/Nagad) */}
            <button
              onClick={() => onNavTabChange('wallet')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors relative ${
                activeNavTab === 'wallet' ? 'text-emerald-600 font-extrabold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Wallet className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[9px] px-1 rounded-full font-black">
                  ৳{walletBalance}
                </span>
              </div>
              <span className="text-[10px]">{isBn ? 'ওয়ালেট' : 'Wallet'}</span>
            </button>

            {/* Live 15-Min Tracker */}
            <button
              onClick={() => onNavTabChange('tracker')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors relative ${
                activeNavTab === 'tracker' ? 'text-amber-600 font-extrabold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <Clock className="w-5 h-5" />
                {hasActiveOrder && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                )}
              </div>
              <span className="text-[10px]">{isBn ? '১৫ মি. ট্র্যাকার' : '15m Tracker'}</span>
            </button>

            {/* Mirpur 11 & 12 Zone */}
            <button
              onClick={() => onNavTabChange('zone')}
              className={`flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                activeNavTab === 'zone' ? 'text-amber-600 font-extrabold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <MapPin className="w-5 h-5" />
              <span className="text-[10px]">{isBn ? '২ কিমি জোন' : '2km Zone'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

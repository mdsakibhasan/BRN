import React from 'react';
import { 
  Flame, 
  Wallet, 
  ShoppingBag, 
  Smartphone, 
  Monitor, 
  Code2, 
  MapPin, 
  Clock, 
  Plus,
  Apple,
  Camera,
  ShieldCheck
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onToggleLanguage: () => void;
  walletBalance: number;
  onOpenWallet: () => void;
  cartCount: number;
  onOpenCart: () => void;
  viewMode: 'mobile' | 'web';
  onToggleViewMode: (mode: 'mobile' | 'web') => void;
  onOpenFlutterCode: () => void;
  onOpenIPhoneInstall: () => void;
  onOpenImageUploader?: () => void;
  onOpenAdminPanel?: () => void;
  selectedZone: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  walletBalance,
  onOpenWallet,
  cartCount,
  onOpenCart,
  viewMode,
  onToggleViewMode,
  onOpenFlutterCode,
  onOpenIPhoneInstall,
  onOpenImageUploader,
  onOpenAdminPanel,
  selectedZone
}) => {
  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md text-white border-b border-stone-800 shadow-md">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 px-4 py-1.5 text-xs text-white flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>
            {isBn 
              ? '⚡ মিরপুর ১১ ও ১২ স্পেশাল: সর্বোচ্চ ২ কিমি সীমানায় ১৫ মিনিটে গরম ফুলকো রুটি ডেলিভারি!'
              : '⚡ Mirpur 11 & 12 Exclusive: 15-Minute Guaranteed Hot Fresh Ruti Delivery within 2km!'}
          </span>
        </div>
        
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1 bg-black/20 px-2 py-0.5 rounded text-[11px]">
            <Clock className="w-3 h-3 text-amber-200" />
            <span>{isBn ? '১৫ মিনিট গ্যারান্টি' : '15m Guarantee'}</span>
          </div>
          <button 
            id="header-lang-toggle"
            onClick={onToggleLanguage}
            className="hover:underline font-bold text-amber-100 cursor-pointer text-xs"
          >
            {isBn ? 'English' : 'বাংলা'}
          </button>
        </div>
      </div>

      {/* Main Header navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/20 text-white font-extrabold border border-amber-400/40">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                BRN <span className="text-amber-400 text-xs sm:text-sm font-semibold px-1.5 py-0.5 rounded bg-amber-950/60 border border-amber-600/40">Mirpur</span>
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-stone-400 font-medium">
              {isBn ? 'বাংলা রুটি নেটওয়ার্ক • ১৫ মিনিট ডেলিভারি' : 'Bangla Ruti Network • 15m Express'}
            </p>
          </div>
        </div>

        {/* Center Zone Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 bg-stone-800/80 px-3 py-1.5 rounded-full border border-stone-700 text-xs">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-stone-300">
            {isBn ? 'অপারেশন জোন:' : 'Serving Zone:'}
          </span>
          <span className="font-semibold text-amber-300">
            {selectedZone || (isBn ? 'মিরপুর ১১ ও ১২ (২ কিমি)' : 'Mirpur 11 & 12 (2km)')}
          </span>
        </div>

        {/* Actions & View Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Flutter App / Web View Mode Switcher */}
          <div className="hidden md:flex items-center bg-stone-800 rounded-xl p-1 border border-stone-700">
            <button
              id="view-mobile-mode-btn"
              onClick={() => onToggleViewMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Flutter Mobile App Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{isBn ? 'ফ্লাটার অ্যাপ ভিউ' : 'Flutter App'}</span>
            </button>
            <button
              id="view-web-mode-btn"
              onClick={() => onToggleViewMode('web')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'web'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-bold'
                  : 'text-stone-300 hover:text-white'
              }`}
              title="Full Web Storefront"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>{isBn ? 'ওয়েব স্টোর' : 'Web View'}</span>
            </button>
          </div>

          {/* Flutter Code Button */}
          <button
            id="open-flutter-code-btn"
            onClick={onOpenFlutterCode}
            className="flex items-center gap-1.5 bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-600/40 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            title="View & Export Complete Flutter Source Code"
          >
            <Code2 className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">{isBn ? 'Flutter কোড' : 'Flutter Code'}</span>
          </button>

          {/* PDF Brochure Images & Viewer Button */}
          {onOpenImageUploader && (
            <button
              id="open-pdf-images-btn"
              onClick={onOpenImageUploader}
              className="flex items-center gap-1.5 bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/50 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-amber-500/10 cursor-pointer"
              title="ব্রোশিওরের আসল ছবি ও বিবরণ দেখুন"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{isBn ? 'PDF ব্রোশিওর ছবি' : 'PDF Images'}</span>
            </button>
          )}

          {/* Admin Panel Button */}
          {onOpenAdminPanel && (
            <button
              id="open-admin-panel-btn"
              onClick={onOpenAdminPanel}
              className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer"
              title="এডমিন প্যানেল (ছবি আপলোড ও লাইভ অপারেশন)"
            >
              <ShieldCheck className="w-4 h-4 text-stone-950" />
              <span>{isBn ? 'এডমিন প্যানেল' : 'Admin'}</span>
            </button>
          )}

          {/* iPhone / iOS Install Button */}
          <button
            id="open-iphone-install-btn"
            onClick={onOpenIPhoneInstall}
            className="flex items-center gap-1.5 bg-gradient-to-r from-stone-800 to-stone-850 hover:from-stone-750 hover:to-stone-800 text-amber-300 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm hover:shadow-amber-500/10 cursor-pointer"
            title="Install and Run App on iPhone"
          >
            <Apple className="w-3.5 h-3.5 fill-current text-white" />
            <span className="flex items-center gap-1">
              <span>{isBn ? 'iPhone-এ ইনস্টল' : 'iPhone App'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping hidden sm:inline-block" />
            </span>
          </button>

          {/* Wallet Balance Button (Recharge via bKash / Nagad) */}
          <button
            id="header-wallet-btn"
            onClick={onOpenWallet}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-900/60 to-emerald-950 border border-emerald-500/40 hover:border-emerald-400 px-3 py-1.5 rounded-xl text-xs font-bold text-emerald-200 transition-all shadow-sm hover:shadow-emerald-900/30 cursor-pointer"
          >
            <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400">
              <Wallet className="w-3 h-3" />
            </div>
            <div className="flex flex-col text-left leading-none">
              <span className="text-[10px] text-emerald-400/80 font-normal">
                {isBn ? 'BRN ওয়ালেট' : 'BRN Wallet'}
              </span>
              <span className="text-sm font-extrabold text-emerald-300">
                ৳{walletBalance}
              </span>
            </div>
            <Plus className="w-3.5 h-3.5 text-emerald-400 ml-0.5" />
          </button>

          {/* Cart Icon & Count */}
          <button
            id="header-cart-btn"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 transition-colors shadow-md shadow-amber-500/20 cursor-pointer font-bold"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[20px] h-5 px-1 bg-red-600 text-white rounded-full text-xs font-black border-2 border-stone-900 animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

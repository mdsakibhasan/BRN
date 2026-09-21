import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  FileText, 
  Sparkles, 
  AlertCircle,
  Camera,
  Link2
} from 'lucide-react';
import { MenuItem } from '../types';
import { BRN_BRAND_INFO } from '../data/menu';

export interface CustomImagesMap {
  [key: string]: string; // key can be item.id or 'brand_machine', 'brand_rider', 'brand_hero', etc.
}

interface ImageUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  customImages: CustomImagesMap;
  onUpdateImage: (key: string, dataUrl: string) => void;
  onResetImage: (key: string) => void;
  onResetAll: () => void;
  targetKey?: string | null;
}

export const ImageUploaderModal: React.FC<ImageUploaderModalProps> = ({
  isOpen,
  onClose,
  menuItems,
  customImages,
  onUpdateImage,
  onResetImage,
  onResetAll,
  targetKey
}) => {
  const [activeKey, setActiveKey] = useState<string>(targetKey || 'bangla-ruti-4pack');
  const [urlInput, setUrlInput] = useState<string>('');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // List of all customizable visual assets from the PDF brochure
  const imageTargets = [
    {
      key: 'bangla-ruti-4pack',
      titleBn: '৪টি বাংলা রুটি (ব্রোশিওর স্পেশাল ৩৫৳)',
      subtitleBn: 'ব্রোশিওর কভার পেজের তাজা ফুলকো রুটির ছবি',
      defaultImg: '/images/pdf_bangla_ruti.png'
    },
    {
      key: 'roti-booter-dal-combo',
      titleBn: 'গরম রুটি + বুটের ডাল কম্বো',
      subtitleBn: 'ঝামেলাহীন সন্ধ্যা-সকাল কম্বোর ছবি',
      defaultImg: '/images/pdf_roti_dal_combo.png'
    },
    {
      key: 'brand_machine',
      titleBn: 'স্বয়ংক্রিয় রুটি তৈরির মেশিন (কারখানা)',
      subtitleBn: 'অটোমেটিক মেশিন ও হাইজিনিক উৎপাদনের ছবি',
      defaultImg: BRN_BRAND_INFO.images.machine
    },
    {
      key: 'brand_rider',
      titleBn: 'নিজস্ব ডেলিভারি রাইডার ও থার্মাল ব্যাগ',
      subtitleBn: '১৫ মিনিটে গরম ডেলিভারির রাইডার ছবি',
      defaultImg: BRN_BRAND_INFO.images.rider
    },
    {
      key: 'diafit-roti',
      titleBn: 'DiaFit Roti (ডায়াফিট রুটি)',
      subtitleBn: 'Low GI ও হাই ফাইবার সিডস রুটি',
      defaultImg: '/images/pdf_diafit_roti.png'
    },
    {
      key: 'youngfuel-roti',
      titleBn: 'YoungFuel Roti (ইয়াংফুয়েল রুটি)',
      subtitleBn: 'হাই প্রোটিন ও এনার্জি বুস্টার রুটি',
      defaultImg: '/images/pdf_youngfuel_roti.png'
    },
    {
      key: 'rice-flour-roti',
      titleBn: 'চালের আটার রুটি (Gluten Free)',
      subtitleBn: 'সাদা নরম সহজপাচ্য ঐতিহ্যবাহী রুটি',
      defaultImg: '/images/pdf_rice_flour_roti.png'
    },
    {
      key: 'spice-kalai-roti',
      titleBn: 'চাঁপাইনবাবগঞ্জের কলাই রুটি',
      subtitleBn: '২৫% প্রাকৃতিক প্রোটিন সমৃদ্ধ ঐতিহ্যবাহী কলাই রুটি',
      defaultImg: '/images/pdf_kalai_roti.png'
    },
    {
      key: 'shahi-paratha',
      titleBn: 'সাদ্দাক সিগনেচার পরোটা',
      subtitleBn: 'গাওয়া ঘি ও উন্নত তেলের লেয়ার পরোটা',
      defaultImg: '/images/pdf_saddak_paratha.png'
    },
    {
      key: 'deshi-booter-dal',
      titleBn: 'ঘরোয়া স্পেশাল বুটের ডাল বাগার',
      subtitleBn: 'জিরা ও শুকনা মরিচের বাগার দেওয়া ঘন ডাল',
      defaultImg: '/images/pdf_roti_dal_combo.png'
    }
  ];

  const currentTarget = imageTargets.find(t => t.key === activeKey) || imageTargets[0];
  const activeCurrentImg = customImages[activeKey] || currentTarget.defaultImg;
  const isCustom = Boolean(customImages[activeKey]);

  // Process file upload and resize nicely for localStorage
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) return;

      // Compress with canvas to keep size light (< 150kb)
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxW = 800;
        const scale = Math.min(1, maxW / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          onUpdateImage(activeKey, compressedDataUrl);
          setFeedbackMsg('✅ PDF ব্রোশিওরের ছবি সফলভাবে যুক্ত হয়েছে!');
          setTimeout(() => setFeedbackMsg(null), 3500);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onUpdateImage(activeKey, urlInput.trim());
    setUrlInput('');
    setFeedbackMsg('✅ ছবির লিংক সফলভাবে আপডেট করা হয়েছে!');
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-stone-900 border border-amber-500/40 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up text-stone-100 my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600/20 via-stone-850 to-stone-900 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>PDF ব্রোশিওরের আসল ছবি ম্যানেজার</span>
              </h3>
              <p className="text-xs text-stone-400">
                PDF থেকে ছবি বা স্ক্রিনশট সরাসরি আপলোড করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Helpful PDF instructions */}
          <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-3.5 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300 block mb-0.5">
                আপনার ব্রোশিওর (PDF) এর আসল ছবি বসানোর সহজ উপায়:
              </span>
              আপনার PDF টি ওপেন করে যে ছবিটি অ্যাপে দিতে চান (যেমন: রুটি, মেশিন বা রাইডার), সেটির স্ক্রিনশট নিন অথবা ফাইলটি সিলেক্ট করে নিচে আপলোড করুন। মুহূর্তেই অ্যাপে আসল ছবি বসে যাবে!
            </div>
          </div>

          {/* Feedback banner */}
          {feedbackMsg && (
            <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-bold p-3 rounded-xl flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {/* Target Item Selector */}
          <div>
            <label className="text-xs font-bold text-stone-300 block mb-1.5">
              কোন আইটেমের ছবি পরিবর্তন করবেন?
            </label>
            <select
              value={activeKey}
              onChange={(e) => setActiveKey(e.target.value)}
              className="w-full bg-stone-800 border border-stone-750 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              {imageTargets.map((target) => (
                <option key={target.key} value={target.key}>
                  {target.titleBn} {customImages[target.key] ? '⭐ (কাস্টম ছবি সক্রিয়)' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Current Active Preview */}
          <div className="bg-stone-850 border border-stone-750 rounded-2xl p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {currentTarget.titleBn}
                </h4>
                <p className="text-[11px] text-stone-400">
                  {currentTarget.subtitleBn}
                </p>
              </div>
              {isCustom ? (
                <span className="text-[10px] bg-emerald-900/60 border border-emerald-500/50 text-emerald-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  কাস্টম PDF ছবি সক্রিয়
                </span>
              ) : (
                <span className="text-[10px] bg-stone-750 text-stone-400 px-2 py-0.5 rounded-full">
                  ডিফল্ট প্রিভিউ
                </span>
              )}
            </div>

            {/* Photo preview container */}
            <div className="relative h-44 w-full rounded-xl overflow-hidden bg-black/60 border border-stone-700">
              <img 
                src={activeCurrentImg} 
                alt={currentTarget.titleBn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] text-stone-300">
                প্রিভিউ
              </div>
            </div>

            {/* Action buttons for uploading file */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>PDF থেকে ছবি আপলোড করুন</span>
              </button>

              {isCustom ? (
                <button
                  type="button"
                  onClick={() => {
                    onResetImage(activeKey);
                    setFeedbackMsg('🔄 ডিফল্ট ছবিতে রিস্টোর করা হয়েছে');
                    setTimeout(() => setFeedbackMsg(null), 3000);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold text-xs border border-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>ডিফল্ট ছবিতে ফিরুন</span>
                </button>
              ) : (
                <div className="flex items-center justify-center text-[11px] text-stone-400 text-center py-1">
                  গ্যালারি বা ফাইল থেকে ছবি বেছে নিন
                </div>
              )}
            </div>

            {/* URL option */}
            <form onSubmit={handleUrlSubmit} className="pt-2 border-t border-stone-800 flex gap-2">
              <div className="relative flex-1">
                <Link2 className="w-3.5 h-3.5 text-stone-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="অথবা সরাসরি ছবির URL পেস্ট করুন..."
                  className="w-full bg-stone-900 border border-stone-750 rounded-lg pl-8 pr-2 py-1.5 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                disabled={!urlInput.trim()}
                className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 disabled:opacity-40 text-stone-200 font-bold text-xs border border-stone-700 transition-all cursor-pointer"
              >
                সেভ
              </button>
            </form>
          </div>

          {/* Quick list of other items */}
          <div className="space-y-2 pt-1">
            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              অন্যান্য আইটেমসমূহ
            </h5>
            <div className="grid grid-cols-2 gap-2 max-h-36 overflow-y-auto pr-1">
              {imageTargets.map((t) => {
                const isSelected = t.key === activeKey;
                const hasCustom = Boolean(customImages[t.key]);
                const thumb = customImages[t.key] || t.defaultImg;

                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveKey(t.key)}
                    className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-amber-950/40 border-amber-500/70 text-amber-200' 
                        : 'bg-stone-850/60 border-stone-750/70 hover:border-stone-600 text-stone-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-stone-900 border border-stone-700 relative">
                      <img src={thumb} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                      {hasCustom && (
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-1 ring-stone-900" />
                      )}
                    </div>
                    <span className="text-[11px] font-bold truncate">
                      {t.titleBn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-stone-950 p-4 border-t border-stone-800 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetAll}
            className="text-xs text-stone-500 hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>সকল ছবি রিসেট করুন</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition-all cursor-pointer"
          >
            সম্পন্ন
          </button>
        </div>
      </div>
    </div>
  );
};

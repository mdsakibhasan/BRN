import React, { useState, useEffect, useRef } from 'react';
import { X, Save, RotateCcw, Sparkles, Image as ImageIcon, Camera, Trash2, Eye, EyeOff } from 'lucide-react';
import { HeroBannerConfig } from '../types';

interface EditHeroBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  bannerConfig: HeroBannerConfig;
  onSave: (config: HeroBannerConfig) => void | Promise<void>;
  onDeleteSection?: () => void | Promise<void>;
  onResetDefault?: () => void | Promise<void>;
}

export const EditHeroBannerModal: React.FC<EditHeroBannerModalProps> = ({
  isOpen,
  onClose,
  bannerConfig,
  onSave,
  onDeleteSection,
  onResetDefault
}) => {
  const [pillTextBn, setPillTextBn] = useState('');
  const [ctaButtonTextBn, setCtaButtonTextBn] = useState('বিস্তারিত দেখুন');
  const [headingLine1Bn, setHeadingLine1Bn] = useState('');
  const [headingLine2HighlightBn, setHeadingLine2HighlightBn] = useState('');
  const [headingLine2SuffixBn, setHeadingLine2SuffixBn] = useState('');
  const [mottoBn, setMottoBn] = useState('');
  const [footerFeatureBn, setFooterFeatureBn] = useState('');
  const [footerDistanceBn, setFooterDistanceBn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (bannerConfig) {
      setPillTextBn(bannerConfig.pillTextBn || 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস');
      setCtaButtonTextBn(bannerConfig.ctaButtonTextBn || 'বিস্তারিত দেখুন');
      setHeadingLine1Bn(bannerConfig.headingLine1Bn || 'তাওয়া থেকে তাজা গরম রুটি');
      setHeadingLine2HighlightBn(bannerConfig.headingLine2HighlightBn || '১৫ মিনিটে');
      setHeadingLine2SuffixBn(bannerConfig.headingLine2SuffixBn || 'আপনার দরজায়!');
      setMottoBn(bannerConfig.mottoBn || '“স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি” — সকাল-সন্ধ্যার ঝামেলাহীন স্বস্তিতে স্বাগতম।');
      setFooterFeatureBn(bannerConfig.footerFeatureBn || 'স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক');
      setFooterDistanceBn(bannerConfig.footerDistanceBn || 'সর্বোচ্চ ২ কিমি');
      setImageUrl(bannerConfig.imageUrl || '/images/pdf_bangla_ruti.png');
      setIsVisible(bannerConfig.isVisible !== false);
    }
  }, [bannerConfig, isOpen]);

  if (!isOpen) return null;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        return;
      }
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDim = 900;
          let w = img.width;
          let h = img.height;
          if (w > h) {
            if (w > maxDim) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            }
          } else {
            if (h > maxDim) {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, w, h);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
            setImageUrl(dataUrl);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsProcessing(false);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const updated: HeroBannerConfig = {
      pillTextBn: pillTextBn.trim() || 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস',
      ctaButtonTextBn: ctaButtonTextBn.trim() || 'বিস্তারিত দেখুন',
      headingLine1Bn: headingLine1Bn.trim() || 'তাওয়া থেকে তাজা গরম রুটি',
      headingLine2HighlightBn: headingLine2HighlightBn.trim() || '১৫ মিনিটে',
      headingLine2SuffixBn: headingLine2SuffixBn.trim() || 'আপনার দরজায়!',
      mottoBn: mottoBn.trim() || '“স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি” — সকাল-সন্ধ্যার ঝামেলাহীন স্বস্তিতে স্বাগতম।',
      footerFeatureBn: footerFeatureBn.trim() || 'স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক',
      footerDistanceBn: footerDistanceBn.trim() || 'সর্বোচ্চ ২ কিমি',
      imageUrl: imageUrl.trim() || '/images/pdf_bangla_ruti.png',
      isVisible: isVisible
    };
    await onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImageFile(file);
        }}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-stone-900 border border-stone-750 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl animate-scale-up text-stone-100 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-stone-950 p-4 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">
                হেডারের নিচের সেকশন (Hero Banner) এডিট
              </h3>
              <p className="text-[11px] text-stone-400">
                হেডারের ঠিক নিচের মূল ব্যানারটি নিজের মতো লিখুন ও নিয়ন্ত্রণ করুন
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Live Preview */}
          <div className="space-y-1">
            <span className="text-stone-400 font-bold block text-[11px]">লাইভ প্রিভিউ:</span>
            <div className="bg-gradient-to-br from-amber-600/90 via-orange-600/90 to-stone-900 rounded-2xl text-white relative overflow-hidden border border-amber-500/30 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-black uppercase tracking-wider bg-stone-950/70 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
                  {pillTextBn || 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস'}
                </span>
                <span className="text-[9px] font-bold bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                  <span>{ctaButtonTextBn || 'বিস্তারিত দেখুন'}</span>
                  <span>&gt;</span>
                </span>
              </div>
              <h4 className="text-sm font-black leading-tight text-white">
                {headingLine1Bn} <br />
                <span className="text-amber-300">{headingLine2HighlightBn}</span> {headingLine2SuffixBn}
              </h4>
              <p className="text-[10px] text-stone-200 mt-1 line-clamp-2">
                {mottoBn}
              </p>
              <div className="mt-2 pt-1.5 border-t border-white/20 flex items-center justify-between text-[10px] text-stone-200">
                <span>{footerFeatureBn}</span>
                <span className="font-bold text-amber-300">{footerDistanceBn}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-stone-300 font-bold block mb-1">
                বাটন টেক্সট (আমাদের ব্রোশিওরের জায়গায় নতুন লেখা):
              </label>
              <input
                type="text"
                value={ctaButtonTextBn}
                onChange={(e) => setCtaButtonTextBn(e.target.value)}
                placeholder="যেমন: বিস্তারিত দেখুন"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">
                শীর্ষ ট্যাগ / পিল টেক্সট (লোকেশন ও সময়):
              </label>
              <input
                type="text"
                value={pillTextBn}
                onChange={(e) => setPillTextBn(e.target.value)}
                placeholder="যেমন: মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-stone-300 font-bold block mb-1">
                  মূল শিরোনাম (১ম লাইন):
                </label>
                <input
                  type="text"
                  value={headingLine1Bn}
                  onChange={(e) => setHeadingLine1Bn(e.target.value)}
                  placeholder="যেমন: তাওয়া থেকে তাজা গরম রুটি"
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">
                  শিরোনাম হাইলাইট শব্দ (হলুদ রঙ):
                </label>
                <input
                  type="text"
                  value={headingLine2HighlightBn}
                  onChange={(e) => setHeadingLine2HighlightBn(e.target.value)}
                  placeholder="যেমন: ১৫ মিনিটে"
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-amber-300 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">
                শিরোনাম ২য় লাইনের বাকি অংশ:
              </label>
              <input
                type="text"
                value={headingLine2SuffixBn}
                onChange={(e) => setHeadingLine2SuffixBn(e.target.value)}
                placeholder="যেমন: আপনার দরজায়!"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">
                স্লোগান / মটো ডেসক্রিপশন:
              </label>
              <textarea
                rows={2}
                value={mottoBn}
                onChange={(e) => setMottoBn(e.target.value)}
                placeholder="যেমন: “স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি”..."
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-stone-300 font-bold block mb-1">
                  নিচের বৈশিষ্ট্য টেক্সট:
                </label>
                <input
                  type="text"
                  value={footerFeatureBn}
                  onChange={(e) => setFooterFeatureBn(e.target.value)}
                  placeholder="যেমন: স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক"
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-stone-300 font-bold block mb-1">
                  ডেলিভারি এরিয়া নোট:
                </label>
                <input
                  type="text"
                  value={footerDistanceBn}
                  onChange={(e) => setFooterDistanceBn(e.target.value)}
                  placeholder="যেমন: সর্বোচ্চ ২ কিমি"
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-amber-400 font-bold focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Background Image Upload */}
            <div>
              <label className="text-stone-300 font-bold block mb-1">
                ব্যাকগ্রাউন্ড ব্যানার ছবি:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="ছবির লিংক দিন অথবা আপলোড করুন"
                  className="flex-1 bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isProcessing}
                  className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 font-bold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{isProcessing ? 'আপলোড হচ্ছে...' : 'ছবি আপলোড'}</span>
                </button>
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block">সেকশন দৃশ্যমানতা</span>
                <span className="text-[11px] text-stone-400">হোম স্ক্রিনে এই ব্যানারটি দেখাবেন কিনা</span>
              </div>
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isVisible ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {isVisible ? (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>সক্রিয় (প্রদর্শিত)</span>
                  </>
                ) : (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>লুকানো (হাইড)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-stone-950 p-3.5 border-t border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            {onDeleteSection && (
              <button
                type="button"
                onClick={async () => {
                  if (confirm('আপনি কি নিশ্চিত যে হেডারের নিচের ব্যানার সেকশনটি মুছে ফেলতে (হাইড করতে) চান?')) {
                    await onDeleteSection();
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold flex items-center gap-1 cursor-pointer text-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>সেকশন মুছুন</span>
              </button>
            )}

            {onResetDefault && (
              <button
                type="button"
                onClick={async () => {
                  if (confirm('ব্যানারের সব তথ্য মূল ডিফল্টে ফিরিয়ে নিতে চান?')) {
                    await onResetDefault();
                    onClose();
                  }
                }}
                className="px-2.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-400 font-bold flex items-center gap-1 cursor-pointer text-xs"
                title="ডিফল্ট রিসেট"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-300 font-bold text-xs cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>সংরক্ষণ করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

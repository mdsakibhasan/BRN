import React, { useState, useEffect, useRef } from 'react';
import { X, Save, Image as ImageIcon, Camera, RotateCcw, Sparkles, Tag, Plus, Check } from 'lucide-react';
import { QuickOfferItem, MenuItem } from '../types';

interface EditOfferModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerToEdit: QuickOfferItem | null;
  onSave: (offer: QuickOfferItem) => void | Promise<void>;
  menuItems: MenuItem[];
}

export const EditOfferModal: React.FC<EditOfferModalProps> = ({
  isOpen,
  onClose,
  offerToEdit,
  onSave,
  menuItems
}) => {
  const [titleBn, setTitleBn] = useState('');
  const [badgeBn, setBadgeBn] = useState('অফার');
  const [badgeColor, setBadgeColor] = useState<'amber' | 'emerald' | 'orange' | 'rose' | 'sky'>('amber');
  const [price, setPrice] = useState<number>(35);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(undefined);
  const [actionTextBn, setActionTextBn] = useState('+ ১-ট্যাপে যোগ');
  const [targetItemId, setTargetItemId] = useState<string>('ruti-regular');
  const [imageUrl, setImageUrl] = useState<string>('/images/pdf_bangla_ruti.png');
  const [subtitleBn, setSubtitleBn] = useState('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (offerToEdit) {
      setTitleBn(offerToEdit.titleBn || '');
      setBadgeBn(offerToEdit.badgeBn || 'অফার');
      setBadgeColor(offerToEdit.badgeColor || 'amber');
      setPrice(offerToEdit.price || 0);
      setOriginalPrice(offerToEdit.originalPrice);
      setActionTextBn(offerToEdit.actionTextBn || '+ ১-ট্যাপে যোগ');
      setTargetItemId(offerToEdit.targetItemId || (menuItems[0]?.id || ''));
      setImageUrl(offerToEdit.imageUrl || '/images/pdf_bangla_ruti.png');
      setSubtitleBn(offerToEdit.subtitleBn || '');
      setIsActive(offerToEdit.isActive !== false);
    } else {
      // New default offer
      setTitleBn('স্পেশাল রুটি অফার');
      setBadgeBn('হট অফার 🔥');
      setBadgeColor('amber');
      setPrice(35);
      setOriginalPrice(45);
      setActionTextBn('+ ১-ট্যাপে যোগ');
      setTargetItemId(menuItems[0]?.id || 'ruti-regular');
      setImageUrl('/images/pdf_bangla_ruti.png');
      setSubtitleBn('তাজা ফুলকো গরম রুটি');
      setIsActive(true);
    }
  }, [offerToEdit, isOpen, menuItems]);

  if (!isOpen) return null;

  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxDim = 800;
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
          ctx.drawImage(img, 0, 0, w, h);
          setImageUrl(canvas.toDataURL('image/jpeg', 0.85));
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleBn.trim()) {
      alert('অনুগ্রহ করে অফারের শিরোনাম লিখুন');
      return;
    }

    setIsSaving(true);
    const offerItem: QuickOfferItem = {
      id: offerToEdit?.id || `offer-${Date.now()}`,
      titleBn: titleBn.trim(),
      badgeBn: badgeBn.trim() || 'অফার',
      badgeColor,
      price: Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      actionTextBn: actionTextBn.trim() || '+ ১-ট্যাপে যোগ',
      targetItemId,
      imageUrl: imageUrl.trim() || '/images/pdf_bangla_ruti.png',
      subtitleBn: subtitleBn.trim(),
      isActive
    };

    await onSave(offerItem);
    setIsSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-stone-900 border border-stone-750 rounded-3xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-stone-850">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {offerToEdit ? 'অফার সম্পাদনা করুন' : '+ নতুন কুইক অফার যোগ করুন'}
              </h3>
              <p className="text-[11px] text-stone-400">
                হোম স্ক্রিনের কুইক অফার ব্যানারে এই অফারটি প্রদর্শিত হবে
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 text-xs">
          {/* Live Preview Card */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-stone-400">কার্ড লাইভ প্রিভিউ (হোম পেজে যেভাবে দেখাবে):</label>
            <div className="bg-stone-850 border border-amber-500/30 rounded-2xl p-2.5 flex items-center gap-2.5 shadow-sm">
              <div className="w-13 h-13 rounded-xl overflow-hidden shrink-0 border border-stone-700 bg-black/50">
                <img 
                  src={imageUrl} 
                  alt={titleBn || 'Offer'} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/pdf_bangla_ruti.png';
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded inline-block ${
                    badgeColor === 'emerald' ? 'bg-emerald-500 text-stone-950' :
                    badgeColor === 'orange' ? 'bg-orange-500 text-white' :
                    badgeColor === 'rose' ? 'bg-rose-500 text-white' :
                    badgeColor === 'sky' ? 'bg-sky-500 text-stone-950' :
                    'bg-amber-500 text-stone-950'
                  }`}>
                    {badgeBn || 'অফার'}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="text-[10px] text-stone-400 line-through">
                      {originalPrice}৳
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-white truncate mt-0.5">
                  {titleBn || 'অফারের শিরোনাম'}
                </h4>
                {subtitleBn && (
                  <p className="text-[10px] text-stone-400 truncate">{subtitleBn}</p>
                )}
                <span className="text-[10px] text-amber-400 font-bold block mt-0.5">
                  {actionTextBn}
                </span>
              </div>
            </div>
          </div>

          {/* Offer Title & Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="text-stone-300 font-bold block mb-1">
                অফারের শিরোনাম (বাংলা) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: ৪টি রুটি ৩৫৳"
                required
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">
                ছোট সাবটাইটেল বা বিবরণ (ঐচ্ছিক)
              </label>
              <input
                type="text"
                value={subtitleBn}
                onChange={(e) => setSubtitleBn(e.target.value)}
                placeholder="যেমন: তাজা ফুলকো মেশিনমেড রুটি"
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Badge Text and Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-stone-300 font-bold block mb-1">ব্যাজ টেক্সট</label>
              <input
                type="text"
                value={badgeBn}
                onChange={(e) => setBadgeBn(e.target.value)}
                placeholder="যেমন: অফার, কম্বো, হট ডিল"
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">ব্যাজ কালার</label>
              <div className="flex items-center gap-1.5 pt-1">
                {(['amber', 'emerald', 'orange', 'rose', 'sky'] as const).map((col) => (
                  <button
                    key={col}
                    type="button"
                    onClick={() => setBadgeColor(col)}
                    className={`h-7 px-2.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                      badgeColor === col 
                        ? 'ring-2 ring-white scale-105 shadow-sm' 
                        : 'opacity-70 hover:opacity-100'
                    } ${
                      col === 'amber' ? 'bg-amber-500 text-stone-950' :
                      col === 'emerald' ? 'bg-emerald-600 text-white' :
                      col === 'orange' ? 'bg-orange-500 text-white' :
                      col === 'rose' ? 'bg-rose-600 text-white' :
                      'bg-sky-500 text-stone-950'
                    }`}
                  >
                    {badgeColor === col && <Check className="w-2.5 h-2.5" />}
                    <span>{col}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & 1-Tap Target Item */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-stone-300 font-bold block mb-1">
                অফার মূল্য (টাকা ৳) <span className="text-amber-400">*</span>
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                min={0}
                required
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">আগের বা নিয়মিত মূল্য (ঐচ্ছিক কাটা দাগের জন্য)</label>
              <input
                type="number"
                value={originalPrice || ''}
                onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                placeholder="যেমন: ৪৫"
                min={0}
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Action Button Text & Linked Menu Item */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-stone-300 font-bold block mb-1">অ্যাকশন টেক্সট</label>
              <input
                type="text"
                value={actionTextBn}
                onChange={(e) => setActionTextBn(e.target.value)}
                placeholder="+ ১-ট্যাপে যোগ"
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-stone-300 font-bold block mb-1">১-ট্যাপে কার্টে যুক্ত হওয়ার খাবার আইটেম</label>
              <select
                value={targetItemId}
                onChange={(e) => setTargetItemId(e.target.value)}
                className="w-full bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              >
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nameBn} ({item.price}৳)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Offer Image Selection */}
          <div className="space-y-2">
            <label className="text-stone-300 font-bold block">
              অফারের ছবি (ইমেজ ইউআরএল বা সরাসরি আপলোড)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/images/pdf_bangla_ruti.png বা ছবির লিংক"
                className="flex-1 bg-stone-850 border border-stone-750 rounded-xl px-3 py-2 text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 font-mono text-[11px]"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>আপলোড</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageFile(f);
                }}
              />
            </div>

            {/* Quick brochure image presets */}
            <div className="pt-1">
              <span className="text-[10px] text-stone-400 block mb-1">দ্রুত ব্রোশিওর ছবি নির্বাচন:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { name: 'রুটি ৪-প্যাক', url: '/images/pdf_bangla_ruti.png' },
                  { name: 'রুটি+ডাল কম্বো', url: '/images/pdf_roti_dal_combo.png' },
                  { name: 'পরোটা', url: '/images/pdf_saddak_paratha.png' },
                  { name: 'আলুর দম', url: '/images/pdf_alur_dom.png' },
                  { name: 'শাহী চা', url: '/images/pdf_shahi_cha.png' },
                ].map((preset) => (
                  <button
                    key={preset.url}
                    type="button"
                    onClick={() => setImageUrl(preset.url)}
                    className="px-2 py-1 rounded-lg bg-stone-800 hover:bg-amber-500/20 text-stone-300 hover:text-amber-300 border border-stone-700 text-[10px] whitespace-nowrap cursor-pointer"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active / Inactive Switch */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-stone-850 border border-stone-750">
            <div>
              <span className="text-xs font-bold text-white block">অফারটি হোম স্ক্রিনে সক্রিয় রাখুন</span>
              <span className="text-[10px] text-stone-400">বন্ধ রাখলে গ্রাহকরা দেখতে পাবেন না</span>
            </div>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Form Actions */}
          <div className="pt-3 border-t border-stone-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs cursor-pointer"
            >
              বাতিল
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5 text-stone-950" />
              <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  Sparkles, 
  Image as ImageIcon, 
  Clock, 
  DollarSign, 
  Tag, 
  Flame, 
  AlertCircle,
  Camera,
  RotateCcw
} from 'lucide-react';
import { MenuItem } from '../types';

interface EditMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemToEdit: MenuItem | null;
  onSave: (item: MenuItem) => void | Promise<void>;
  currentImage?: string;
}

const CATEGORY_OPTIONS = [
  { id: 'ruti', nameBn: 'ফুলকো রুটি 🫓', nameEn: 'Ruti' },
  { id: 'paratha', nameBn: 'শাহী পরোটা 🥐', nameEn: 'Paratha' },
  { id: 'curry', nameBn: 'ডাল ও ভাজি 🍲', nameEn: 'Curry / Dal' },
  { id: 'combos', nameBn: 'কম্বো মিল 📦', nameEn: 'Combos' },
  { id: 'drinks', nameBn: 'চা ও পানীয় ☕', nameEn: 'Drinks' },
] as const;

const QUICK_UNITS = [
  'প্রতি পিস',
  '৪ পিস প্যাক',
  '১ বাটি',
  '১ কম্বো প্যাক',
  '১ কাপ',
  '১ প্লেট'
];

const PRESET_IMAGES = [
  { name: 'বাংলা রুটি', url: '/images/pdf_bangla_ruti.png' },
  { name: 'বুটের ডাল কম্বো', url: '/images/pdf_roti_dal_combo.png' },
  { name: 'ডায়াফিট রুটি', url: '/images/pdf_diafit_roti.png' },
  { name: 'ইয়াংফুয়েল রুটি', url: '/images/pdf_youngfuel_roti.png' },
  { name: 'চালের রুটি', url: '/images/pdf_rice_flour_roti.png' },
  { name: 'কলাই রুটি', url: '/images/pdf_spice_kalai_roti.png' },
];

export const EditMenuItemModal: React.FC<EditMenuItemModalProps> = ({
  isOpen,
  onClose,
  itemToEdit,
  onSave,
  currentImage
}) => {
  const isEditing = Boolean(itemToEdit);

  // Form State
  const [nameBn, setNameBn] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [category, setCategory] = useState<'ruti' | 'paratha' | 'curry' | 'combos' | 'drinks'>('ruti');
  const [price, setPrice] = useState<number | ''>(20);
  const [unitBn, setUnitBn] = useState('প্রতি পিস');
  const [taglineBn, setTaglineBn] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [image, setImage] = useState('');
  const [prepTimeMinutes, setPrepTimeMinutes] = useState(5);
  const [badge, setBadge] = useState('');
  const [popular, setPopular] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [calories, setCalories] = useState('');
  const [ingredientsText, setIngredientsText] = useState('');

  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Populate or reset form whenever modal opens or itemToEdit changes
  useEffect(() => {
    if (!isOpen) return;

    if (itemToEdit) {
      setNameBn(itemToEdit.nameBn || '');
      setNameEn(itemToEdit.nameEn || '');
      setCategory(itemToEdit.category || 'ruti');
      setPrice(itemToEdit.price || 0);
      setUnitBn(itemToEdit.unitBn || 'প্রতি পিস');
      setTaglineBn(itemToEdit.taglineBn || '');
      setDescriptionBn(itemToEdit.descriptionBn || '');
      setImage(currentImage || itemToEdit.image || '');
      setPrepTimeMinutes(itemToEdit.prepTimeMinutes || 5);
      setBadge(itemToEdit.badge || '');
      setPopular(Boolean(itemToEdit.popular));
      setIsVegetarian(itemToEdit.isVegetarian !== false);
      setCalories(itemToEdit.calories || '');
      setIngredientsText(itemToEdit.ingredientsBn ? itemToEdit.ingredientsBn.join(', ') : '');
    } else {
      // Defaults for brand new item
      setNameBn('');
      setNameEn('');
      setCategory('ruti');
      setPrice(25);
      setUnitBn('প্রতি পিস');
      setTaglineBn('তাওয়া থেকে গরম গরম • ১৫ মিনিটে মিরপুরে ডেলিভারি');
      setDescriptionBn('স্বাস্থ্যসম্মত উপায়ে আধুনিক মেশিনে প্রস্তুত তাজা গরম রুটি।');
      setImage('/images/pdf_bangla_ruti.png');
      setPrepTimeMinutes(5);
      setBadge('নতুন 🔥');
      setPopular(false);
      setIsVegetarian(true);
      setCalories('২৮০ ক্যালরি');
      setIngredientsText('গমের আটা, লবণ, পানি');
    }
    setValidationError(null);
    setIsSaving(false);
  }, [isOpen, itemToEdit, currentImage]);

  if (!isOpen) return null;

  // Compress and handle image file upload via Canvas
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setValidationError('অনুগ্রহ করে শুধুমাত্র ইমেজ ফাইল নির্বাচন করুন (JPEG, PNG, WEBP)');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        setIsUploading(false);
        return;
      }

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDimension = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.86);
            setImage(compressedDataUrl);
          }
        } catch (err) {
          console.error(err);
          setValidationError('ইমেজ প্রসেসিংয়ে সমস্যা হয়েছে');
        } finally {
          setIsUploading(false);
        }
      };
      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameBn.trim()) {
      setValidationError('খাবারের বাংলা নাম দেওয়া আবশ্যক!');
      return;
    }

    const numPrice = Number(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setValidationError('সঠিক মূল্য (টাকা) প্রদান করুন!');
      return;
    }

    setIsSaving(true);
    setValidationError(null);

    // Generate or preserve ID
    const itemId = itemToEdit?.id || `item_${Date.now()}_${nameEn ? nameEn.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'food'}`;
    const generatedEnName = nameEn.trim() || nameBn.trim();

    const ingredientsList = ingredientsText
      ? ingredientsText.split(',').map(s => s.trim()).filter(Boolean)
      : undefined;

    const updatedItem: MenuItem = {
      id: itemId,
      nameBn: nameBn.trim(),
      nameEn: generatedEnName,
      descriptionBn: descriptionBn.trim() || 'তাওয়া থেকে তাজা গরম খাবার, ১৫ মিনিটে ডেলিভারি।',
      descriptionEn: itemToEdit?.descriptionEn || `${generatedEnName} fresh & hot delivered in 15 mins.`,
      taglineBn: taglineBn.trim() || undefined,
      price: numPrice,
      unitBn: unitBn.trim() || 'প্রতি পিস',
      unitEn: itemToEdit?.unitEn || 'per piece',
      category: category,
      prepTimeMinutes: prepTimeMinutes || 5,
      image: image || '/images/pdf_bangla_ruti.png',
      popular: popular,
      isVegetarian: isVegetarian,
      badge: badge.trim() || undefined,
      calories: calories.trim() || undefined,
      ingredientsBn: ingredientsList,
      featuresBn: itemToEdit?.featuresBn || ['100% Fresh', 'Machine Made', 'Hygienic'],
      nutritionFacts: itemToEdit?.nutritionFacts || (calories ? { energy: calories } : undefined),
      isCustom: itemToEdit?.isCustom || !itemToEdit,
      isEdited: Boolean(itemToEdit)
    };

    try {
      await onSave(updatedItem);
      onClose();
    } catch (err) {
      console.error(err);
      setValidationError('আইটেম সংরক্ষণ করার সময় সমস্যা হয়েছে');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fade-in">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleImageFileChange}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-stone-900 border border-amber-500/50 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scale-up text-stone-100 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/60 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-extrabold shadow-md">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {isEditing ? 'খাবার আইটেম এডিট করুন' : 'নতুন খাবার আইটেম যোগ করুন'}
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 font-bold">
                  {isEditing ? 'আপডেট মোড' : 'নতুন সংযোজন'}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isEditing ? `"${itemToEdit?.nameBn}" আইটেমের মূল্য, ছবি ও তথ্য সম্পাদনা করুন` : 'মেনুতে গ্রাহকদের জন্য নতুন খাবার আইটেম যুক্ত করুন'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {validationError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Row 1: Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                খাবারের নাম (বাংলা) <span className="text-amber-400">*</span>
              </label>
              <input
                type="text"
                value={nameBn}
                onChange={(e) => setNameBn(e.target.value)}
                placeholder="যেমন: শাহী বাটার নান"
                required
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                খাবারের নাম (English)
              </label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Shahi Butter Naan"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Row 2: Category & Price & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                ক্যাটাগরি <span className="text-amber-400">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-stone-900 text-white">
                    {cat.nameBn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                মূল্য (টাকায় ৳) <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="25"
                  required
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl pl-8 pr-3 py-2 text-xs text-amber-400 font-black focus:outline-none focus:border-amber-400"
                />
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400 font-bold text-xs">
                  ৳
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                পরিমাণ / একক
              </label>
              <input
                type="text"
                value={unitBn}
                onChange={(e) => setUnitBn(e.target.value)}
                placeholder="যেমন: প্রতি পিস"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Quick Unit Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-[10px] text-stone-400 shrink-0">দ্রুত নির্বাচন:</span>
            {QUICK_UNITS.map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnitBn(u)}
                className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all cursor-pointer ${
                  unitBn === u 
                    ? 'bg-amber-500/30 text-amber-300 border border-amber-500/50' 
                    : 'bg-stone-800 text-stone-400 hover:text-white'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          {/* Row 3: Image Section */}
          <div className="bg-stone-850 border border-stone-750 rounded-2xl p-3.5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-200 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
                <span>খাবারের ছবি (ইমেজ আপলোড বা লিংক)</span>
              </label>
              <span className="text-[10px] text-stone-400">কাস্টমাররা সরাসরি এটি দেখতে পাবে</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              {/* Thumbnail Preview */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-black border border-stone-700 shrink-0 relative group">
                {image ? (
                  <img
                    src={image}
                    alt="Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-500 p-2 text-center">
                    <ImageIcon className="w-6 h-6 mb-1" />
                    <span className="text-[9px]">ছবি নেই</span>
                  </div>
                )}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center text-amber-400 text-[10px] font-bold">
                    আপলোড হচ্ছে...
                  </div>
                )}
              </div>

              {/* Upload Buttons and Direct URL */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>ডিভাইস থেকে নতুন ছবি আপলোড</span>
                  </button>

                  {image && (
                    <button
                      type="button"
                      onClick={() => setImage('/images/pdf_bangla_ruti.png')}
                      className="px-2.5 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>ডিফল্ট ছবি</span>
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="অথবা সরাসরি ইমেজ URL পেস্ট করুন..."
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-1.5 text-xs text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Preset Images Quick Picks */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
                  <span className="text-[9px] text-stone-400 shrink-0">ব্রোশিওরের ছবি:</span>
                  {PRESET_IMAGES.map((p) => (
                    <button
                      key={p.url}
                      type="button"
                      onClick={() => setImage(p.url)}
                      className={`px-2 py-0.5 rounded-md text-[9px] font-medium transition-all cursor-pointer whitespace-nowrap ${
                        image === p.url 
                          ? 'bg-amber-500 text-stone-950 font-bold' 
                          : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Tagline & Description */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              ট্যাগলাইন / আকর্ষণীয় স্লোগান
            </label>
            <input
              type="text"
              value={taglineBn}
              onChange={(e) => setTaglineBn(e.target.value)}
              placeholder="যেমন: ৪টি গরম ফুলকো রুটি মাত্র ৩৫ টাকা!"
              className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              বিস্তারিত বিবরণ
            </label>
            <textarea
              rows={2}
              value={descriptionBn}
              onChange={(e) => setDescriptionBn(e.target.value)}
              placeholder="খাবারের স্বাদ ও গুণাগুণ সম্পর্কে লিখুন..."
              className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Row 5: Additional Info (Prep Time, Badge, Calories) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                প্রস্তুত সময় (মিনিট)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={prepTimeMinutes}
                  onChange={(e) => setPrepTimeMinutes(Number(e.target.value))}
                  className="w-full bg-stone-850 border border-stone-700 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <Clock className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                বিশেষ ব্যাজ (Badge)
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="যেমন: নতুন 🔥, স্পেশাল 🌟"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1">
                ক্যালরি / পুষ্টি তথ্য
              </label>
              <input
                type="text"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                placeholder="যেমন: ২৮০ ক্যালরি"
                className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Row 6: Ingredients */}
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1">
              উপকরণসমূহ (কমা দিয়ে আলাদা করুন)
            </label>
            <input
              type="text"
              value={ingredientsText}
              onChange={(e) => setIngredientsText(e.target.value)}
              placeholder="যেমন: গমের আটা, লবণ, গুড়া দুধ, তেল"
              className="w-full bg-stone-850 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Checkboxes: Popular & Vegetarian */}
          <div className="flex items-center gap-6 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 select-none">
              <input
                type="checkbox"
                checked={popular}
                onChange={(e) => setPopular(e.target.checked)}
                className="rounded border-stone-700 text-amber-500 focus:ring-amber-400 h-4 w-4 bg-stone-850"
              />
              <span className="font-semibold">🌟 জনপ্রিয় আইটেম (Popular Choice)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 select-none">
              <input
                type="checkbox"
                checked={isVegetarian}
                onChange={(e) => setIsVegetarian(e.target.checked)}
                className="rounded border-stone-700 text-emerald-500 focus:ring-emerald-400 h-4 w-4 bg-stone-850"
              />
              <span className="font-semibold text-emerald-400">🌱 ১০০% নিরামিষ (Vegetarian)</span>
            </label>
          </div>
        </form>

        {/* Modal Footer */}
        <div className="bg-stone-950 p-4 border-t border-stone-800 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold text-xs transition-colors cursor-pointer"
          >
            বাতিল
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-md hover:shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Check className="w-4 h-4" />
            <span>{isSaving ? 'সংরক্ষণ হচ্ছে...' : isEditing ? 'আপডেট সংরক্ষণ করুন' : 'মেনুতে যোগ করুন'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

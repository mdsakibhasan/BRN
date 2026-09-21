import React from 'react';
import { X, Flame, Clock, ShieldCheck, Sparkles, CheckCircle2, HeartPulse, Plus, Camera } from 'lucide-react';
import { MenuItem } from '../types';

interface ItemDetailsModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenImageUploader?: (targetKey: string) => void;
}

export const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({
  item,
  onClose,
  onAddToCart,
  onOpenImageUploader
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        id="item-details-modal"
        className="bg-stone-900 border border-stone-700 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl text-stone-100 flex flex-col max-h-[90vh]"
      >
        {/* Top Image Banner */}
        <div className="relative h-48 w-full bg-stone-950 overflow-hidden">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.nameBn} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-stone-850 text-stone-500">
              <Flame className="w-12 h-12 text-amber-500/40" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/50" />

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md hover:bg-black/80 text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Badge */}
          {item.badge && (
            <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-md">
              {item.badge}
            </span>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-3 left-4 flex items-baseline gap-1.5">
            <span className="text-2xl font-black text-amber-400">৳{item.price}</span>
            <span className="text-xs text-stone-300 font-medium">/ {item.unitBn}</span>
          </div>

          {/* Change photo button */}
          {onOpenImageUploader && (
            <button
              onClick={() => {
                onClose();
                onOpenImageUploader(item.id);
              }}
              className="absolute bottom-3 right-3 bg-stone-900/85 hover:bg-stone-850 text-stone-200 hover:text-white border border-stone-700 px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-md"
              title="PDF ব্রোশিওরের আসল ছবি দিন"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>PDF ছবি দিন</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm">
          <div>
            <h3 className="text-lg font-extrabold text-white">
              {item.nameBn}
            </h3>
            {item.taglineBn && (
              <p className="text-xs text-amber-400 font-semibold mt-0.5">
                {item.taglineBn}
              </p>
            )}
            <p className="text-stone-300 text-xs mt-2 leading-relaxed">
              {item.descriptionBn}
            </p>
          </div>

          {/* Features Pills */}
          {item.featuresBn && item.featuresBn.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {item.featuresBn.map((feat, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 text-[11px] font-bold flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  {feat}
                </span>
              ))}
            </div>
          )}

          {/* Ingredients list from brochure */}
          {item.ingredientsBn && item.ingredientsBn.length > 0 && (
            <div className="bg-stone-850 border border-stone-700/80 rounded-2xl p-3.5 space-y-2">
              <h4 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>উপাদানসমূহ (Ingredients):</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {item.ingredientsBn.map((ing, idx) => (
                  <span 
                    key={idx} 
                    className="px-2 py-0.5 bg-stone-900 border border-stone-750 rounded-lg text-[11px] text-stone-300 font-medium"
                  >
                    • {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nutrition Facts Table from brochure */}
          {item.nutritionFacts && (
            <div className="bg-stone-850 border border-emerald-500/30 rounded-2xl p-3.5 space-y-2.5">
              <div className="flex items-center justify-between border-b border-stone-750 pb-1.5">
                <h4 className="font-extrabold text-emerald-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HeartPulse className="w-3.5 h-3.5" />
                  <span>Nutrition Facts (প্রতি ১০০ গ্রাম)</span>
                </h4>
                <span className="text-[10px] text-stone-400 font-medium">ল্যাব টেস্টেড</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {item.nutritionFacts.energy && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">ক্যালরি</span>
                    <strong className="text-white font-black">{item.nutritionFacts.energy}</strong>
                  </div>
                )}
                {item.nutritionFacts.protein && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">প্রোটিন</span>
                    <strong className="text-emerald-400 font-black">{item.nutritionFacts.protein}</strong>
                  </div>
                )}
                {item.nutritionFacts.carbs && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">কার্বোহাইড্রেট</span>
                    <strong className="text-white font-black">{item.nutritionFacts.carbs}</strong>
                  </div>
                )}
                {item.nutritionFacts.fiber && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">ফাইবার</span>
                    <strong className="text-amber-400 font-black">{item.nutritionFacts.fiber}</strong>
                  </div>
                )}
                {item.nutritionFacts.fat && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">ফ্যাট</span>
                    <strong className="text-stone-300 font-black">{item.nutritionFacts.fat}</strong>
                  </div>
                )}
                {item.nutritionFacts.sodium && (
                  <div className="bg-stone-900/90 p-2 rounded-xl border border-stone-750">
                    <span className="text-[10px] text-stone-400 block">সোডিয়াম</span>
                    <strong className="text-stone-300 font-black">{item.nutritionFacts.sodium}</strong>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Quality Guarantee Note */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-950 border border-stone-800 text-[11px] text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>১০০% স্বাস্থ্যসম্মত পরিবেশে স্বয়ংক্রিয় মেশিনে তৈরি ও খাদ্যমান নিয়ন্ত্রিত।</span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-stone-950 border-t border-stone-800 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-colors cursor-pointer"
          >
            ফিরে যান
          </button>
          <button
            onClick={() => {
              onAddToCart(item);
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>অর্ডার ব্যাগে যোগ করুন (৳{item.price})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

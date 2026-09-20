import React, { useState } from 'react';
import { Flame, Plus, Minus, Check, Clock, Sparkles } from 'lucide-react';
import { MenuItem, CartItem, Language } from '../types';
import { MENU_ITEMS } from '../data/menu';

interface MenuSectionProps {
  language: Language;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onUpdateQuantity: (itemId: string, delta: number) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  language,
  cart,
  onAddToCart,
  onUpdateQuantity
}) => {
  const isBn = language === 'bn';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', nameBn: 'সব আইটেম', nameEn: 'All Items' },
    { id: 'ruti', nameBn: 'ফুলকো রুটি 🫓', nameEn: 'Fulko Ruti' },
    { id: 'paratha', nameBn: 'শাহী পরোটা 🥐', nameEn: 'Paratha' },
    { id: 'curry', nameBn: 'ডাল ও তরকারি 🍲', nameEn: 'Dal & Curry' },
    { id: 'combos', nameBn: 'সকালের কম্বো প্যাক 📦', nameEn: 'Breakfast Combos' },
    { id: 'drinks', nameBn: 'চা ও পানীয় ☕', nameEn: 'Tea & Drinks' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const getItemQuantity = (id: string): number => {
    const found = cart.find(ci => ci.item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section className="mb-12">
      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            id={`category-filter-${cat.id}`}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20 scale-102'
                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 shadow-sm'
            }`}
          >
            {isBn ? cat.nameBn : cat.nameEn}
          </button>
        ))}
      </div>

      {/* Grid of Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => {
          const qty = getItemQuantity(item.id);

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-5 border border-stone-200/80 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top highlights */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap gap-1.5 items-center">
                    {item.badge && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300/60">
                        {item.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-stone-100 text-stone-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      {item.prepTimeMinutes} {isBn ? 'মিনিট তৈরি' : 'min bake'}
                    </span>
                    {item.calories && (
                      <span className="text-[10px] text-stone-400 font-medium">
                        {item.calories}
                      </span>
                    )}
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug group-hover:text-amber-700 transition-colors">
                  {isBn ? item.nameBn : item.nameEn}
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                  {isBn ? item.descriptionBn : item.descriptionEn}
                </p>
              </div>

              {/* Price & Action button */}
              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl sm:text-2xl font-black text-stone-900">
                      ৳{item.price}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      / {isBn ? item.unitBn : item.unitEn}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-0.5">
                    <Flame className="w-3 h-3 text-orange-500" />
                    {isBn ? 'গরম তাওয়া থেকে প্রস্তুত' : 'Fresh off Tawa'}
                  </span>
                </div>

                {/* Add to Cart or Quantity counter */}
                <div>
                  {qty === 0 ? (
                    <button
                      id={`add-to-cart-${item.id}`}
                      onClick={() => onAddToCart(item)}
                      className="flex items-center gap-1.5 bg-stone-900 hover:bg-amber-600 text-white hover:text-stone-950 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isBn ? 'অর্ডার করুন' : 'Add'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 bg-amber-50 rounded-2xl p-1 border border-amber-300">
                      <button
                        id={`qty-minus-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 rounded-xl bg-white hover:bg-amber-100 text-stone-800 flex items-center justify-center font-black transition-colors shadow-xs cursor-pointer"
                        title="Reduce"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-black text-sm text-stone-900">
                        {qty}
                      </span>
                      <button
                        id={`qty-plus-${item.id}`}
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-black transition-colors shadow-xs cursor-pointer"
                        title="Increase"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

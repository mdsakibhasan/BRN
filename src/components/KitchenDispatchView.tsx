import React from 'react';
import { Flame, Clock, ShieldCheck, MapPin, Bike, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { BRN_KITCHEN_LOCATION } from '../data/menu';

interface KitchenDispatchViewProps {
  language: Language;
}

export const KitchenDispatchView: React.FC<KitchenDispatchViewProps> = ({ language }) => {
  const isBn = language === 'bn';

  const operationalPillars = [
    {
      step: '১',
      time: '০ - ৩ মিনিট',
      titleBn: 'তাওয়াতে তাজা ফুলকো রুটি বেকিং',
      titleEn: 'Blazing Fast Iron Tawa Baking',
      descBn: '১০০% খাঁটি লাল আটার খামির আগে থেকেই প্রস্তুত থাকে। অর্ডার আসার সাথে সাথে লোহার তাওয়ায় ৪০-৬০ সেকেন্ডে রুটি ফুলে ওঠে।',
      descEn: 'Authentic whole wheat dough rolled and puffed on 300°C cast-iron tawas in under 60 seconds.',
      icon: Flame,
      color: 'from-amber-500 to-orange-600'
    },
    {
      step: '২',
      time: '৩ - ৫ মিনিট',
      titleBn: 'থার্মাল ইনসুলেটেড ক্যাসারোল সিলিং',
      titleEn: 'Thermal Insulated Steam Sealing',
      descBn: 'রুটি তাওয়া থেকে সরাসরি ফুড-গ্রেড অ্যালুমিনিয়াম ফয়েল ক্যাসারোলে প্যাক করা হয়, যা ধোঁয়া ও আর্দ্রতা ৮০°C তাপমাত্রায় ধরে রাখে।',
      descEn: 'Packed straight into food-grade insulated thermal box maintaining 80°C hot steam.',
      icon: ShieldCheck,
      color: 'from-orange-500 to-red-600'
    },
    {
      step: '৩',
      time: '৫ - ১৩ মিনিট',
      titleBn: 'মিরপুর ১১ ও ১২ ডেডিকেটেড রাইডার',
      titleEn: 'Hyperlocal 2km Express Dispatch',
      descBn: 'যেহেতু ডেলিভারি এরিয়া কঠোরভাবে ২ কিমির মধ্যে সীমাবদ্ধ, তাই মিরপুর ১১/১২-এর যেকোনো অলিগলিতে পৌঁছাতে মাত্র ৬-৮ মিনিট সময় লাগে।',
      descEn: 'Strict 2km boundary guarantees riders reach any Mirpur 11 or 12 doorstep within 6-8 minutes.',
      icon: Bike,
      color: 'from-emerald-600 to-teal-700'
    },
    {
      step: '৪',
      time: '১৪ - ১৫ মিনিট',
      titleBn: 'গরম গরম ডোরস্টেপ হ্যান্ডওভার',
      titleEn: 'Table-Ready Hot Handover',
      descBn: 'ঠিক ১৫ মিনিটে আপনার হাতে পৌঁছে যায় একদম নরম ও ধোঁয়া ওঠা তাজা রুটি।',
      descEn: 'Guaranteed hot fresh breakfast or dinner ready to be served immediately.',
      icon: Sparkles,
      color: 'from-purple-600 to-indigo-700'
    }
  ];

  return (
    <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-xl mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {isBn ? 'কিচেন অপারেশন আর্কিটেকচার' : 'Kitchen Architecture'}
            </span>
            <span className="text-xs text-stone-400">
              {BRN_KITCHEN_LOCATION.name}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {isBn ? 'কীভাবে আমরা ১৫ মিনিটে গরম রুটি পৌঁছে দিই?' : 'How BRN Delivers Hot Ruti in Exactly 15 Minutes'}
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm mt-1 max-w-2xl">
            {isBn 
              ? 'হাইপার-লোকাল ক্লাউড কিচেন এবং ২ কিমি রেডিয়াসের গাণিতিক নিখুঁত ডেলিভারি মডেল।' 
              : 'Hyperlocal cloud kitchen methodology strictly optimized for a 2km delivery radius.'}
          </p>
        </div>

        <div className="flex items-center gap-3 bg-stone-800/80 p-3 rounded-2xl border border-stone-700">
          <Clock className="w-8 h-8 text-amber-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-white">{isBn ? 'সর্বোচ্চ ১৫ মিনিট' : '15-Min Guaranteed'}</p>
            <p className="text-stone-400">{isBn ? 'দেরি হলে ওয়ালেটে পূর্ণ ফেরত' : 'Full refund if delayed'}</p>
          </div>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {operationalPillars.map((p) => {
          const Icon = p.icon;
          return (
            <div
              key={p.step}
              className="bg-stone-800/60 rounded-2xl p-4 border border-stone-700/60 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-xl bg-gradient-to-br ${p.color} text-white flex items-center justify-center font-black text-xs shadow-md`}>
                    {p.step}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/40">
                    {p.time}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1.5">
                  {isBn ? p.titleBn : p.titleEn}
                </h3>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {isBn ? p.descBn : p.descEn}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-stone-700/40 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'অটোমেটেড কিচেন ট্র্যাকিং' : 'Automated Hub Sync'}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

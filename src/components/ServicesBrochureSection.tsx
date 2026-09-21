import React from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  MapPin, 
  Mail, 
  Bike, 
  Layers, 
  CheckCircle2, 
  Flame, 
  Building, 
  Heart, 
  CreditCard,
  Users,
  ChevronRight,
  Camera,
  Upload
} from 'lucide-react';
import { BRN_BRAND_INFO, BRN_SERVICES } from '../data/menu';

interface ServicesBrochureSectionProps {
  onOrderNow: () => void;
  onCallHotline: () => void;
  customImages?: Record<string, string>;
  onOpenImageUploader?: (targetKey?: string) => void;
}

export const ServicesBrochureSection: React.FC<ServicesBrochureSectionProps> = ({
  onOrderNow,
  onCallHotline,
  customImages = {},
  onOpenImageUploader
}) => {
  const banglaRutiImg = customImages['bangla-ruti-4pack'] || '/images/pdf_bangla_ruti.png';
  const heroComboImg = customImages['roti-booter-dal-combo'] || BRN_BRAND_INFO.images.heroCombo;
  const machineImg = customImages['brand_machine'] || BRN_BRAND_INFO.images.machine;
  const riderImg = customImages['brand_rider'] || BRN_BRAND_INFO.images.rider;
  const familyBreakfastImg = customImages['brand_family'] || BRN_BRAND_INFO.images.familyBreakfast;

  return (
    <div className="space-y-4 pb-4 animate-fade-in text-stone-100">
      {/* Official PDF Verified Badge */}
      <div className="bg-gradient-to-r from-emerald-950/60 via-stone-900 to-emerald-950/40 border border-emerald-500/40 rounded-2xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>PDF ব্রোশিওরের আসল ছবি ও তথ্যের সাথে ১০০% সংযুক্ত</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                অরিজিনাল PDF
              </span>
            </h4>
            <p className="text-[11px] text-stone-300">
              অ্যাপের প্রতিটি আইটেমের ছবি মূল PDF ব্রোশিওরের কনটেন্ট ও প্রোডাক্ট অনুসারে সেট করা
            </p>
          </div>
        </div>
        {onOpenImageUploader && (
          <button
            onClick={() => onOpenImageUploader('bangla-ruti-4pack')}
            className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-600 font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
          >
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>ছবি কাস্টমাইজ</span>
          </button>
        )}
      </div>

      {/* Visual Header Banner matching Brochure Page 1 & 2 */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 border border-stone-700 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="relative h-44 sm:h-52 w-full overflow-hidden">
          <img 
            src={familyBreakfastImg} 
            alt="Family Breakfast" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
          
          <div className="absolute top-3 left-3 bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md">
            অফিশিয়াল ব্রোশিওর ও সার্ভিস
          </div>

          {onOpenImageUploader && (
            <button
              onClick={() => onOpenImageUploader('brand_family')}
              className="absolute top-3 right-3 bg-stone-900/80 hover:bg-stone-850 text-stone-200 border border-stone-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md cursor-pointer transition-all"
            >
              <Camera className="w-3 h-3 text-amber-400" />
              <span>ছবি পরিবর্তন</span>
            </button>
          )}

          <div className="absolute bottom-3 left-4 right-4 space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
              {BRN_BRAND_INFO.mottoBn}
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
              {BRN_BRAND_INFO.nameBn}
            </h2>
            <p className="text-xs text-stone-300">
              {BRN_BRAND_INFO.sloganBn}
            </p>
          </div>
        </div>

        <div className="p-4 bg-stone-900/90 border-t border-stone-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-400">
              পল্লবী মেইন ব্রাঞ্চ • মিরপুর ১১ ও ১২
            </span>
          </div>
          <button
            onClick={onOrderNow}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-md cursor-pointer flex items-center gap-1"
          >
            <span>মেনু দেখুন</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Brochure Promo: 4 Roti 35 Tk & Hot Roti + Booter Dal */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Card 1: 4 Roti for 35 Tk */}
        <div className="bg-gradient-to-br from-amber-600/20 via-stone-850 to-stone-900 border border-amber-500/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-md relative group">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-amber-500/50 shadow-inner relative">
            <img 
              src={banglaRutiImg} 
              alt="Bangla Roti" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {onOpenImageUploader && (
              <button
                onClick={() => onOpenImageUploader('bangla-ruti-4pack')}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                title="PDF থেকে ছবি পরিবর্তন করুন"
              >
                <Camera className="w-4 h-4 text-amber-300" />
              </button>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full">
                অফার মাত্র ৩৫৳
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white mt-1">
              ৪টি বাংলা রুটি
            </h4>
            <p className="text-[11px] text-stone-300 line-clamp-1">
              সকাল-সন্ধ্যার নরম ও সুস্বাদু মেশিনমেড রুটি
            </p>
          </div>
        </div>

        {/* Card 2: Hot Roti + Booter Dal */}
        <div className="bg-gradient-to-br from-emerald-600/20 via-stone-850 to-stone-900 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3.5 shadow-md relative group">
          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-emerald-500/50 shadow-inner relative">
            <img 
              src={heroComboImg} 
              alt="Roti Dal Combo" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {onOpenImageUploader && (
              <button
                onClick={() => onOpenImageUploader('roti-booter-dal-combo')}
                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                title="PDF থেকে ছবি পরিবর্তন করুন"
              >
                <Camera className="w-4 h-4 text-emerald-300" />
              </button>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black bg-emerald-500 text-stone-950 px-2 py-0.5 rounded-full">
                ঝামেলাহীন সন্ধ্যা-সকাল
              </span>
            </div>
            <h4 className="font-extrabold text-sm text-white mt-1">
              গরম রুটি + বুটের ডাল
            </h4>
            <p className="text-[11px] text-stone-300 line-clamp-1">
              গৃহিণীর স্বস্তি ও সম্পূর্ণ পুষ্টিকর নাস্তা
            </p>
          </div>
        </div>
      </div>

      {/* Our Services (আমাদের সেবা সমূহ) Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-sm text-white uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>আমাদের সেবা সমূহ / Our Services</span>
          </h3>
          <span className="text-[11px] text-stone-400">ব্রোশিওর পৃষ্ঠা ২</span>
        </div>

        {/* Machine & Production Feature with Real Photo */}
        <div className="bg-stone-850 border border-stone-750 rounded-2xl overflow-hidden relative group">
          <div className="h-36 w-full relative">
            <img 
              src={machineImg} 
              alt="Automatic Roti Machine" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-amber-400 text-[10px] font-black border border-amber-500/40">
              স্বয়ংক্রিয় উৎপাদন
            </span>

            {onOpenImageUploader && (
              <button
                onClick={() => onOpenImageUploader('brand_machine')}
                className="absolute top-2.5 right-2.5 bg-stone-900/80 hover:bg-stone-850 text-stone-200 border border-stone-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md cursor-pointer transition-all"
              >
                <Camera className="w-3 h-3 text-amber-400" />
                <span>মেশিনের ছবি পরিবর্তন</span>
              </button>
            )}
          </div>
          <div className="p-3.5 space-y-1">
            <h4 className="font-extrabold text-sm text-white">
              স্বয়ংক্রিয় মেশিনে তাজা রুটি উৎপাদন
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              প্রতিদিন স্বাস্থ্যসম্মত পরিবেশে সম্পূর্ণ অটোমেটিক মেশিনে তৈরি তাজা রুটি প্রস্তুত ও দ্রুত সরবরাহ করা হয়। ধুলোবালি বা হাতের স্পর্শমুক্ত বিশ্বমানের ফুড গ্রেড প্রস্তুতি।
            </p>
          </div>
        </div>

        {/* Own Rider Routing System with Real Photo */}
        <div className="bg-stone-850 border border-stone-750 rounded-2xl overflow-hidden relative group">
          <div className="h-36 w-full relative">
            <img 
              src={riderImg} 
              alt="Delivery Rider" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-black/30" />
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-stone-950/80 backdrop-blur-md text-emerald-400 text-[10px] font-black border border-emerald-500/40">
              ১৫ মিনিট ডেলিভারি
            </span>

            {onOpenImageUploader && (
              <button
                onClick={() => onOpenImageUploader('brand_rider')}
                className="absolute top-2.5 right-2.5 bg-stone-900/80 hover:bg-stone-850 text-stone-200 border border-stone-700 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-md cursor-pointer transition-all"
              >
                <Camera className="w-3 h-3 text-emerald-400" />
                <span>রাইডারের ছবি পরিবর্তন</span>
              </button>
            )}
          </div>
          <div className="p-3.5 space-y-1">
            <h4 className="font-extrabold text-sm text-white flex items-center justify-between">
              <span>Own Rider Routing System</span>
              <span className="text-[11px] text-amber-400 font-bold">Max 2 Km</span>
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              "নিজস্ব ডেলিভারি কর্মী ও পথ নির্দেশক/নির্ধারণ ব্যবস্থা"। নির্দিষ্ট রুটে থার্মাল ইনসুলেটেড ব্যাগে ধোঁয়া ওঠা গরম রুটি আপনার দরজায় পৌঁছে দেওয়া হয়।
            </p>
          </div>
        </div>

        {/* 4 Core Services List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div className="bg-stone-850/80 border border-stone-750 p-3 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Layers className="w-4 h-4" />
              <span>শ্রেণীবদ্ধ ও বিশেষায়িত রুটি</span>
            </div>
            <p className="text-stone-300 text-[11px]">
              ডায়াবেটিসের জন্য DiaFit, এনার্জির জন্য YoungFuel, গ্লুটেন ফ্রি চালের রুটি এবং ঐতিহ্যবাহী চাঁপাইনবাবগঞ্জের কলাই রুটি।
            </p>
          </div>

          <div className="bg-stone-850/80 border border-stone-750 p-3 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CreditCard className="w-4 h-4" />
              <span>প্রিপেইড অর্ডার ও ওয়ালেট</span>
            </div>
            <p className="text-stone-300 text-[11px]">
              bKash, নগদ ও Rocket-এর মাধ্যমে ডিজিটাল পেমেন্ট—খুচরা ও ভাঙতি টাকার ঝামেলাহীন ডিজিটাল ওয়ালেট সুবিধা।
            </p>
          </div>

          <div className="bg-stone-850/80 border border-stone-750 p-3 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>সকাল ও সন্ধ্যার শিডিউল</span>
            </div>
            <p className="text-stone-300 text-[11px]">
              সকাল: ৭:০০টা - ১১:০০টা এবং সন্ধ্যা: ০৫:৩০টা - ০৯:৩০টা পর্যন্ত নির্দিষ্ট রুটে এক্সপ্রেস ডেলিভারি।
            </p>
          </div>

          <div className="bg-stone-850/80 border border-stone-750 p-3 rounded-xl space-y-1">
            <div className="flex items-center gap-2 text-purple-400 font-bold">
              <Building className="w-4 h-4" />
              <span>পাইকারি রুটি সরবরাহ</span>
            </div>
            <p className="text-stone-300 text-[11px]">
              হাসপাতাল, মাদ্রাসা, হোস্টেল, কারখানা ও অফিসের নিয়মিত খাবারের জন্য বিশেষ পাইকারি রেটে রুটি সরবরাহ।
            </p>
          </div>
        </div>
      </div>

      {/* Founder Message / Consumer Note from Brochure */}
      <div className="bg-gradient-to-br from-stone-900 to-stone-950 border border-amber-500/30 rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-amber-400" />
          <h4 className="font-extrabold text-sm text-white">
            সম্মানিত ভোক্তাগণ — বাংলা রুটি নেটওয়ার্ক
          </h4>
        </div>
        <p className="text-xs text-stone-300 leading-relaxed">
          "আমাদের দেশের আটার রুটির ব্যবসাটি কেবল রেস্টুরেন্ট বেজ রয়ে গেছে। আজ পর্যন্ত এটাকে ইন্ডাস্ট্রি পর্যায়ে পৌঁছে নাই... সাধারণ জনগণ, ডায়াবেটিস রোগী এবং যুবকদের শারীরিক পুষ্টি চাহিদায় ভিন্নতা রয়েছে। বিভিন্ন উপাদানের মিশ্রণে আলাদাভাবে শ্রেণীবদ্ধ রুটি উৎপাদনে আমরাই প্রথম।"
        </p>
        <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px]">
          <span className="text-amber-400 font-bold">বাংলা রুটি নেটওয়ার্ক পল্লবী ইউনিট</span>
          <span className="text-stone-400">ঢাকা-১২১৬</span>
        </div>
      </div>

      {/* Service Areas & Contact Information from Brochure */}
      <div className="bg-stone-850 border border-stone-750 rounded-2xl p-4 space-y-3">
        <h4 className="font-extrabold text-xs text-white uppercase tracking-wider flex items-center gap-2 text-emerald-400">
          <MapPin className="w-4 h-4" />
          <span>পল্লবী ইউনিট থেকে আমাদের সেবা এলাকা:</span>
        </h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-stone-200 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>পল্লবী</span>
          </div>
          <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-stone-200 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>মিরপুর ডিওএইচএস</span>
          </div>
          <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-stone-200 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>মিরপুর-১১</span>
          </div>
          <div className="bg-stone-900 p-2.5 rounded-xl border border-stone-800 text-stone-200 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>মিরপুর-১২</span>
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="pt-2 border-t border-stone-800 space-y-2 text-xs">
          <div className="flex items-start gap-2 text-stone-300">
            <MapPin className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
            <span>{BRN_BRAND_INFO.addressBn}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-300">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BRN_BRAND_INFO.hotline} / {BRN_BRAND_INFO.hotlineAlt}</span>
            </div>
            <a 
              href={`tel:${BRN_BRAND_INFO.hotline}`}
              onClick={onCallHotline}
              className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-lg text-[11px]"
            >
              কল করুন
            </a>
          </div>
          <div className="flex items-center gap-2 text-stone-400 text-[11px]">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>{BRN_BRAND_INFO.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

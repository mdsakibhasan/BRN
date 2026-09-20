import React, { useEffect, useState } from 'react';
import { 
  X, 
  Clock, 
  Flame, 
  Package, 
  Bike, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Order, Language } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  order: Order | null;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  language,
  order
}) => {
  const isBn = language === 'bn';
  const [secondsLeft, setSecondsLeft] = useState<number>(900); // 15 minutes = 900s
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(1);

  useEffect(() => {
    if (!isOpen || !order) return;
    setSecondsLeft(order.remainingSeconds || 875);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCurrentStepIndex(4);
          return 0;
        }
        
        // Dynamically progress steps based on remaining time
        // 900-750s: Step 1 (Baking)
        // 750-600s: Step 2 (Packing)
        // 600-60s: Step 3 (Delivering on bike in Mirpur)
        // <60s: Step 4 (Arriving / Delivered)
        if (prev > 750) setCurrentStepIndex(1);
        else if (prev > 600) setCurrentStepIndex(2);
        else if (prev > 60) setCurrentStepIndex(3);
        else setCurrentStepIndex(4);

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, order]);

  if (!isOpen || !order) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const steps = [
    {
      titleBn: 'অর্ডার গৃহীত হয়েছে',
      titleEn: 'Order Confirmed',
      descBn: 'মিরপুর ১১ কেন্দ্রীয় কিচেনে অর্ডার পৌঁছেছে',
      descEn: 'Order registered at Mirpur 11 Central Hub',
      icon: CheckCircle2,
    },
    {
      titleBn: 'গরম তাওয়ায় ফুলকো রুটি প্রস্তুত হচ্ছে',
      titleEn: 'Baking Fresh on Hot Tawa',
      descBn: 'হাতে গড়া লাল আটার রুটি তাওয়াতে সেঁকা হচ্ছে',
      descEn: 'Authentic hand-rolled whole wheat ruti baking on fire',
      icon: Flame,
    },
    {
      titleBn: 'ইনসুলেটেড হট বক্সে প্যাক করা হয়েছে',
      titleEn: 'Packed in Thermal Insulated Casserole',
      descBn: 'ধোঁয়া ওঠা গরম রাখার বিশেষ ফয়েল বক্স সিলড',
      descEn: 'Sealed in thermal casing to retain 100% steam & freshness',
      icon: Package,
    },
    {
      titleBn: 'রাইডার আপনার ঠিকানায় রওনা দিয়েছেন',
      titleEn: 'BRN Express Rider En Route',
      descBn: 'মিরপুর ১১/১২ রোড হয়ে দ্রুত গতিতে এগিয়ে আসছে',
      descEn: 'Navigating through Mirpur 11/12 express corridors',
      icon: Bike,
    },
    {
      titleBn: 'গরম অবস্থায় ডেলিভারি সম্পন্ন',
      titleEn: 'Delivered Fresh & Piping Hot',
      descBn: 'টেবিলে পরিবেশন করুন এবং গরম রুটি উপভোগ করুন!',
      descEn: 'Serve immediately at your dining table!',
      icon: Sparkles,
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-white">
                  {isBn ? '১৫ মিনিটে গরম রুটি লাইভ ট্র্যাকার' : '15-Min Live Ruti Tracker'}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                  {order.orderNumber}
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {isBn ? `${order.zone} ডেলিভারি • ${order.distanceKm} কিমি` : `${order.zone} Delivery • ${order.distanceKm} km`}
              </p>
            </div>
          </div>

          <button 
            id="close-order-tracker-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Big 15-Minute Countdown Display */}
        <div className="bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-amber-100 mb-2">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              {isBn ? 'সর্বোচ্চ ডেলিভারি সময়ের বাকি' : 'Guaranteed Delivery Countdown'}
            </span>

            <div className="text-5xl sm:text-6xl font-black font-mono tracking-tight my-1 drop-shadow-md">
              {formattedTime}
            </div>

            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              {secondsLeft > 0 
                ? (isBn ? '১৫ মিনিটের মধ্যে তাওয়া থেকে সরাসরি আপনার টেবিলে পৌঁছাবে! 🛵💨' : 'From blazing tawa straight to your table in 15 mins!')
                : (isBn ? 'রাইডার আপনার দরজায় পৌঁছে গেছেন! 🎉' : 'Rider has reached your doorstep! 🎉')}
            </p>
          </div>
        </div>

        {/* Tracking Steps */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="space-y-4">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              const StepIcon = step.icon;

              return (
                <div key={idx} className="flex items-start gap-3 relative">
                  {/* Vertical connecting line */}
                  {idx < steps.length - 1 && (
                    <div className={`absolute left-4 top-8 w-0.5 h-8 -ml-px ${
                      idx < currentStepIndex ? 'bg-emerald-500' : 'bg-stone-200'
                    }`} />
                  )}

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors z-10 ${
                    isCompleted 
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : isCurrent
                        ? 'bg-amber-500 text-stone-950 ring-4 ring-amber-100 animate-pulse'
                        : 'bg-stone-100 text-stone-400'
                  }`}>
                    <StepIcon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 pb-1">
                    <p className={`text-xs sm:text-sm font-bold ${
                      isCompleted ? 'text-stone-900' : isCurrent ? 'text-amber-600 font-black' : 'text-stone-400'
                    }`}>
                      {isBn ? step.titleBn : step.titleEn}
                    </p>
                    <p className="text-[11px] text-stone-500 leading-tight mt-0.5">
                      {isBn ? step.descBn : step.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Rider Card */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-700 flex items-center justify-center font-black">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-stone-900">{order.riderName}</p>
                <p className="text-[11px] text-stone-500">
                  {isBn ? 'এক্সপ্রেস রাইডার • বাইক: ঢাকা মেট্রো হ-৮৮১২' : 'Express Rider • Bike: Dhaka Ha-8812'}
                </p>
              </div>
            </div>

            <a
              href={`tel:${order.riderPhone}`}
              className="flex items-center gap-1.5 bg-stone-900 hover:bg-stone-800 text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{isBn ? 'কল দিন' : 'Call'}</span>
            </a>
          </div>

          {/* Order Details summary */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs text-stone-700 space-y-1.5">
            <div className="flex items-center justify-between font-bold text-stone-900 pb-1 border-b border-amber-200/60">
              <span>{isBn ? 'ডেলিভারি ঠিকানা' : 'Delivery Address'}</span>
              <span className="text-amber-800 font-mono text-[11px]">{order.paymentMethod} Payment</span>
            </div>
            <p className="text-stone-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="truncate">{order.deliveryAddress}</span>
            </p>
            <div className="pt-1 flex justify-between font-extrabold text-stone-900">
              <span>{isBn ? 'মোট পরিশোধিত' : 'Total Paid'}:</span>
              <span className="text-amber-700 text-sm">৳{order.total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 text-center">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'ট্র্যাকার উইন্ডো বন্ধ করুন (ব্যাকগ্রাউন্ডে চলমান)' : 'Close Tracker (Runs in Background)'}
          </button>
        </div>
      </div>
    </div>
  );
};

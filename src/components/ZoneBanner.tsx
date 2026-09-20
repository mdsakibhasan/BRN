import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertTriangle, Navigation, Clock, ShieldCheck, Flame } from 'lucide-react';
import { MirpurLocation, Language } from '../types';
import { MIRPUR_LOCATIONS, BRN_KITCHEN_LOCATION } from '../data/menu';

interface ZoneBannerProps {
  language: Language;
  selectedLocation: MirpurLocation;
  onSelectLocation: (loc: MirpurLocation) => void;
}

export const ZoneBanner: React.FC<ZoneBannerProps> = ({
  language,
  selectedLocation,
  onSelectLocation
}) => {
  const isBn = language === 'bn';
  const [customAddress, setCustomAddress] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const isWithinRadius = selectedLocation.distanceKm <= BRN_KITCHEN_LOCATION.maxRadiusKm;

  return (
    <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-4 sm:p-6 border border-stone-800 shadow-xl relative overflow-hidden mb-6">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                {isBn ? 'মিরপুর ১১ ও ১২ এক্সপ্রেস হাব' : 'Mirpur 11 & 12 Express Hub'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {isBn ? '১৫ মিনিটে গরম রুটি গ্যারান্টি' : '15-Min Fresh Delivery'}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30">
                {isBn ? 'সর্বোচ্চ ২ কিমি কভারেজ' : 'Strict 2km Radius'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {isBn ? (
                <>
                  তাওয়া থেকে সরাসরি আপনার টেবিলে <span className="text-amber-400 underline decoration-amber-500/50">১৫ মিনিটে</span> তাজা গরম রুটি!
                </>
              ) : (
                <>
                  Piping Hot Fresh Ruti from Tawa to Doorstep in <span className="text-amber-400">15 Minutes</span>!
                </>
              )}
            </h1>
            <p className="text-stone-300 text-sm mt-1 max-w-2xl">
              {isBn 
                ? 'মিরপুর ১১ এবং ১২ এর বাসিন্দাদের জন্য বিশেষায়িত নেটওয়ার্ক। আগে bKash/Nagad দিয়ে BRN ওয়ালেটে টাকা যোগ করে ১-ক্লিকেই অর্ডার করুন।'
                : 'Exclusive hyper-local cloud kitchen for Mirpur 11 & 12. Top-up in-app BRN Wallet via bKash/Nagad and reorder in 1-click.'}
            </p>
          </div>

          {/* Guarantee Badges */}
          <div className="flex sm:flex-row lg:flex-col gap-2 shrink-0">
            <div className="bg-stone-800/90 rounded-2xl p-3 border border-stone-700/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-lg">
                15m
              </div>
              <div className="text-xs">
                <p className="font-bold text-white">{isBn ? 'টাইমার চ্যালেঞ্জ' : 'Timer Pledge'}</p>
                <p className="text-stone-400">{isBn ? 'দেরি হলে ক্যাশব্যাক' : '15m or cashback'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Radius Check Bar */}
        <div className="mt-4 pt-2">
          <div className="text-xs font-semibold text-stone-300 mb-2 flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-amber-400" />
            <span>{isBn ? 'আপনার ডেলিভারি লোকেশন ও ২ কিমি এরিয়া ভ্যালিডেশন:' : 'Select Your Mirpur Location (Within 2km):'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Location selector dropdown */}
            <div className="md:col-span-8 relative">
              <div 
                id="location-picker-btn"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full bg-stone-800/90 hover:bg-stone-800 border border-stone-700 hover:border-amber-500/50 rounded-2xl px-4 py-3 text-left cursor-pointer flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`p-2 rounded-xl shrink-0 ${isWithinRadius ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white truncate">
                        {isBn ? selectedLocation.nameBn : selectedLocation.nameEn}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-stone-700 text-amber-300 shrink-0">
                        {selectedLocation.zone}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 truncate mt-0.5">
                      {selectedLocation.addressHint}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="text-xs font-bold text-amber-400 block">
                    {selectedLocation.distanceKm} km
                  </span>
                  <span className="text-[11px] text-stone-400">
                    ~{selectedLocation.estimatedDeliveryMin} {isBn ? 'মিনিট' : 'min'}
                  </span>
                </div>
              </div>

              {/* Dropdown list */}
              {showDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-stone-850 border border-stone-700 rounded-2xl shadow-2xl p-2 z-50 max-h-72 overflow-y-auto">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {isBn ? 'মিরপুর ১১ ও ১২ অনুমোদিত পয়েন্টসমূহ' : 'Available Mirpur 11 & 12 Spots'}
                  </div>
                  {MIRPUR_LOCATIONS.map((loc) => {
                    const isAvailable = loc.distanceKm <= BRN_KITCHEN_LOCATION.maxRadiusKm;
                    return (
                      <div
                        key={loc.id}
                        onClick={() => {
                          onSelectLocation(loc);
                          setShowDropdown(false);
                        }}
                        className={`p-2.5 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                          selectedLocation.id === loc.id 
                            ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40' 
                            : 'hover:bg-stone-800 text-stone-200'
                        } ${!isAvailable ? 'opacity-60 bg-red-950/10' : ''}`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <MapPin className={`w-4 h-4 shrink-0 ${isAvailable ? 'text-amber-400' : 'text-stone-500'}`} />
                          <div className="truncate">
                            <p className="text-xs font-semibold truncate">{isBn ? loc.nameBn : loc.nameEn}</p>
                            <p className="text-[10px] text-stone-400">{loc.addressHint}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-2">
                          <span className={`text-xs font-bold ${isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>
                            {loc.distanceKm} km
                          </span>
                          <span className="text-[10px] text-stone-400 block">
                            {isAvailable ? (isBn ? 'ডেলিভারি চালু' : 'Deliverable') : (isBn ? 'সীমার বাইরে' : 'Out of range')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Distance / 2km Status Pill */}
            <div className="md:col-span-4 flex items-center">
              <div className={`w-full h-full p-3 rounded-2xl border flex items-center gap-3 ${
                isWithinRadius 
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                  : 'bg-red-950/40 border-red-500/40 text-red-200'
              }`}>
                {isWithinRadius ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
                )}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold">
                      {isWithinRadius 
                        ? (isBn ? '২ কিমি রেডিয়াসের ভেতরে ✅' : 'Within 2km Zone ✅')
                        : (isBn ? '২ কিমি সীমার বাইরে ❌' : 'Beyond 2km Radius ❌')}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-300 leading-tight mt-0.5">
                    {isWithinRadius 
                      ? (isBn ? `দূরত্ব: ${selectedLocation.distanceKm} কিমি • আনুমানিক ডেলিভারি ${selectedLocation.estimatedDeliveryMin} মিনিটে` : `Distance: ${selectedLocation.distanceKm}km • Est. arrival ${selectedLocation.estimatedDeliveryMin} mins`)
                      : (isBn ? 'আপাতত শুধু মিরপুর ১১ ও ১২-এর ২ কিমির মধ্যে ডেলিভারি দিচ্ছি' : 'Currently servicing strictly within 2km')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

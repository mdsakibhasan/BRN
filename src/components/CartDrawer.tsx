import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Clock, 
  Wallet, 
  ShieldCheck, 
  Flame, 
  AlertCircle,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { CartItem, MirpurLocation, Language, Order } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
  walletBalance: number;
  onOpenWallet: () => void;
  selectedLocation: MirpurLocation;
  onPlaceOrder: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  language,
  cart,
  onUpdateQuantity,
  onClearCart,
  walletBalance,
  onOpenWallet,
  selectedLocation,
  onPlaceOrder
}) => {
  const isBn = language === 'bn';
  const [customerName, setCustomerName] = useState('মুহাম্মদ শাকিল');
  const [phone, setPhone] = useState('01711234567');
  const [specificAddress, setSpecificAddress] = useState('বাসা #৪৫, রোড #৩, ব্লক বি');
  const [paymentMethod, setPaymentMethod] = useState<'Wallet' | 'bKash' | 'Nagad'>('Wallet');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.item.price * item.quantity), 0);
  const deliveryFee = subtotal >= 180 ? 0 : 20;
  const total = subtotal + deliveryFee;

  const isBalanceSufficient = walletBalance >= total;
  const isDeliverableZone = selectedLocation.distanceKm <= 2.0;

  const handleCheckout = () => {
    if (cart.length === 0 || !isDeliverableZone) return;

    if (paymentMethod === 'Wallet' && !isBalanceSufficient) {
      onOpenWallet();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'BRN-' + Math.floor(100000 + Math.random() * 900000),
        orderNumber: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        items: [...cart],
        subtotal,
        deliveryFee,
        discount: 0,
        total,
        paymentMethod,
        customerName: customerName || 'Mirpur Customer',
        phone: phone || '01711XXXXXX',
        deliveryAddress: `${specificAddress}, ${isBn ? selectedLocation.nameBn : selectedLocation.nameEn}`,
        zone: selectedLocation.zone,
        distanceKm: selectedLocation.distanceKm,
        status: 'baking',
        targetDeliveryTime: '15 মিনিট',
        riderName: 'সুমন আহমেদ (BRN Express)',
        riderPhone: '01823-998877',
        remainingSeconds: 900 // 15 minutes = 900 seconds
      };

      setIsSubmitting(false);
      onPlaceOrder(newOrder);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Drawer Header */}
        <div className="p-4 bg-stone-900 text-white flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-white">
                {isBn ? 'আপনার গরম রুটির ঝুড়ি' : 'Your Ruti Basket'}
              </h2>
              <span className="text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3" />
                {isBn ? 'কনফার্ম করলেই ১৫ মিনিটে ডেলিভারি' : '15-Minute Guaranteed Delivery'}
              </span>
            </div>
          </div>
          <button 
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Deliverable Zone Alert */}
          <div className={`p-3 rounded-2xl border text-xs flex items-center gap-2.5 ${
            isDeliverableZone
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}>
            <MapPin className="w-4 h-4 shrink-0" />
            <div className="truncate">
              <span className="font-bold block">
                {isBn ? selectedLocation.nameBn : selectedLocation.nameEn}
              </span>
              <span className="text-[11px] text-stone-600">
                {selectedLocation.distanceKm} km • {isDeliverableZone ? (isBn ? '২ কিমি রেডিয়াসের মধ্যে (১৫ মিনিট গ্যারান্টি)' : 'Inside 2km range') : (isBn ? '২ কিমি সীমার বাইরে' : 'Out of range')}
              </span>
            </div>
          </div>

          {/* Cart Items List */}
          {cart.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Flame className="w-8 h-8 opacity-40" />
              </div>
              <p className="text-sm font-bold text-stone-700">
                {isBn ? 'ঝুড়িতে কোনো রুটি নেই!' : 'Your cart is empty!'}
              </p>
              <p className="text-xs text-stone-400 max-w-xs mx-auto">
                {isBn ? 'তাজা লাল আটার ফুলকো রুটি বা পরোটা বেছে নিয়ে ১৫ মিনিটে গরম ডেলিভারি নিন।' : 'Pick freshly baked whole wheat ruti or paratha to start.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider pb-1 border-b border-stone-100">
                <span>{isBn ? 'অর্ডারকৃত আইটেম' : 'Order Items'}</span>
                <button
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-red-600 flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" />
                  {isBn ? 'মুছুন' : 'Clear'}
                </button>
              </div>

              {cart.map(({ item, quantity }) => (
                <div 
                  key={item.id}
                  className="p-3 bg-stone-50 rounded-2xl border border-stone-200/70 flex items-center justify-between gap-3"
                >
                  <div className="truncate flex-1">
                    <p className="font-bold text-xs sm:text-sm text-stone-900 truncate">
                      {isBn ? item.nameBn : item.nameEn}
                    </p>
                    <p className="text-[11px] text-stone-500">
                      ৳{item.price} × {quantity} = <strong className="text-stone-800">৳{item.price * quantity}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white rounded-xl p-1 border border-stone-200 shrink-0">
                    <button
                      onClick={() => onUpdateQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center font-extrabold text-xs text-stone-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Delivery Details Form */}
              <div className="pt-2 space-y-2.5">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isBn ? 'ডেলিভারি ঠিকানা ও ফোন নম্বর:' : 'Delivery Address & Phone:'}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={isBn ? 'আপনার নাম' : 'Name'}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-amber-500 outline-none"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-amber-500 outline-none"
                  />
                </div>
                <input
                  type="text"
                  value={specificAddress}
                  onChange={(e) => setSpecificAddress(e.target.value)}
                  placeholder={isBn ? 'বাসা/ফ্ল্যাট নম্বর, রোড, ল্যান্ডমার্ক' : 'House/Flat No, Road, Landmark'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 focus:border-amber-500 outline-none"
                />
              </div>

              {/* Payment Method Selection */}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  {isBn ? 'পেমেন্ট পদ্ধতি নির্বাচন করুন:' : 'Payment Method:'}
                </p>

                {/* Primary: BRN Wallet */}
                <div
                  onClick={() => setPaymentMethod('Wallet')}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === 'Wallet'
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-stone-900">
                          {isBn ? 'BRN ওয়ালেট ব্যালেন্স (দ্রুততম ১-ক্লিক)' : 'BRN Wallet Balance (Instant 1-Click)'}
                        </p>
                        <p className="text-[11px] text-stone-500">
                          {isBn ? `ব্যালেন্স আছে: ৳${walletBalance}` : `Available: ৳${walletBalance}`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      {isBalanceSufficient ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {isBn ? 'পর্যাপ্ত ব্যালেন্স' : 'Sufficient'}
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenWallet();
                          }}
                          className="text-[11px] font-black text-pink-600 hover:underline flex items-center gap-1"
                        >
                          +bKash রিচার্জ
                        </button>
                      )}
                    </div>
                  </div>

                  {!isBalanceSufficient && paymentMethod === 'Wallet' && (
                    <div className="mt-2 pt-2 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-red-600 font-semibold">
                      <span>{isBn ? `আরও ৳${total - walletBalance} রিচার্জ প্রয়োজন` : `Need ৳${total - walletBalance} more`}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenWallet();
                        }}
                        className="bg-pink-600 hover:bg-pink-700 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer"
                      >
                        {isBn ? 'এখনই bKash দিয়ে রিচার্জ' : 'Recharge via bKash'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Direct bKash / Nagad options */}
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setPaymentMethod('bKash')}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'bKash'
                        ? 'border-[#E2136E] bg-pink-50/50 text-[#E2136E] font-bold'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-[#E2136E] text-white flex items-center justify-center text-[10px] font-black">bK</span>
                    <span>bKash গেটওয়ে</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('Nagad')}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center gap-2 ${
                      paymentMethod === 'Nagad'
                        ? 'border-[#F7921E] bg-orange-50/50 text-[#F7921E] font-bold'
                        : 'border-stone-200 text-stone-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded bg-[#F7921E] text-white flex items-center justify-center text-[10px] font-black">ন</span>
                    <span>Nagad গেটওয়ে</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Bill Summary */}
        {cart.length > 0 && (
          <div className="p-4 bg-stone-50 border-t border-stone-200 space-y-3">
            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>{isBn ? 'সাবটোটাল' : 'Subtotal'}</span>
                <span className="font-bold text-stone-900">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  {isBn ? '১৫ মিনিট এক্সপ্রেস ডেলিভারি ফি' : '15-min Express Delivery'}
                  {subtotal >= 180 && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-1.5 rounded">
                      FREE
                    </span>
                  )}
                </span>
                <span className="font-bold text-stone-900">
                  {deliveryFee === 0 ? (isBn ? 'ফ্রি' : 'Free') : `৳${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-stone-900 pt-1 border-t border-stone-200">
                <span>{isBn ? 'সর্বমোট প্রদেয়' : 'Total Amount'}</span>
                <span className="text-base font-black text-amber-600">৳{total}</span>
              </div>
            </div>

            {/* 15 min guarantee badge */}
            <div className="bg-amber-100/70 border border-amber-300/80 rounded-xl p-2 text-center text-[11px] font-bold text-amber-950 flex items-center justify-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              <span>
                {isBn 
                  ? 'অর্ডার কনফার্ম করার ঠিক ১৫ মিনিটের মধ্যে গরম ডেলিভারি!' 
                  : 'Delivered piping hot in exactly 15 minutes!'}
              </span>
            </div>

            {/* Submit Order Button */}
            <button
              type="button"
              id="confirm-place-order-btn"
              disabled={isSubmitting || !isDeliverableZone}
              onClick={handleCheckout}
              className={`w-full py-3.5 rounded-2xl text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all ${
                !isDeliverableZone
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-400 shadow-amber-500/20'
              }`}
            >
              {isSubmitting ? (
                <span>{isBn ? 'অর্ডার প্রস্তুত হচ্ছে...' : 'Placing Order...'}</span>
              ) : (
                <>
                  <span>
                    {paymentMethod === 'Wallet' && !isBalanceSufficient
                      ? (isBn ? `bKash রিচার্জ করে ৳${total} পে করুন` : `Top-up bKash to Pay ৳${total}`)
                      : (isBn ? `১৫ মিনিটে গরম রুটি অর্ডার করুন (৳${total})` : `Order Hot Ruti Now (৳${total})`)}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

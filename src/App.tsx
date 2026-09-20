import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Wallet, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ShoppingBag, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  PhoneCall, 
  Plus, 
  Minus, 
  Navigation, 
  AlertCircle, 
  Bike, 
  Package, 
  Home, 
  ChevronRight,
  Phone,
  RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, testFirestoreConnection } from './lib/firebase';

import { 
  MenuItem, 
  CartItem, 
  MirpurLocation, 
  WalletTransaction, 
  Order, 
  Language 
} from './types';
import { MENU_ITEMS, MIRPUR_LOCATIONS, BRN_KITCHEN_LOCATION } from './data/menu';

import { CartDrawer } from './components/CartDrawer';
import { WalletModal } from './components/WalletModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'tracker' | 'wallet' | 'zone'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Wallet state with local persistence
  const [walletBalance, setWalletBalance] = useState<number>(() => {
    const saved = localStorage.getItem('brn_wallet_balance');
    return saved ? Number(saved) : 250;
  });

  const [transactions, setTransactions] = useState<WalletTransaction[]>(() => {
    const saved = localStorage.getItem('brn_transactions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'TX-INITIAL',
        date: 'আজকে',
        type: 'credit',
        method: 'bKash',
        amount: 250,
        trxId: 'BKS99281987',
        status: 'Completed',
        note: 'স্বাগতম রিচার্জ বোনাস (মিরপুর ১১/১২)'
      }
    ];
  });

  // Cart & Location
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<MirpurLocation>(MIRPUR_LOCATIONS[0]);

  // Active Order state
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [trackerSeconds, setTrackerSeconds] = useState<number>(900); // 15 minutes = 900s

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isLocationSelectorOpen, setIsLocationSelectorOpen] = useState(false);

  // Test Firestore connection on boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Persist wallet & transactions
  useEffect(() => {
    localStorage.setItem('brn_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('brn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // 15-Minute Countdown timer for active order
  useEffect(() => {
    if (!activeOrder) return;
    const timer = setInterval(() => {
      setTrackerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeOrder]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.item.price * item.quantity, 0);

  // Cart quantity handlers
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const getItemQuantity = (id: string): number => {
    const found = cart.find((ci) => ci.item.id === id);
    return found ? found.quantity : 0;
  };

  // Top-up wallet handler
  const handleTopUpSuccess = async (amount: number, method: 'bKash' | 'Nagad', trxId: string) => {
    const newBal = walletBalance + amount;
    setWalletBalance(newBal);

    const newTx: WalletTransaction = {
      id: 'TX-' + Date.now(),
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'credit',
      method,
      amount,
      trxId,
      status: 'Completed',
      note: `${method} থেকে BRN ওয়ালেট রিচার্জ`
    };

    setTransactions((prev) => [newTx, ...prev]);

    try {
      await setDoc(doc(db, 'wallets', 'user_wallet'), {
        userId: 'guest_user',
        balance: newBal,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.warn('Firestore wallet sync note:', e);
    }
  };

  // Order placement handler
  const handlePlaceOrder = async (newOrder: Order) => {
    if (newOrder.paymentMethod === 'Wallet') {
      const newBal = Math.max(0, walletBalance - newOrder.total);
      setWalletBalance(newBal);

      const debitTx: WalletTransaction = {
        id: 'TX-' + Date.now(),
        date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'debit',
        method: 'Order Payment',
        amount: newOrder.total,
        trxId: 'ORD-' + newOrder.orderNumber,
        status: 'Completed',
        note: `গরম রুটি অর্ডার (#${newOrder.orderNumber})`
      };

      setTransactions((prev) => [debitTx, ...prev]);

      try {
        await setDoc(doc(db, 'wallets', 'user_wallet'), {
          userId: 'guest_user',
          balance: newBal,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      } catch (e) {
        console.warn('Firestore wallet update note:', e);
      }
    }

    setActiveOrder(newOrder);
    setTrackerSeconds(900);
    setCart([]);
    setIsCartOpen(false);
    setActiveTab('tracker'); // Automatically switch to live tracker

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    try {
      await addDoc(collection(db, 'orders'), {
        id: 'ORD-' + newOrder.orderNumber,
        customerPhone: newOrder.phone || '01711000000',
        customerAddress: newOrder.deliveryAddress,
        zone: newOrder.zone,
        items: JSON.stringify(newOrder.items.map(i => ({ name: i.item.nameBn, qty: i.quantity, price: i.item.price }))),
        totalAmount: newOrder.total,
        status: 'baking',
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.warn('Firestore order sync note:', e);
    }
  };

  const categories = [
    { id: 'all', name: 'সব আইটেম' },
    { id: 'ruti', name: 'ফুলকো রুটি 🫓' },
    { id: 'paratha', name: 'শাহী পরোটা 🥐' },
    { id: 'curry', name: 'ডাল ও ভাজি 🍲' },
    { id: 'combos', name: 'কম্বো মিল 📦' },
    { id: 'drinks', name: 'চা ও পানীয় ☕' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex justify-center selection:bg-amber-500 selection:text-white font-sans">
      {/* Mobile-first Phone Container */}
      <div className="w-full max-w-md min-h-screen bg-stone-900 flex flex-col relative pb-24 shadow-2xl overflow-x-hidden border-x border-stone-800/80">
        
        {/* iOS App Top Bar */}
        <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur-md px-4 py-3 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md">
              <Flame className="w-5 h-5 text-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-extrabold text-sm text-white tracking-tight">বাংলা রুটি</h1>
                <span className="text-[10px] font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/30">
                  BRN
                </span>
              </div>
              <button 
                onClick={() => setIsLocationSelectorOpen(true)}
                className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-amber-400 transition-colors cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-amber-500" />
                <span className="font-semibold">{selectedLocation.nameBn.split(',')[0]}</span>
                <span className="text-[10px] text-amber-400 bg-amber-950/60 px-1 rounded">২ কিমি</span>
              </button>
            </div>
          </div>

          {/* Wallet Balance Pill */}
          <button
            onClick={() => {
              setActiveTab('wallet');
            }}
            className="flex items-center gap-1.5 bg-stone-800/90 hover:bg-stone-750 px-2.5 py-1.5 rounded-xl border border-stone-700 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">
              ৳
            </div>
            <div className="text-left">
              <span className="text-xs font-black text-emerald-400">৳{walletBalance}</span>
            </div>
            <div className="w-4 h-4 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-[11px]">
              +
            </div>
          </button>
        </header>

        {/* Active Order Dynamic Island / Banner (Visible on all tabs if order running) */}
        {activeOrder && activeTab !== 'tracker' && (
          <div 
            onClick={() => setActiveTab('tracker')}
            className="mx-3 mt-3 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white p-3 rounded-2xl shadow-lg flex items-center justify-between cursor-pointer border border-amber-400/40 animate-pulse"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center">
                <Bike className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-200">
                    ১৫ মি. লাইভ ডেলিভারি চলছে
                  </span>
                  <span className="text-xs font-mono font-bold">#{activeOrder.orderNumber}</span>
                </div>
                <p className="text-xs font-bold text-white/95">
                  বাকি সময়: {formatTime(trackerSeconds)} মিনিট
                </p>
              </div>
            </div>
            <div className="bg-white text-stone-950 px-2.5 py-1 rounded-xl text-[11px] font-black flex items-center gap-1">
              <span>ট্র্যাক</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        )}

        {/* TAB 1: MENU / HOME */}
        {activeTab === 'menu' && (
          <div className="p-3 space-y-4">
            {/* Express Delivery Hero */}
            <div className="bg-gradient-to-br from-amber-600/90 via-orange-600/90 to-stone-900 p-4 rounded-3xl text-white shadow-xl relative overflow-hidden border border-amber-500/30">
              <div className="relative z-10">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-stone-950/40 text-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" />
                    মিরপুর ১১ ও ১২ স্পেশাল
                  </span>
                </div>
                <h2 className="text-lg font-black leading-tight text-white mt-1">
                  তাওয়া থেকে তাজা গরম রুটি <br />
                  <span className="text-amber-300">১৫ মিনিটে</span> আপনার দরজায়!
                </h2>
                <p className="text-xs text-stone-200 mt-1">
                  ২ কিমির মধ্যে ১০০% তাজা ফুলকো রুটি ও দেশি ঘিয়ের পরোটা ডেলিভারি গ্যারান্টি।
                </p>
              </div>
            </div>

            {/* Category Filter Horizontal Scroll */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md font-extrabold scale-102'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-750 border border-stone-700/60'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Menu Items List (Mobile Card Style) */}
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:border-amber-500/50 transition-all shadow-sm"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        {item.badge && (
                          <span className="text-[9px] font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5 text-amber-400" />
                          {item.prepTimeMinutes} মি.
                        </span>
                      </div>
                      <h3 className="font-extrabold text-sm text-stone-100 truncate">
                        {item.nameBn}
                      </h3>
                      <p className="text-[11px] text-stone-400 line-clamp-1 mt-0.5">
                        {item.descriptionBn}
                      </p>
                      <div className="flex items-baseline gap-1 mt-1.5">
                        <span className="text-base font-black text-amber-400">৳{item.price}</span>
                        <span className="text-[10px] text-stone-400">/ {item.unitBn}</span>
                      </div>
                    </div>

                    {/* Stepper / Add button */}
                    <div className="shrink-0">
                      {qty === 0 ? (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>যোগ করুন</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-stone-900 border border-amber-500/50 rounded-xl p-1">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center font-black active:scale-95 transition-all cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-5 text-center text-xs font-black text-amber-400">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-black active:scale-95 transition-all cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: LIVE ORDER TRACKER */}
        {activeTab === 'tracker' && (
          <div className="p-3 space-y-4">
            {activeOrder ? (
              <div className="space-y-4">
                {/* 15-Minute Countdown Dial */}
                <div className="bg-gradient-to-b from-stone-800 to-stone-850 border border-stone-700 rounded-3xl p-5 text-center shadow-xl space-y-3">
                  <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-black border border-amber-500/30">
                    <Flame className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                    <span>১৫ মিনিট গ্যারান্টি ডেলিভারি</span>
                  </div>

                  <div>
                    <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight">
                      {formatTime(trackerSeconds)}
                    </div>
                    <p className="text-xs text-stone-400 font-medium mt-1">
                      {trackerSeconds > 0 ? 'গরম রুটি তৈরি ও পৌঁছানোর বাকি সময়' : 'ডেলিভারি সম্পন্ন হয়েছে!'}
                    </p>
                  </div>

                  {/* Progress stages */}
                  <div className="pt-2 space-y-2 text-left">
                    <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${trackerSeconds > 600 ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold' : 'bg-stone-900 border-stone-800 text-stone-400'}`}>
                      <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>১. তাওয়ায় গরম রুটি তাজা সেঁকা হচ্ছে</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${trackerSeconds <= 600 && trackerSeconds > 300 ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold' : 'bg-stone-900 border-stone-800 text-stone-400'}`}>
                      <Package className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>২. হট থার্মাল ব্যাগে প্যাকেজিং সম্পন্ন</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${trackerSeconds <= 300 && trackerSeconds > 0 ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold' : 'bg-stone-900 border-stone-800 text-stone-400'}`}>
                      <Bike className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>৩. রাইডার মিরপুরের পথে আছে</span>
                    </div>

                    <div className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${trackerSeconds === 0 ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' : 'bg-stone-900 border-stone-800 text-stone-400'}`}>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>৪. আপনার দরজায় গরম রুটি পৌঁছে গেছে!</span>
                    </div>
                  </div>
                </div>

                {/* Rider Info Card */}
                <div className="bg-stone-800/90 border border-stone-700 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 font-black flex items-center justify-center text-sm">
                      BRN
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">মো. শাকিল (এক্সপ্রেস রাইডার)</h4>
                      <p className="text-[11px] text-stone-400">বাইক: ঢাকা মেট্রো-হ-১২৩৪ (মিরপুর ১১/১২)</p>
                    </div>
                  </div>
                  <a
                    href="tel:01711000000"
                    className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-md"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>

                {/* Order Summary */}
                <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-700">
                    <span className="font-bold text-stone-400">অর্ডার নম্বর:</span>
                    <span className="font-mono font-bold text-amber-400">#{activeOrder.orderNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pb-2 border-b border-stone-700">
                    <span className="font-bold text-stone-400">ডেলিভারি ঠিকানা:</span>
                    <span className="font-semibold text-stone-200 text-right">{activeOrder.deliveryAddress}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-400">মোট পরিশোধিত:</span>
                    <span className="font-black text-emerald-400 text-sm">৳{activeOrder.total} ({activeOrder.paymentMethod})</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-stone-500">
                  <Bike className="w-8 h-8" />
                </div>
                <h3 className="font-black text-base text-white">বর্তমানে কোনো রানিং অর্ডার নেই</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  মিরপুর ১১ বা ১২ নম্বরে গরম ফুলকো রুটি অর্ডার করুন, ১৫ মিনিটে পৌঁছে যাবে!
                </p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all shadow-md cursor-pointer"
                >
                  তাজা মেনু দেখুন ও অর্ডার করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WALLET (bKash & Nagad) */}
        {activeTab === 'wallet' && (
          <div className="p-3 space-y-4">
            {/* Wallet Balance Card */}
            <div className="bg-gradient-to-br from-stone-800 via-stone-850 to-stone-900 border border-stone-700 rounded-3xl p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">BRN ওয়ালেট ব্যালেন্স</span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-0.5 flex items-baseline gap-1">
                    <span className="text-emerald-400">৳{walletBalance}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black text-xl">
                  <Wallet className="w-6 h-6" />
                </div>
              </div>

              <div className="p-3 bg-stone-950/80 rounded-2xl border border-stone-800 text-xs text-stone-300 leading-relaxed">
                <span className="font-bold text-amber-400">💡 নিয়ম: </span>
                আগে bKash বা Nagad দিয়ে ওয়ালেটে ব্যালেন্স রিচার্জ করে রাখুন। এরপর রুটি অর্ডারের সময় ১-ট্যাপেই ব্যালেন্স থেকে অটো পেমেন্ট হয়ে যাবে।
              </div>

              {/* Quick Recharge button */}
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E2136E] to-[#F7921E] hover:opacity-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>bKash / Nagad দিয়ে ওয়ালেট রিচার্জ করুন</span>
              </button>
            </div>

            {/* Quick 1-Tap Recharge Shortcuts */}
            <div className="bg-stone-800/80 border border-stone-700 rounded-2xl p-4 space-y-2.5">
              <span className="text-xs font-bold text-stone-300">তাত্ক্ষণিক রিচার্জ শর্টকাট:</span>
              <div className="grid grid-cols-3 gap-2">
                {[100, 200, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      handleTopUpSuccess(amt, 'bKash', 'BKS' + Math.floor(10000000 + Math.random() * 90000000));
                      confetti({ particleCount: 50, spread: 60 });
                    }}
                    className="py-2 rounded-xl bg-stone-900 hover:bg-stone-750 border border-stone-700 text-amber-400 text-xs font-black transition-all cursor-pointer"
                  >
                    + ৳{amt}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Transactions List */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">সাম্প্রতিক লেনদেন</h4>
              <div className="space-y-2">
                {transactions.slice(0, 5).map((tx) => (
                  <div 
                    key={tx.id}
                    className="bg-stone-800/60 border border-stone-700/60 rounded-xl p-3 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-stone-200">{tx.note}</div>
                      <div className="text-[10px] text-stone-500">{tx.date} • Trx: {tx.trxId}</div>
                    </div>
                    <div className={`font-black text-sm ${tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {tx.type === 'credit' ? '+' : '-'}৳{tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MIRPUR 11 & 12 2KM ZONE */}
        {activeTab === 'zone' && (
          <div className="p-3 space-y-4">
            <div className="bg-gradient-to-br from-stone-800 to-stone-900 border border-stone-700 rounded-3xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  সর্বোচ্চ ২ কিমি কভারেজ
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400">
                  ১৫ মিনিট গ্যারান্টি
                </span>
              </div>
              <h3 className="text-base font-black text-white">
                মিরপুর ১১ ও ১২ নম্বরে কেন শুধুমাত্র ২ কিমি?
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                তাওয়া থেকে নামানো ফুলকো রুটি থার্মাল ব্যাগে সর্বোচ্চ ১৫ মিনিট পর্যন্ত ফুটন্ত গরম ও নরম থাকে। রুটির গুণমান ঠিক রাখতে BRN শুধুমাত্র মিরপুর ১১ ও ১২ এর নির্ধারিত ২ কিমি এলাকার ভেতর অর্ডার ডেলিভারি করে।
              </p>
            </div>

            {/* Selectable Mirpur Locations */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">ডেলিভারি এরিয়া নির্বাচন করুন</h4>
              <div className="space-y-2">
                {MIRPUR_LOCATIONS.map((loc) => {
                  const isSelected = selectedLocation.id === loc.id;
                  return (
                    <div
                      key={loc.id}
                      onClick={() => {
                        if (loc.isAvailable) {
                          setSelectedLocation(loc);
                        }
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-amber-500/20 border-amber-500 text-white shadow-md' 
                          : loc.isAvailable 
                            ? 'bg-stone-800/80 border-stone-700/80 hover:bg-stone-800 text-stone-300'
                            : 'bg-stone-900/40 border-stone-800 text-stone-600 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <MapPin className={`w-4 h-4 shrink-0 ${isSelected ? 'text-amber-400' : 'text-stone-500'}`} />
                        <div>
                          <div className="text-xs font-bold">{loc.nameBn}</div>
                          <div className="text-[10px] text-stone-400">{loc.addressHint}</div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        {loc.isAvailable ? (
                          <span className="text-[11px] font-black text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                            {loc.estimatedDeliveryMin} মি.
                          </span>
                        ) : (
                          <span className="text-[10px] text-red-400 font-bold">সীমার বাইরে</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hotline callout */}
            <div className="p-3.5 bg-stone-800/60 rounded-2xl border border-stone-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-stone-300">
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>সরাসরি হটলাইন: <strong>{BRN_KITCHEN_LOCATION.hotline}</strong></span>
              </div>
              <a 
                href={`tel:${BRN_KITCHEN_LOCATION.hotline}`}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black rounded-lg text-[11px]"
              >
                কল করুন
              </a>
            </div>
          </div>
        )}

        {/* Floating Cart Checkout Bar (Shown when cart has items) */}
        {cartCount > 0 && (
          <div className="fixed bottom-18 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md animate-fade-in">
            <div 
              onClick={() => setIsCartOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between cursor-pointer active:scale-98 transition-all border border-amber-300/40"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-stone-950 text-white flex items-center justify-center font-black text-xs relative">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-black">
                    {cartCount}
                  </span>
                </div>
                <div>
                  <div className="text-xs font-black">
                    {cartCount}টি আইটেম • ৳{cartTotal}
                  </div>
                  <div className="text-[10px] font-bold text-stone-900 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>১৫ মিনিটে গরম ডেলিভারি</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-black bg-stone-950 text-white px-3 py-1.5 rounded-xl">
                <span>অর্ডার করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        )}

        {/* iOS Native Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-md bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-2 py-2 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'menu' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px]">মেনু</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl relative transition-all cursor-pointer ${
              activeTab === 'tracker' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            {activeOrder && (
              <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            )}
            <Bike className="w-5 h-5" />
            <span className="text-[10px]">ট্র্যাকিং</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'wallet' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">ওয়ালেট</span>
          </button>

          <button
            onClick={() => setActiveTab('zone')}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'zone' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px]">এলাকা</span>
          </button>
        </nav>

        {/* Location Selector Bottom Sheet Modal */}
        {isLocationSelectorOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-fade-in">
            <div className="bg-stone-900 border border-stone-800 w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 space-y-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-amber-500" />
                  <span>মিরপুর ১১ ও ১২ এলাকা নির্বাচন করুন</span>
                </h3>
                <button
                  onClick={() => setIsLocationSelectorOpen(false)}
                  className="w-7 h-7 rounded-full bg-stone-800 text-stone-300 flex items-center justify-center font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2">
                {MIRPUR_LOCATIONS.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      if (loc.isAvailable) {
                        setSelectedLocation(loc);
                        setIsLocationSelectorOpen(false);
                      }
                    }}
                    disabled={!loc.isAvailable}
                    className={`w-full p-3 rounded-xl text-left border flex items-center justify-between text-xs transition-all ${
                      selectedLocation.id === loc.id
                        ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                        : loc.isAvailable
                          ? 'bg-stone-800/80 border-stone-700 text-stone-300 hover:bg-stone-800'
                          : 'bg-stone-900 border-stone-800 text-stone-600 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{loc.nameBn}</div>
                      <div className="text-[10px] text-stone-400">{loc.addressHint}</div>
                    </div>
                    {loc.isAvailable ? (
                      <span className="text-emerald-400 font-bold">{loc.estimatedDeliveryMin} মি.</span>
                    ) : (
                      <span className="text-red-400 font-bold">অনুপলব্ধ</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Cart Drawer Modal */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          language="bn"
          cart={cart}
          onUpdateQuantity={handleUpdateQuantity}
          onClearCart={() => setCart([])}
          walletBalance={walletBalance}
          onOpenWallet={() => {
            setIsCartOpen(false);
            setActiveTab('wallet');
            setIsWalletModalOpen(true);
          }}
          selectedLocation={selectedLocation}
          onPlaceOrder={handlePlaceOrder}
        />

        {/* Wallet Top-up Modal */}
        <WalletModal
          isOpen={isWalletModalOpen}
          onClose={() => setIsWalletModalOpen(false)}
          language="bn"
          walletBalance={walletBalance}
          transactions={transactions}
          onTopUpSuccess={handleTopUpSuccess}
        />

      </div>
    </div>
  );
}

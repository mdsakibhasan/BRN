import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Wallet, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ShoppingBag, 
  Smartphone, 
  Monitor, 
  Code2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  CreditCard,
  PhoneCall,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { 
  MenuItem, 
  CartItem, 
  MirpurLocation, 
  WalletTransaction, 
  Order, 
  Language 
} from './types';
import { MENU_ITEMS, MIRPUR_LOCATIONS, BRN_KITCHEN_LOCATION } from './data/menu';

import { Header } from './components/Header';
import { ZoneBanner } from './components/ZoneBanner';
import { MenuSection } from './components/MenuSection';
import { WalletModal } from './components/WalletModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { FlutterCodeModal } from './components/FlutterCodeModal';
import { MobileFrame } from './components/MobileFrame';
import { KitchenDispatchView } from './components/KitchenDispatchView';

export default function App() {
  const [language, setLanguage] = useState<Language>('bn');
  const [viewMode, setViewMode] = useState<'web' | 'mobile'>('web');
  const [mobileNavTab, setMobileNavTab] = useState<'home' | 'wallet' | 'tracker' | 'zone'>('home');

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

  // Active Order
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  // Modals
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);

  // Persist wallet & transactions
  useEffect(() => {
    localStorage.setItem('brn_wallet_balance', walletBalance.toString());
  }, [walletBalance]);

  useEffect(() => {
    localStorage.setItem('brn_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const isBn = language === 'bn';
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart handlers
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

  const handleClearCart = () => {
    setCart([]);
  };

  // Top-up wallet handler
  const handleTopUpSuccess = (amount: number, method: 'bKash' | 'Nagad', trxId: string) => {
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
  };

  // Order placement handler
  const handlePlaceOrder = (newOrder: Order) => {
    // If paid via wallet, deduct balance
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
    }

    setActiveOrder(newOrder);
    setCart([]);
    setIsTrackerOpen(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Content to render inside Web or Mobile Simulator
  const mainContent = (
    <div className="space-y-6">
      {/* Active Order Banner if running */}
      {activeOrder && (
        <div 
          onClick={() => setIsTrackerOpen(true)}
          className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-3.5 sm:p-4 rounded-2xl sm:rounded-3xl shadow-lg flex items-center justify-between cursor-pointer hover:brightness-105 transition-all border border-amber-400/40 animate-pulse"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-black/30 px-2 py-0.5 rounded text-amber-200">
                  {isBn ? 'লাইভ ১৫ মি. ডেলিভারি চলছে' : 'Live 15-Min Delivery'}
                </span>
                <span className="text-xs font-mono font-bold text-amber-100">
                  #{activeOrder.orderNumber}
                </span>
              </div>
              <p className="text-xs text-white/90 font-medium mt-0.5">
                {isBn 
                  ? `তাওয়া থেকে গরম রুটি পথে আছে (${activeOrder.zone})` 
                  : `Hot ruti is on the way to ${activeOrder.zone}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 bg-white text-stone-950 px-3 py-1.5 rounded-xl text-xs font-black shrink-0">
            <span>{isBn ? 'ট্র্যাকার দেখুন' : 'View Tracker'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>
      )}

      {/* Zone Validation & 2km Notice */}
      <ZoneBanner
        language={language}
        selectedLocation={selectedLocation}
        onSelectLocation={setSelectedLocation}
      />

      {/* Wallet Quick Recharge Callout */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black text-white">
                {isBn ? 'BRN ইন-অ্যাপ ওয়ালেট' : 'BRN In-App Wallet'}
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ৳{walletBalance}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">
              {isBn 
                ? 'আগে bKash বা Nagad দিয়ে ওয়ালেটে রিচার্জ করুন, প্রতিবার মাত্র ১-ক্লিক ও ১৫ মিনিটে পেয়ে যান গরম রুটি।'
                : 'Top-up once via bKash/Nagad to enjoy instant 1-tap checkout with guaranteed 15-min delivery.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            id="quick-topup-btn"
            onClick={() => setIsWalletOpen(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-[#E2136E] to-[#F7921E] hover:opacity-90 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
          >
            <CreditCard className="w-4 h-4" />
            <span>{isBn ? 'bKash / Nagad রিচার্জ' : 'Recharge Wallet'}</span>
          </button>
        </div>
      </div>

      {/* Menu Catalog */}
      <MenuSection
        language={language}
        cart={cart}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* 15-Minute Kitchen Operational Architecture */}
      <KitchenDispatchView language={language} />

      {/* Footer info & Hotline */}
      <footer className="pt-6 pb-10 border-t border-stone-200 text-stone-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-600" />
          <span className="font-bold text-stone-800">Bangla Ruti Network (BRN)</span>
          <span>•</span>
          <span>{isBn ? 'মিরপুর ১১ ও ১২ স্পেশাল হাব' : 'Mirpur 11 & 12 Special Hub'}</span>
        </div>

        <div className="flex items-center gap-4 text-stone-600 font-medium">
          <span>হটলাইন: <strong>01711-BRN-RUTI</strong></span>
          <span>•</span>
          <button
            onClick={() => setIsFlutterCodeOpen(true)}
            className="text-sky-600 hover:underline font-bold cursor-pointer flex items-center gap-1"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Flutter কোড দেখুন</span>
          </button>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans selection:bg-amber-500 selection:text-white">
      {/* Header */}
      <Header
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'bn' ? 'en' : 'bn')}
        walletBalance={walletBalance}
        onOpenWallet={() => setIsWalletOpen(true)}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
        onOpenFlutterCode={() => setIsFlutterCodeOpen(true)}
        selectedZone={selectedLocation.zone}
      />

      {/* Main Viewport */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6">
        {viewMode === 'mobile' ? (
          <div className="space-y-4">
            {/* Helper bar above mobile simulator */}
            <div className="bg-stone-900 text-stone-300 rounded-2xl p-3 text-xs flex items-center justify-between max-w-[420px] mx-auto border border-stone-800">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">Flutter Mobile App Simulator</span>
              </div>
              <button
                onClick={() => setViewMode('web')}
                className="text-amber-400 hover:underline font-bold text-[11px] cursor-pointer"
              >
                {isBn ? 'ওয়েব মোডে দেখুন' : 'Switch to Web'}
              </button>
            </div>

            {/* Smartphone frame */}
            <MobileFrame
              activeNavTab={mobileNavTab}
              onNavTabChange={(tab) => {
                setMobileNavTab(tab);
                if (tab === 'wallet') setIsWalletOpen(true);
                else if (tab === 'tracker' && activeOrder) setIsTrackerOpen(true);
                else if (tab === 'tracker' && !activeOrder) {
                  // If no active order, open cart
                  setIsCartOpen(true);
                }
              }}
              language={language}
              walletBalance={walletBalance}
              hasActiveOrder={!!activeOrder}
            >
              <div className="p-3">
                {mainContent}
              </div>
            </MobileFrame>
          </div>
        ) : (
          /* Full Web Storefront View */
          <div>
            {mainContent}
          </div>
        )}
      </main>

      {/* Bottom Floating Cart Bar if cart has items */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg animate-fade-in">
          <div 
            id="floating-cart-bar"
            onClick={() => setIsCartOpen(true)}
            className="bg-stone-900 hover:bg-stone-850 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-stone-700 flex items-center justify-between cursor-pointer transition-all hover:scale-101"
          >
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-black">
                  {cartCount}
                </span>
              </div>
              <div>
                <p className="text-xs font-black text-white">
                  {cartCount} {isBn ? 'টি আইটেম যোগ করা হয়েছে' : 'items added'}
                </p>
                <p className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {isBn ? '১৫ মিনিটে গরম ডেলিভারি' : '15-min delivery ready'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">
                ৳{cart.reduce((sum, item) => sum + (item.item.price * item.quantity), 0)}
              </span>
              <div className="w-7 h-7 rounded-lg bg-stone-800 flex items-center justify-center text-amber-400">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        language={language}
        walletBalance={walletBalance}
        transactions={transactions}
        onTopUpSuccess={handleTopUpSuccess}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        language={language}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onClearCart={handleClearCart}
        walletBalance={walletBalance}
        onOpenWallet={() => setIsWalletOpen(true)}
        selectedLocation={selectedLocation}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        language={language}
        order={activeOrder}
      />

      {/* Flutter Code Modal */}
      <FlutterCodeModal
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
        language={language}
      />
    </div>
  );
}

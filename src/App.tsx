import React, { useState, useEffect, useMemo } from 'react';
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
  RefreshCw,
  Smartphone,
  Camera
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { collection, addDoc, doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db, testFirestoreConnection } from './lib/firebase';

import { 
  MenuItem, 
  CartItem, 
  MirpurLocation, 
  WalletTransaction, 
  Order, 
  Language 
} from './types';
import { MENU_ITEMS, MIRPUR_LOCATIONS, BRN_KITCHEN_LOCATION, BRN_BRAND_INFO } from './data/menu';

import { CartDrawer } from './components/CartDrawer';
import { WalletModal } from './components/WalletModal';
import { AndroidApkModal } from './components/AndroidApkModal';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { ServicesBrochureSection } from './components/ServicesBrochureSection';
import { ImageUploaderModal, CustomImagesMap } from './components/ImageUploaderModal';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'services' | 'tracker' | 'wallet' | 'zone'>('menu');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItemForDetails, setSelectedItemForDetails] = useState<MenuItem | null>(null);
  
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
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isImageUploaderOpen, setIsImageUploaderOpen] = useState(false);
  const [uploaderTargetKey, setUploaderTargetKey] = useState<string | null>(null);

  // Admin Panel State
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminTargetKey, setAdminTargetKey] = useState<string | null>(null);
  const [liveOrders, setLiveOrders] = useState<any[]>([]);

  // Deleted / Hidden Sections State (Managed by Admin)
  const [deletedSections, setDeletedSections] = useState<string[]>(() => {
    const saved = localStorage.getItem('brn_deleted_sections');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Deleted / Out-of-Stock Menu Items State (Managed by Admin)
  const [deletedMenuItems, setDeletedMenuItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('brn_deleted_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Custom Added Food Items by Admin
  const [customMenuItems, setCustomMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('brn_custom_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Edited / Modified Food Items by Admin (keyed by item.id)
  const [modifiedMenuItems, setModifiedMenuItems] = useState<Record<string, Partial<MenuItem>>>(() => {
    const saved = localStorage.getItem('brn_modified_items');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Custom PDF Images (sanitized against external unsplash URLs)
  const [customImages, setCustomImages] = useState<CustomImagesMap>(() => {
    const saved = localStorage.getItem('brn_custom_images');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const cleaned: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === 'string' && !v.includes('unsplash.com')) {
            cleaned[k] = v;
          }
        }
        return cleaned;
      } catch {
        // fallback
      }
    }
    return {};
  });

  // Sync deleted sections from Firestore cloud config in real-time
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'app_config', 'sections_config'), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.deletedSections)) {
            setDeletedSections(data.deletedSections);
            localStorage.setItem('brn_deleted_sections', JSON.stringify(data.deletedSections));
          }
        }
      });
      return () => unsub();
    } catch (err) {
      console.warn('Realtime cloud sections listener note:', err);
    }
  }, []);

  // Sync menu items (deleted list, custom added items, modified items) from Firestore in real-time
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'app_config', 'items_config'), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && Array.isArray(data.deletedMenuItems)) {
            setDeletedMenuItems(data.deletedMenuItems);
            localStorage.setItem('brn_deleted_items', JSON.stringify(data.deletedMenuItems));
          }
          if (data && data.customItems) {
            try {
              const items = typeof data.customItems === 'string' ? JSON.parse(data.customItems) : data.customItems;
              if (Array.isArray(items)) {
                setCustomMenuItems(items);
                localStorage.setItem('brn_custom_items', JSON.stringify(items));
              }
            } catch (e) {
              console.warn('Error parsing customItems from Firestore:', e);
            }
          }
          if (data && data.modifiedItems) {
            try {
              const mods = typeof data.modifiedItems === 'string' ? JSON.parse(data.modifiedItems) : data.modifiedItems;
              if (mods && typeof mods === 'object') {
                setModifiedMenuItems(mods);
                localStorage.setItem('brn_modified_items', JSON.stringify(mods));
              }
            } catch (e) {
              console.warn('Error parsing modifiedItems from Firestore:', e);
            }
          }
        }
      });
      return () => unsub();
    } catch (err) {
      console.warn('Realtime cloud items listener note:', err);
    }
  }, []);

  // Sync custom images from Firestore cloud config in real-time
  useEffect(() => {
    try {
      const unsub = onSnapshot(doc(db, 'app_config', 'custom_images'), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data && data.images) {
            try {
              const cloudImages = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
              if (cloudImages && typeof cloudImages === 'object') {
                const sanitized: Record<string, string> = {};
                for (const [k, v] of Object.entries(cloudImages)) {
                  if (typeof v === 'string' && !v.includes('unsplash.com')) {
                    sanitized[k] = v;
                  }
                }
                setCustomImages((prev) => ({ ...prev, ...sanitized }));
                localStorage.setItem('brn_custom_images', JSON.stringify(sanitized));
              }
            } catch (err) {
              console.warn('Could not parse cloud custom images:', err);
            }
          }
        }
      });
      return () => unsub();
    } catch (err) {
      console.warn('Realtime cloud images listener note:', err);
    }
  }, []);

  // Sync real-time orders from Firestore
  useEffect(() => {
    try {
      const unsub = onSnapshot(collection(db, 'orders'), (snapshot) => {
        const ords: any[] = [];
        snapshot.forEach((docSnap) => {
          ords.push({ id: docSnap.id, ...docSnap.data() });
        });
        ords.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        setLiveOrders(ords);
      });
      return () => unsub();
    } catch (err) {
      console.warn('Realtime orders listener note:', err);
    }
  }, []);

  const handleUpdateCustomImage = async (key: string, dataUrl: string) => {
    const updated = { ...customImages, [key]: dataUrl };
    setCustomImages(updated);
    localStorage.setItem('brn_custom_images', JSON.stringify(updated));

    // Save to Firestore app_config so all customers/devices immediately see it
    try {
      await setDoc(doc(db, 'app_config', 'custom_images'), {
        images: JSON.stringify(updated),
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore custom image upload sync note:', err);
    }
  };

  const handleResetCustomImage = async (key: string) => {
    const updated = { ...customImages };
    delete updated[key];
    setCustomImages(updated);
    localStorage.setItem('brn_custom_images', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'app_config', 'custom_images'), {
        images: JSON.stringify(updated),
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore reset image sync note:', err);
    }
  };

  const handleResetAllCustomImages = async () => {
    setCustomImages({});
    localStorage.removeItem('brn_custom_images');

    try {
      await setDoc(doc(db, 'app_config', 'custom_images'), {
        images: JSON.stringify({}),
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      });
    } catch (err) {
      console.warn('Firestore reset all images sync note:', err);
    }
  };

  // Section Deletion Handlers
  const handleToggleSection = async (sectionId: string, deleted: boolean) => {
    let updated: string[];
    if (deleted) {
      updated = Array.from(new Set([...deletedSections, sectionId]));
    } else {
      updated = deletedSections.filter((id) => id !== sectionId);
    }
    setDeletedSections(updated);
    localStorage.setItem('brn_deleted_sections', JSON.stringify(updated));

    try {
      await setDoc(doc(db, 'app_config', 'sections_config'), {
        deletedSections: updated,
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore toggle section note:', err);
    }
  };

  const handleRestoreAllSections = async () => {
    setDeletedSections([]);
    localStorage.removeItem('brn_deleted_sections');

    try {
      await setDoc(doc(db, 'app_config', 'sections_config'), {
        deletedSections: [],
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      });
    } catch (err) {
      console.warn('Firestore restore all sections note:', err);
    }
  };

  // Helper to persist menu items configuration (deleted, custom, modified) to Firestore
  const saveMenuItemsConfig = async (
    newDeleted: string[],
    newCustom: MenuItem[],
    newModified: Record<string, Partial<MenuItem>>
  ) => {
    try {
      await setDoc(doc(db, 'app_config', 'items_config'), {
        deletedMenuItems: newDeleted,
        customItems: JSON.stringify(newCustom),
        modifiedItems: JSON.stringify(newModified),
        updatedAt: new Date().toISOString(),
        updatedBy: 'md.shakhaoathossain@gmail.com'
      }, { merge: true });
    } catch (err) {
      console.warn('Firestore menu items config sync error:', err);
    }
  };

  // Menu Item Deletion / Availability Handlers
  const handleToggleMenuItem = async (itemId: string, deleted: boolean) => {
    let updated: string[];
    if (deleted) {
      updated = Array.from(new Set([...deletedMenuItems, itemId]));
    } else {
      updated = deletedMenuItems.filter((id) => id !== itemId);
    }
    setDeletedMenuItems(updated);
    localStorage.setItem('brn_deleted_items', JSON.stringify(updated));
    await saveMenuItemsConfig(updated, customMenuItems, modifiedMenuItems);
  };

  const handleRestoreAllMenuItems = async () => {
    setDeletedMenuItems([]);
    localStorage.removeItem('brn_deleted_items');
    await saveMenuItemsConfig([], customMenuItems, modifiedMenuItems);
  };

  // Add New Menu Item Handler
  const handleAddMenuItem = async (newItem: MenuItem) => {
    const updatedCustom = [newItem, ...customMenuItems];
    setCustomMenuItems(updatedCustom);
    localStorage.setItem('brn_custom_items', JSON.stringify(updatedCustom));

    if (newItem.image) {
      const updatedImages = { ...customImages, [newItem.id]: newItem.image };
      setCustomImages(updatedImages);
      localStorage.setItem('brn_custom_images', JSON.stringify(updatedImages));
    }

    await saveMenuItemsConfig(deletedMenuItems, updatedCustom, modifiedMenuItems);
  };

  // Update Existing / Custom Menu Item Handler
  const handleUpdateMenuItem = async (updatedItem: MenuItem) => {
    const isCustom = customMenuItems.some((ci) => ci.id === updatedItem.id);
    let updatedCustom = customMenuItems;
    let updatedModified = { ...modifiedMenuItems };

    if (isCustom) {
      updatedCustom = customMenuItems.map((ci) => (ci.id === updatedItem.id ? updatedItem : ci));
      setCustomMenuItems(updatedCustom);
      localStorage.setItem('brn_custom_items', JSON.stringify(updatedCustom));
    } else {
      updatedModified[updatedItem.id] = updatedItem;
      setModifiedMenuItems(updatedModified);
      localStorage.setItem('brn_modified_items', JSON.stringify(updatedModified));
    }

    if (updatedItem.image) {
      const updatedImages = { ...customImages, [updatedItem.id]: updatedItem.image };
      setCustomImages(updatedImages);
      localStorage.setItem('brn_custom_images', JSON.stringify(updatedImages));
    }

    await saveMenuItemsConfig(deletedMenuItems, updatedCustom, updatedModified);
  };

  // Delete Custom Menu Item Permanently
  const handleDeleteCustomMenuItem = async (itemId: string) => {
    const updatedCustom = customMenuItems.filter((ci) => ci.id !== itemId);
    const updatedDeleted = deletedMenuItems.filter((id) => id !== itemId);
    const updatedModified = { ...modifiedMenuItems };
    delete updatedModified[itemId];

    setCustomMenuItems(updatedCustom);
    setDeletedMenuItems(updatedDeleted);
    setModifiedMenuItems(updatedModified);
    localStorage.setItem('brn_custom_items', JSON.stringify(updatedCustom));
    localStorage.setItem('brn_deleted_items', JSON.stringify(updatedDeleted));
    localStorage.setItem('brn_modified_items', JSON.stringify(updatedModified));

    await saveMenuItemsConfig(updatedDeleted, updatedCustom, updatedModified);
  };

  // Reset Modified Item to original PDF brochure defaults
  const handleResetModifiedItem = async (itemId: string) => {
    const updatedModified = { ...modifiedMenuItems };
    delete updatedModified[itemId];
    setModifiedMenuItems(updatedModified);
    localStorage.setItem('brn_modified_items', JSON.stringify(updatedModified));
    await saveMenuItemsConfig(deletedMenuItems, customMenuItems, updatedModified);
  };

  const handleOpenImageUploader = (targetKey?: string) => {
    if (targetKey) setUploaderTargetKey(targetKey);
    setIsImageUploaderOpen(true);
  };

  const handleOpenAdminPanel = (targetKey?: string) => {
    if (targetKey) setAdminTargetKey(targetKey);
    setIsAdminPanelOpen(true);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: 'baking' | 'casserole_packed' | 'rider_assigned' | 'delivered') => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await setDoc(orderRef, { status }, { merge: true });
    } catch (err) {
      console.warn('Could not update order status in Firestore:', err);
    }
  };

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

  // Master list of all menu items (static + custom added + modified edits)
  const allMenuItems = useMemo(() => {
    // 1. Process base items, applying modifications if any
    const baseItems = MENU_ITEMS.map((item) => {
      const mod = modifiedMenuItems[item.id];
      if (mod) {
        return { ...item, ...mod, isEdited: true };
      }
      return item;
    });

    // 2. Process custom items, applying modifications if any
    const customItems = customMenuItems.map((item) => {
      const mod = modifiedMenuItems[item.id];
      if (mod) {
        return { ...item, ...mod, isCustom: true };
      }
      return { ...item, isCustom: true };
    });

    return [...baseItems, ...customItems];
  }, [modifiedMenuItems, customMenuItems]);

  const displayedMenuItems = allMenuItems
    .filter((item) => !deletedMenuItems.includes(item.id))
    .map((item) => ({
      ...item,
      image: customImages[item.id] || item.image
    }));

  const filteredItems = selectedCategory === 'all'
    ? displayedMenuItems
    : displayedMenuItems.filter((item) => item.category === selectedCategory);

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

          <div className="flex items-center gap-1.5">
            {/* Admin Panel Button */}
            <button
              id="topbar-admin-panel-btn"
              onClick={() => handleOpenAdminPanel()}
              className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 px-2 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm shadow-amber-500/20"
              title="এডমিন প্যানেল (ছবি আপলোড ও লাইভ অপারেশন)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-950" />
              <span className="text-[11px] font-black">এডমিন</span>
            </button>

            {/* PDF Image Manager */}
            <button
              onClick={() => handleOpenAdminPanel()}
              className="flex items-center gap-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 px-2 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
              title="PDF ব্রোশিওরের আসল ছবি আপলোড ও পরিবর্তন"
            >
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] font-black">ছবি</span>
            </button>

            {/* Android APK Button */}
            {!deletedSections.includes('apk_download_banner') && (
              <button
                onClick={() => setIsAndroidModalOpen(true)}
                className="flex items-center gap-1 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 px-2 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer"
                title="Android APK ডাউনলোড ও ইনস্টল"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="text-[11px] font-black">APK</span>
              </button>
            )}

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
          </div>
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
            {/* Express Delivery & Brochure Hero */}
            {!deletedSections.includes('kitchen_dispatch_info') && (
              <div className="bg-gradient-to-br from-amber-600/90 via-orange-600/90 to-stone-900 rounded-3xl text-white shadow-xl relative overflow-hidden border border-amber-500/30">
                <div className="relative h-44 w-full overflow-hidden">
                  <img 
                    src={BRN_BRAND_INFO.images.heroCombo} 
                    alt="Hot Roti & Dal" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-transparent" />
                  
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-stone-950/70 backdrop-blur-md text-amber-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-400/30">
                      <Clock className="w-3 h-3 text-amber-400" />
                      মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস
                    </span>
                    <button 
                      onClick={() => setActiveTab('services')}
                      className="text-[10px] font-bold bg-amber-500 text-stone-950 px-2 py-0.5 rounded-full flex items-center gap-0.5 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
                    >
                      <span>আমাদের ব্রোশিওর</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h2 className="text-lg font-black leading-tight text-white">
                      তাওয়া থেকে তাজা গরম রুটি <br />
                      <span className="text-amber-300">১৫ মিনিটে</span> আপনার দরজায়!
                    </h2>
                    <p className="text-xs text-stone-200 mt-1 line-clamp-2">
                      {BRN_BRAND_INFO.mottoBn} — সকাল-সন্ধ্যার ঝামেলাহীন স্বস্তিতে স্বাগতম।
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-stone-950/80 border-t border-stone-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-[11px]">স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক</span>
                  </div>
                  <span className="text-[11px] font-bold text-amber-400">সর্বোচ্চ ২ কিমি</span>
                </div>
              </div>
            )}

            {/* Signature Brochure Quick Offers */}
            {!deletedSections.includes('quick_offers') && (
              <div className="grid grid-cols-2 gap-2">
                {/* Offer 1: 4 Bangla Roti for 35 Tk */}
                <div 
                  onClick={() => {
                    const rutiItem = MENU_ITEMS.find(i => i.id === 'ruti-regular');
                    if (rutiItem) handleAddToCart(rutiItem);
                  }}
                  className="bg-stone-850 hover:bg-stone-800 border border-amber-500/30 hover:border-amber-400 rounded-2xl p-2.5 cursor-pointer transition-all flex items-center gap-2 shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-700">
                    <img 
                      src={customImages['bangla-ruti-4pack'] || '/images/pdf_bangla_ruti.png'} 
                      alt="Bangla Roti" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black bg-amber-500 text-stone-950 px-1.5 py-0.2 rounded inline-block">
                      অফার
                    </span>
                    <h4 className="text-xs font-bold text-white truncate mt-0.5">৪টি রুটি ৩৫৳</h4>
                    <span className="text-[10px] text-amber-400 font-bold block">+ ১-ট্যাপে যোগ</span>
                  </div>
                </div>

                {/* Offer 2: Roti + Dal Combo */}
                <div 
                  onClick={() => {
                    const comboItem = MENU_ITEMS.find(i => i.id === 'combo-breakfast');
                    if (comboItem) handleAddToCart(comboItem);
                  }}
                  className="bg-stone-850 hover:bg-stone-800 border border-emerald-500/30 hover:border-emerald-400 rounded-2xl p-2.5 cursor-pointer transition-all flex items-center gap-2 shadow-sm group"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-700">
                    <img 
                      src={BRN_BRAND_INFO.images.heroCombo} 
                      alt="Roti Dal Combo" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] font-black bg-emerald-500 text-stone-950 px-1.5 py-0.2 rounded inline-block">
                      কম্বো
                    </span>
                    <h4 className="text-xs font-bold text-white truncate mt-0.5">রুটি + ডাল ৬০৳</h4>
                    <span className="text-[10px] text-emerald-400 font-bold block">+ ১-ট্যাপে যোগ</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter Horizontal Scroll */}
            {!deletedSections.includes('category_pills') && (
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
            )}

            {/* Menu Items List with Food Images & Nutrition Trigger */}
            {!deletedSections.includes('menu_grid') ? (
              <div className="space-y-3">
                {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);

                return (
                  <div
                    key={item.id}
                    className="bg-stone-850 border border-stone-750 rounded-2xl p-3 flex gap-3 hover:border-amber-500/40 transition-all shadow-sm group"
                  >
                    {/* Item Image with click to view details */}
                    <div 
                      onClick={() => setSelectedItemForDetails(item)}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 relative bg-stone-900 border border-stone-700 cursor-pointer shadow-inner"
                    >
                      {item.image ? (
                        <img 
                          src={item.image} 
                          alt={item.nameBn} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-600">
                          <Flame className="w-8 h-8 text-amber-500/40" />
                        </div>
                      )}
                      {item.badge && (
                        <span className="absolute top-1 left-1 text-[8px] font-black bg-stone-950/80 backdrop-blur-xs text-amber-300 px-1.5 py-0.5 rounded shadow">
                          {item.badge}
                        </span>
                      )}

                      {/* Quick change image button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenImageUploader(item.id);
                        }}
                        className="absolute bottom-1 right-1 bg-stone-950/85 hover:bg-stone-900 text-stone-300 hover:text-white p-1 rounded-lg border border-stone-700/60 shadow text-[9px] flex items-center justify-center cursor-pointer transition-colors"
                        title="PDF ব্রোশিওরের ছবি দিন"
                      >
                        <Camera className="w-2.5 h-2.5 text-amber-400" />
                      </button>
                    </div>

                    {/* Item Info */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-[10px] text-stone-400 flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5 text-amber-400" />
                            {item.prepTimeMinutes} মি.
                          </span>
                          {item.nutritionFacts?.energy && (
                            <span className="text-[10px] text-stone-400">
                              • {item.nutritionFacts.energy}
                            </span>
                          )}
                        </div>

                        <h3 
                          onClick={() => setSelectedItemForDetails(item)}
                          className="font-extrabold text-sm text-stone-100 truncate cursor-pointer hover:text-amber-400 transition-colors"
                        >
                          {item.nameBn}
                        </h3>

                        {item.taglineBn ? (
                          <p className="text-[11px] text-amber-400/90 line-clamp-1 font-medium">
                            {item.taglineBn}
                          </p>
                        ) : (
                          <p className="text-[11px] text-stone-400 line-clamp-1">
                            {item.descriptionBn}
                          </p>
                        )}
                      </div>

                      {/* Bottom row: Price, Nutrition button, and Stepper */}
                      <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-stone-800">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-sm font-black text-amber-400">৳{item.price}</span>
                            <span className="text-[10px] text-stone-400">/{item.unitBn}</span>
                          </div>
                          {/* Quick trigger for nutrition / brochure info */}
                          <button
                            onClick={() => setSelectedItemForDetails(item)}
                            className="text-[9px] text-stone-400 hover:text-amber-400 font-medium underline underline-offset-2 flex items-center gap-0.5 cursor-pointer"
                          >
                            উপাদান ও পুষ্টিগুণ ℹ️
                          </button>
                        </div>

                        {/* Stepper / Add button */}
                        <div className="shrink-0">
                          {qty === 0 ? (
                            <button
                              onClick={() => handleAddToCart(item)}
                              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-2.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>যোগ</span>
                            </button>
                          ) : (
                            <div className="flex items-center gap-1 bg-stone-900 border border-amber-500/50 rounded-xl p-0.5">
                              <button
                                onClick={() => handleUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 rounded-lg bg-stone-800 hover:bg-stone-750 text-white flex items-center justify-center font-black active:scale-95 transition-all cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-4 text-center text-xs font-black text-amber-400">
                                {qty}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center font-black active:scale-95 transition-all cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center bg-stone-850/50 rounded-2xl border border-stone-800 my-4 space-y-2">
              <p className="text-xs text-stone-400">মেনু সেকশনটি এডমিন কর্তৃক সাময়িকভাবে লুকানো হয়েছে।</p>
              <button
                onClick={() => handleToggleSection('menu_grid', false)}
                className="text-xs text-amber-400 font-bold hover:underline cursor-pointer"
              >
                এডমিন: মেনু পুনরায় চালু করুন
              </button>
            </div>
          )}
          </div>
        )}

        {/* TAB: OUR SERVICES & BROCHURE STORY */}
        {activeTab === 'services' && (
          <div className="p-3">
            {!deletedSections.includes('services_brochure') ? (
              <ServicesBrochureSection 
                onOrderNow={() => setActiveTab('menu')}
                onCallHotline={() => {}}
                customImages={customImages}
                onOpenImageUploader={handleOpenAdminPanel}
              />
            ) : (
              <div className="py-16 text-center space-y-3 bg-stone-850/50 rounded-2xl border border-stone-800 p-6 my-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-stone-500">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-black text-base text-white">সেবা ও ব্রোশিওর সেকশনটি বন্ধ রাখা হয়েছে</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  এডমিন কন্ট্রোল প্যানেল থেকে এই সেকশনটি সাময়িকভাবে বন্ধ বা ডিলিট করা হয়েছে।
                </p>
                <button
                  onClick={() => handleToggleSection('services_brochure', false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all cursor-pointer"
                >
                  এডমিন: সেকশনটি রিস্টোর করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: LIVE ORDER TRACKER */}
        {activeTab === 'tracker' && (
          <div className="p-3 space-y-4">
            {!deletedSections.includes('order_tracker') ? (
              activeOrder ? (
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
            )
          ) : (
              <div className="py-16 text-center space-y-3 bg-stone-850/50 rounded-2xl border border-stone-800 p-6 my-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-stone-500">
                  <Bike className="w-8 h-8" />
                </div>
                <h3 className="font-black text-base text-white">লাইভ ট্র্যাকিং সেকশনটি বন্ধ রাখা হয়েছে</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  এডমিন কন্ট্রোল প্যানেল থেকে এই সেকশনটি সাময়িকভাবে বন্ধ বা ডিলিট করা হয়েছে।
                </p>
                <button
                  onClick={() => handleToggleSection('order_tracker', false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all cursor-pointer"
                >
                  এডমিন: সেকশনটি রিস্টোর করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WALLET (bKash & Nagad) */}
        {activeTab === 'wallet' && (
          <div className="p-3 space-y-4">
            {!deletedSections.includes('wallet_section') ? (
              <>
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
              </>
            ) : (
              <div className="py-16 text-center space-y-3 bg-stone-850/50 rounded-2xl border border-stone-800 p-6 my-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-stone-500">
                  <Wallet className="w-8 h-8" />
                </div>
                <h3 className="font-black text-base text-white">ওয়ালেট সেকশনটি বন্ধ রাখা হয়েছে</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  এডমিন কন্ট্রোল প্যানেল থেকে এই সেকশনটি সাময়িকভাবে বন্ধ বা ডিলিট করা হয়েছে।
                </p>
                <button
                  onClick={() => handleToggleSection('wallet_section', false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all cursor-pointer"
                >
                  এডমিন: সেকশনটি রিস্টোর করুন
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MIRPUR 11 & 12 2KM ZONE */}
        {activeTab === 'zone' && (
          <div className="p-3 space-y-4">
            {!deletedSections.includes('delivery_zone_map') ? (
              <>
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

                {/* Android APK Download Banner */}
                {!deletedSections.includes('apk_download_banner') && (
                  <div 
                    onClick={() => setIsAndroidModalOpen(true)}
                    className="p-3.5 bg-gradient-to-r from-emerald-950/80 via-stone-850 to-stone-900 rounded-2xl border border-emerald-500/40 flex items-center justify-between text-xs cursor-pointer hover:border-emerald-400 transition-all shadow-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center font-black">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-white text-xs">Android APK ও অ্যাপ ইন্সটল</div>
                        <div className="text-[10px] text-emerald-400">১-ট্যাপে ইন্সটল বা সরাসরি APK তৈরি করুন</div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-lg text-[11px] shrink-0">
                      ওপেন করুন
                    </span>
                  </div>
                )}

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
              </>
            ) : (
              <div className="py-16 text-center space-y-3 bg-stone-850/50 rounded-2xl border border-stone-800 p-6 my-4">
                <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-stone-500">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-black text-base text-white">ডেলিভারি জোন সেকশনটি বন্ধ রাখা হয়েছে</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  এডমিন কন্ট্রোল প্যানেল থেকে এই সেকশনটি সাময়িকভাবে বন্ধ বা ডিলিট করা হয়েছে।
                </p>
                <button
                  onClick={() => handleToggleSection('delivery_zone_map', false)}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all cursor-pointer"
                >
                  এডমিন: সেকশনটি রিস্টোর করুন
                </button>
              </div>
            )}
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
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 z-30 w-full max-w-md bg-stone-950/95 backdrop-blur-lg border-t border-stone-800 px-1.5 py-2 flex items-center justify-around shadow-2xl">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'menu' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Flame className="w-5 h-5" />
            <span className="text-[10px]">মেনু</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'services' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px]">সেবা সমূহ</span>
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl relative transition-all cursor-pointer ${
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
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'wallet' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px]">ওয়ালেট</span>
          </button>

          <button
            onClick={() => setActiveTab('zone')}
            className={`flex flex-col items-center gap-1 py-1 px-2 rounded-xl transition-all cursor-pointer ${
              activeTab === 'zone' ? 'text-amber-400 font-bold' : 'text-stone-500 hover:text-stone-300'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px]">এলাকা</span>
          </button>

          <button
            onClick={() => handleOpenAdminPanel()}
            className="flex flex-col items-center gap-1 py-1 px-2 rounded-xl text-amber-500/80 hover:text-amber-400 transition-all cursor-pointer"
            title="এডমিন প্যানেল"
          >
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <span className="text-[10px] font-bold text-amber-300">এডমিন</span>
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

        {/* Android APK & Install Modal */}
        <AndroidApkModal
          isOpen={isAndroidModalOpen}
          onClose={() => setIsAndroidModalOpen(false)}
          isBn={true}
        />

        {/* Item Details & Nutrition Facts Modal */}
        <ItemDetailsModal
          item={selectedItemForDetails ? {
            ...selectedItemForDetails,
            image: customImages[selectedItemForDetails.id] || selectedItemForDetails.image
          } : null}
          onClose={() => setSelectedItemForDetails(null)}
          onAddToCart={handleAddToCart}
          onOpenImageUploader={handleOpenAdminPanel}
        />

        {/* PDF Brochure Image Uploader & Manager Modal */}
        <ImageUploaderModal
          isOpen={isImageUploaderOpen}
          onClose={() => {
            setIsImageUploaderOpen(false);
            setUploaderTargetKey(null);
          }}
          menuItems={displayedMenuItems}
          customImages={customImages}
          onUpdateImage={handleUpdateCustomImage}
          onResetImage={handleResetCustomImage}
          onResetAll={handleResetAllCustomImages}
          targetKey={uploaderTargetKey}
        />

        {/* BRN Admin Control Panel Modal */}
        <AdminPanelModal
          isOpen={isAdminPanelOpen}
          onClose={() => {
            setIsAdminPanelOpen(false);
            setAdminTargetKey(null);
          }}
          customImages={customImages}
          onUpdateImage={handleUpdateCustomImage}
          onResetImage={handleResetCustomImage}
          onResetAllImages={handleResetAllCustomImages}
          adminUserEmail="md.shakhaoathossain@gmail.com"
          initialTargetKey={adminTargetKey}
          orders={liveOrders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          deletedSections={deletedSections}
          onToggleSection={handleToggleSection}
          onRestoreAllSections={handleRestoreAllSections}
          deletedMenuItems={deletedMenuItems}
          onToggleMenuItem={handleToggleMenuItem}
          onRestoreAllMenuItems={handleRestoreAllMenuItems}
          menuItems={allMenuItems}
          onAddMenuItem={handleAddMenuItem}
          onUpdateMenuItem={handleUpdateMenuItem}
          onDeleteCustomMenuItem={handleDeleteCustomMenuItem}
          onResetModifiedItem={handleResetModifiedItem}
        />

      </div>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Check, 
  RotateCcw, 
  Sparkles, 
  Lock, 
  KeyRound, 
  ShieldCheck, 
  Image as ImageIcon, 
  Sliders, 
  ShoppingBag, 
  Truck, 
  Flame, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Eye, 
  EyeOff,
  ExternalLink,
  Layers,
  Save,
  CheckCheck,
  Trash2,
  Clock,
  MapPin,
  LayoutGrid,
  AlertTriangle,
  PlusCircle,
  Undo2,
  Edit3,
  Plus,
  Camera,
  Trash
} from 'lucide-react';
import { BRN_BRAND_INFO, MENU_ITEMS } from '../data/menu';
import { CustomImagesMap } from './ImageUploaderModal';
import { MenuItem, QuickOfferItem, HeaderConfig, HeroBannerConfig } from '../types';
import { EditMenuItemModal } from './EditMenuItemModal';
import { EditOfferModal } from './EditOfferModal';
import { EditHeroBannerModal } from './EditHeroBannerModal';

export interface StoreSectionDef {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'storefront' | 'feature' | 'info';
  descriptionBn: string;
  iconName: 'sparkles' | 'filter' | 'flame' | 'layers' | 'clock' | 'truck' | 'wallet' | 'map' | 'apk';
}

export const STORE_SECTIONS: StoreSectionDef[] = [
  {
    id: 'quick_offers',
    nameBn: 'কুইক অফার ব্যানার (Quick Offers)',
    nameEn: 'Top Quick Offer Cards',
    category: 'storefront',
    descriptionBn: 'হোম স্ক্রিনের একদম উপরে ৪টি রুটি ৩৫৳ ও স্পেশাল হট কম্বো অফার কার্ড',
    iconName: 'sparkles'
  },
  {
    id: 'category_pills',
    nameBn: 'খাবার ক্যাটাগরি ফিল্টার (Category Pills)',
    nameEn: 'Menu Category Tabs',
    category: 'storefront',
    descriptionBn: 'ফুলকো রুটি, পরোটা, ডাল ও তরকারি ইত্যাদি ক্যাটাগরি নির্বাচন বাটন',
    iconName: 'filter'
  },
  {
    id: 'menu_grid',
    nameBn: 'মূল খাবার মেনু তালিকা (Main Food Menu)',
    nameEn: 'Food Items Cards & Add to Cart',
    category: 'storefront',
    descriptionBn: 'গ্রাহকদের পছন্দের সকল রুটি ও তরকারির কার্ড, মূল্য ও অর্ডার বাটন',
    iconName: 'flame'
  },
  {
    id: 'services_brochure',
    nameBn: 'ব্রোশিওর ও কারখানা পরিচিতি (Services & Factory)',
    nameEn: 'Our Services & Brochure Section',
    category: 'feature',
    descriptionBn: 'অটোমেটিক মেশিন, কারখানা স্বাস্থ্যবিধি ও পরিবারের স্বাস্থ্যসম্মত গল্প',
    iconName: 'layers'
  },
  {
    id: 'kitchen_dispatch_info',
    nameBn: '১৫ মিনিট এক্সপ্রেস হিরো ব্যানার (15-Min Express Hero)',
    nameEn: '15-Min Delivery Hero Banner',
    category: 'storefront',
    descriptionBn: 'হোম স্ক্রিনের মূল তাওয়া থেকে তাজা গরম রুটি ১৫ মিনিটে ডেলিভারি হিরো ব্যানার',
    iconName: 'clock'
  },
  {
    id: 'order_tracker',
    nameBn: 'লাইভ অর্ডার ট্র্যাকার (Live Order Tracker)',
    nameEn: 'Live 15-Minute Delivery Tracker',
    category: 'feature',
    descriptionBn: 'অর্ডার দেওয়ার পর লাইভ কাউন্টডাউন ও রাইডারের রিয়েল-টাইম অবস্থান',
    iconName: 'truck'
  },
  {
    id: 'wallet_section',
    nameBn: 'ডিজিটাল ওয়ালেট ও রিচার্জ (In-App Wallet)',
    nameEn: 'bKash & Nagad In-App Wallet',
    category: 'feature',
    descriptionBn: 'ইন-অ্যাপ ওয়ালেট ব্যালেন্স এবং বিকাশ/নগদ দিয়ে ওয়ালেট রিচার্জ সুবিধা',
    iconName: 'wallet'
  },
  {
    id: 'delivery_zone_map',
    nameBn: 'মিরপুর ডেলিভারি জোন (Delivery Zone Map)',
    nameEn: 'Mirpur 11 & 12 Delivery Coverage',
    category: 'info',
    descriptionBn: 'মিরপুর ১১ ও ১২ এলাকার সুনির্দিষ্ট অলিগলি নির্বাচন ও ২ কিমি এরিয়া ট্র্যাকিং',
    iconName: 'map'
  },
  {
    id: 'apk_download_banner',
    nameBn: 'অ্যান্ড্রয়েড APK ডাউনলোড বাটন (Android APK Button)',
    nameEn: 'Android APK Modal & Direct Download',
    category: 'feature',
    descriptionBn: 'হেডারে সরাসরি Android APK ফাইল ডাউনলোড ও মোবাইলে ইনস্টল নির্দেশিকা',
    iconName: 'apk'
  }
];

export interface ImageManageItem {
  key: string;
  titleBn: string;
  titleEn: string;
  category: 'ruti' | 'curry' | 'combos' | 'brand';
  price?: number;
  defaultImg: string;
  descriptionBn: string;
  isBrandAsset?: boolean;
}

export const ADMIN_IMAGE_CATALOG: ImageManageItem[] = [
  {
    key: 'bangla-ruti-4pack',
    titleBn: '৪টি বাংলা রুটি স্পেশাল প্যাক',
    titleEn: 'Bangla Roti 4-Pack (Brochure Special)',
    category: 'ruti',
    price: 35,
    defaultImg: '/images/pdf_bangla_ruti.png',
    descriptionBn: 'ব্রোশিওরের মূল কভার পেজের তাজা নরম মেশিনমেড বাংলা রুটি (মাত্র ৩৫৳ স্পেশাল)'
  },
  {
    key: 'roti-booter-dal-combo',
    titleBn: 'গরম রুটি + বুটের ডাল কম্বো',
    titleEn: 'Hot Roti + Booter Dal Combo',
    category: 'combos',
    price: 65,
    defaultImg: '/images/pdf_roti_dal_combo.png',
    descriptionBn: 'গৃহিণীর নির্ঝঞ্ঝাট সকাল-সন্ধ্যা ফুলকো রুটি ও ডাল কম্বো প্যাক'
  },
  {
    key: 'diafit-roti',
    titleBn: 'DiaFit Roti (ডায়াফিট রুটি)',
    titleEn: 'DiaFit Diabetic Friendly Roti',
    category: 'ruti',
    price: 18,
    defaultImg: '/images/pdf_diafit_roti.png',
    descriptionBn: 'Low GI, ওটস, বার্লি, তিসি, শিয়া সীড সমৃদ্ধ সুগার ফ্রেন্ডলি ফর্মুলা'
  },
  {
    key: 'youngfuel-roti',
    titleBn: 'YoungFuel Roti (ইয়াংফুয়েল রুটি)',
    titleEn: 'YoungFuel High Protein Energy Roti',
    category: 'ruti',
    price: 20,
    defaultImg: '/images/pdf_youngfuel_roti.png',
    descriptionBn: 'উচ্চ প্রোটিন, ছোলা, পিনাট ও ওটস সমৃদ্ধ এনার্জি বুস্টার'
  },
  {
    key: 'rice-flour-roti',
    titleBn: 'চালের আটার রুটি (Rice Flour Roti)',
    titleEn: 'Rice Flour Gluten Free Roti',
    category: 'ruti',
    price: 16,
    defaultImg: '/images/pdf_rice_flour_roti.png',
    descriptionBn: '১০০% গ্লুটেন ফ্রি, পেটে হালকা ও হজমে চমৎকার সাদা নরম চালের রুটি'
  },
  {
    key: 'spice-kalai-roti',
    titleBn: 'চাঁপাইনবাবগঞ্জের কলাই রুটি',
    titleEn: 'Chapainawabganj Spice Kalai Roti',
    category: 'ruti',
    price: 22,
    defaultImg: '/images/pdf_kalai_roti.png',
    descriptionBn: '২৫% প্রাকৃতিক প্রোটিন সমৃদ্ধ খাঁটি মাষকলাইয়ের ঐতিহ্যবাহী রুটি'
  },
  {
    key: 'shahi-paratha',
    titleBn: 'সাদ্দাক সিগনেচার পরোটা',
    titleEn: 'Shaddak Signature Paratha',
    category: 'ruti',
    price: 25,
    defaultImg: '/images/pdf_saddak_paratha.png',
    descriptionBn: 'খাঁটি গাওয়া ঘি ও উন্নত তেলে ভাজা মচমচে লেয়ার পরোটা (বনস্পতি মুক্ত)'
  },
  {
    key: 'deshi-booter-dal',
    titleBn: 'ঘরোয়া স্পেশাল বুটের ডাল বাগার',
    titleEn: 'Homestyle Booter Dal Bagar',
    category: 'curry',
    price: 40,
    defaultImg: '/images/pdf_roti_dal_combo.png',
    descriptionBn: 'জিরা, তেজপাতা ও শুকনা মরিচের আসল বাগার দেওয়া ঘন বুটের ডাল'
  },
  {
    key: 'alu-sobji-torkari',
    titleBn: 'পাঁচফোড়ন কাশ্মীরি আলু ভাজি / দম',
    titleEn: 'Kashmiri Alur Dom & Potato Curry',
    category: 'curry',
    price: 35,
    defaultImg: '/images/pdf_alur_dom.png',
    descriptionBn: 'পাঁচফোড়ন ও মেথি পাতা দিয়ে কষানো কাশ্মীরি ঘরোয়া আলুর দম'
  },
  {
    key: 'shahi-beef-kolija',
    titleBn: 'শাহী গরুর কলিজা ভুনা',
    titleEn: 'Shahi Beef Liver Bhuna',
    category: 'curry',
    price: 95,
    defaultImg: '/images/pdf_alur_dom.png',
    descriptionBn: 'গরম মসলা ও পেঁয়াজে কষানো সুস্বাদু কলিজা ভুনা'
  },
  {
    key: 'dim-porota',
    titleBn: 'স্পেশাল ডিম পরোটা রোল',
    titleEn: 'Special Egg Paratha Roll',
    category: 'combos',
    price: 45,
    defaultImg: '/images/pdf_saddak_paratha.png',
    descriptionBn: 'দেশি ডিম, কুচানো পেঁয়াজ ও কাঁচামরিচে ভাজা গরম গরম পরোটা রোল'
  },
  {
    key: 'dim-vaji',
    titleBn: 'দেশি ডিম ভাজি (কাঁচামরিচ-পেঁয়াজ)',
    titleEn: 'Desi Egg Omelette',
    category: 'curry',
    price: 25,
    defaultImg: '/images/pdf_youngfuel_roti.png',
    descriptionBn: 'কুচানো দেশি পেঁয়াজ ও কাঁচামরিচ দিয়ে মচমচে ডিম ভাজা'
  },
  {
    key: 'nolen-gurer-cha',
    titleBn: 'খাঁটি নলেন গুড়ের স্পেশাল মালাই চা',
    titleEn: 'Nolen Gur Malai Milk Tea',
    category: 'curry',
    price: 30,
    defaultImg: '/images/pdf_shahi_cha.png',
    descriptionBn: 'খেজুরের খাঁটি নলেন গুড় ও ঘন দুধের শাহী মালাই চা'
  },
  {
    key: 'brand_machine',
    titleBn: 'স্বয়ংক্রিয় রুটি তৈরির মেশিন (কারখানা)',
    titleEn: 'Automated Roti Making Machine (Factory)',
    category: 'brand',
    defaultImg: '/images/pdf_machine_production.png',
    descriptionBn: 'হাই-টেক সেন্ট্রাল কিচেনের রোবোটিক রুটি মেকার ও অটোমেশন লাইন',
    isBrandAsset: true
  },
  {
    key: 'brand_rider',
    titleBn: 'নিজস্ব ডেলিভারি রাইডার ও থার্মাল ব্যাগ',
    titleEn: 'Dedicated Delivery Rider & Thermal Bag',
    category: 'brand',
    defaultImg: '/images/pdf_delivery_rider.png',
    descriptionBn: '১৫ মিনিটে গরম রাখার থার্মাল ব্যাগসহ নিজস্ব দ্রুতগামী বাইক রাইডার',
    isBrandAsset: true
  },
  {
    key: 'brand_family',
    titleBn: 'পারিবারিক স্বাস্থ্যসম্মত নাস্তা',
    titleEn: 'Hygienic Family Dining Table',
    category: 'brand',
    defaultImg: '/images/pdf_family_breakfast.png',
    descriptionBn: 'সকাল-সন্ধ্যার ডাইনিং টেবিলে পরিবারের স্বাস্থ্যসম্মত আহার',
    isBrandAsset: true
  }
];

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImages: CustomImagesMap;
  onUpdateImage: (key: string, dataUrl: string) => void | Promise<void>;
  onResetImage: (key: string) => void | Promise<void>;
  onResetAllImages: () => void | Promise<void>;
  adminUserEmail?: string;
  initialTargetKey?: string | null;
  orders?: Array<{
    id: string;
    customerPhone: string;
    customerAddress: string;
    zone: string;
    items: string;
    totalAmount: number;
    status: 'baking' | 'casserole_packed' | 'rider_assigned' | 'delivered';
    createdAt: string;
  }>;
  onUpdateOrderStatus?: (orderId: string, status: 'baking' | 'casserole_packed' | 'rider_assigned' | 'delivered') => void;
  deletedSections?: string[];
  onToggleSection?: (sectionId: string, deleted: boolean) => void | Promise<void>;
  onRestoreAllSections?: () => void | Promise<void>;
  deletedMenuItems?: string[];
  onToggleMenuItem?: (itemId: string, deleted: boolean) => void | Promise<void>;
  onRestoreAllMenuItems?: () => void | Promise<void>;
  menuItems?: MenuItem[];
  onAddMenuItem?: (item: MenuItem) => void | Promise<void>;
  onUpdateMenuItem?: (item: MenuItem) => void | Promise<void>;
  onDeleteCustomMenuItem?: (itemId: string) => void | Promise<void>;
  onResetModifiedItem?: (itemId: string) => void | Promise<void>;
  // Header & Logo Management
  headerConfig?: HeaderConfig;
  onUpdateHeaderConfig?: (config: HeaderConfig) => void | Promise<void>;
  onResetHeaderConfig?: () => void | Promise<void>;
  // Offer Section Management
  quickOffers?: QuickOfferItem[];
  onAddQuickOffer?: (offer: QuickOfferItem) => void | Promise<void>;
  onUpdateQuickOffer?: (offer: QuickOfferItem) => void | Promise<void>;
  onDeleteQuickOffer?: (offerId: string) => void | Promise<void>;
  onToggleQuickOfferActive?: (offerId: string, isActive: boolean) => void | Promise<void>;
  onResetQuickOffers?: () => void | Promise<void>;
  // Hero Banner Section Management
  heroBannerConfig?: HeroBannerConfig;
  onUpdateHeroBannerConfig?: (config: HeroBannerConfig) => void | Promise<void>;
  onResetHeroBannerConfig?: () => void | Promise<void>;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  customImages,
  onUpdateImage,
  onResetImage,
  onResetAllImages,
  adminUserEmail = 'md.shakhaoathossain@gmail.com',
  initialTargetKey,
  orders = [],
  onUpdateOrderStatus,
  deletedSections = [],
  onToggleSection,
  onRestoreAllSections,
  deletedMenuItems = [],
  onToggleMenuItem,
  onRestoreAllMenuItems,
  menuItems = MENU_ITEMS,
  onAddMenuItem,
  onUpdateMenuItem,
  onDeleteCustomMenuItem,
  onResetModifiedItem,
  headerConfig,
  onUpdateHeaderConfig,
  onResetHeaderConfig,
  quickOffers = [],
  onAddQuickOffer,
  onUpdateQuickOffer,
  onDeleteQuickOffer,
  onToggleQuickOfferActive,
  onResetQuickOffers,
  heroBannerConfig,
  onUpdateHeroBannerConfig,
  onResetHeroBannerConfig
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('brn_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Tab: 'sections' | 'images' | 'items' | 'offers' | 'header' | 'orders' | 'settings'
  const [activeTab, setActiveTab] = useState<'sections' | 'images' | 'items' | 'offers' | 'header' | 'orders' | 'settings'>('sections');

  // Image Uploading State
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'ruti' | 'curry' | 'combos' | 'brand'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectionSearch, setSectionSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [itemCategoryFilter, setItemCategoryFilter] = useState<string>('all');
  const [itemStatusFilter, setItemStatusFilter] = useState<'all' | 'active' | 'deleted'>('all');
  
  // Add / Edit Food Item Modal State
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState<boolean>(false);
  const [itemBeingEdited, setItemBeingEdited] = useState<MenuItem | null>(null);

  // Add / Edit Quick Offer Modal State
  const [isEditOfferModalOpen, setIsEditOfferModalOpen] = useState<boolean>(false);
  const [offerBeingEdited, setOfferBeingEdited] = useState<QuickOfferItem | null>(null);

  // Add / Edit Hero Banner Modal State
  const [isEditHeroModalOpen, setIsEditHeroModalOpen] = useState<boolean>(false);

  // Header and Logo Edit State
  const [localHeaderConfig, setLocalHeaderConfig] = useState<HeaderConfig>(() => {
    return headerConfig || {
      logoTextBn: 'বাংলা রুটি',
      logoTagBn: 'BRN',
      logoIconType: 'flame',
      headerTaglineBn: 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস',
      showLocationPill: true,
      showWalletPill: true,
      showApkBtn: true,
      showHeaderAdminBtn: false,
      showHeaderImageBtn: false
    };
  });

  useEffect(() => {
    if (headerConfig) {
      setLocalHeaderConfig(headerConfig);
    }
  }, [headerConfig]);

  const [selectedItemKey, setSelectedItemKey] = useState<string>(initialTargetKey || 'bangla-ruti-4pack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Drag & drop highlight
  const [dragOverKey, setDragOverKey] = useState<string | null>(null);

  // Hidden File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetKey, setUploadTargetKey] = useState<string | null>(null);

  useEffect(() => {
    if (initialTargetKey) {
      setSelectedItemKey(initialTargetKey);
      setActiveTab('images');
    }
  }, [initialTargetKey]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Allow standard PIN '1234' or admin direct submit
    if (pinInput === '1234' || pinInput.trim() === '' || pinInput === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('brn_admin_auth', 'true');
      setAuthError(false);
      showToast(`স্বাগতম! এডমিন মোড সক্রিয় হয়েছে (${adminUserEmail})`);
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('brn_admin_auth');
    setPinInput('');
  };

  // Compress & Optimize Image File using HTML5 Canvas
  const processImageFile = (file: File, targetKey: string) => {
    if (!file.type.startsWith('image/')) {
      showToast('❌ অনুগ্রহ করে একটি ইমেজ ফাইল নির্বাচন করুন (JPEG, PNG, WEBP)');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (!result) {
        setIsProcessing(false);
        return;
      }

      const img = new Image();
      img.onload = async () => {
        try {
          const canvas = document.createElement('canvas');
          const maxDimension = 900;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
            await onUpdateImage(targetKey, optimizedDataUrl);
            
            if (targetKey === 'custom_logo_icon') {
              const updatedHeader: HeaderConfig = {
                ...localHeaderConfig,
                logoIconType: 'image',
                logoCustomImage: optimizedDataUrl
              };
              setLocalHeaderConfig(updatedHeader);
              if (onUpdateHeaderConfig) {
                await onUpdateHeaderConfig(updatedHeader);
              }
              showToast('✅ কাস্টম লোগো সফলভাবে আপলোড ও হেডারে যুক্ত হয়েছে!');
            } else {
              showToast('✅ ইমেজ সফলভাবে আপলোড ও ক্লাউডে সেভ হয়েছে!');
            }
          }
        } catch (err) {
          console.error(err);
          showToast('❌ ইমেজ প্রসেসিংয়ে সমস্যা হয়েছে');
        } finally {
          setIsProcessing(false);
        }
      };
      img.src = result;
    };

    reader.readAsDataURL(file);
  };

  const triggerUploadFor = (key: string) => {
    setUploadTargetKey(key);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && uploadTargetKey) {
      processImageFile(file, uploadTargetKey);
    }
  };

  const handleDrop = (e: React.DragEvent, key: string) => {
    e.preventDefault();
    setDragOverKey(null);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file, key);
    }
  };

  const renderSectionIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'filter': return <Filter className="w-5 h-5 text-orange-400" />;
      case 'flame': return <Flame className="w-5 h-5 text-red-400" />;
      case 'layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'clock': return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'truck': return <Truck className="w-5 h-5 text-sky-400" />;
      case 'wallet': return <ShoppingBag className="w-5 h-5 text-teal-400" />;
      case 'map': return <MapPin className="w-5 h-5 text-purple-400" />;
      case 'apk': return <ExternalLink className="w-5 h-5 text-emerald-400" />;
      default: return <LayoutGrid className="w-5 h-5 text-amber-400" />;
    }
  };

  // Filter Catalog
  const filteredCatalog = ADMIN_IMAGE_CATALOG.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter Sections
  const filteredSections = STORE_SECTIONS.filter((sec) => {
    return sec.nameBn.toLowerCase().includes(sectionSearch.toLowerCase()) ||
           sec.nameEn.toLowerCase().includes(sectionSearch.toLowerCase()) ||
           sec.descriptionBn.toLowerCase().includes(sectionSearch.toLowerCase());
  });

  // Filter Menu Items with Category, Status and Search
  const baseMenuItemsList = menuItems || MENU_ITEMS;
  const filteredMenuItems = baseMenuItemsList.filter((item) => {
    const q = itemSearch.toLowerCase().trim();
    const matchesSearch = !q ||
      item.nameBn.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      (item.taglineBn && item.taglineBn.toLowerCase().includes(q));

    const matchesCategory = itemCategoryFilter === 'all' || item.category === itemCategoryFilter;

    const isItemDeleted = deletedMenuItems.includes(item.id);
    const matchesStatus = 
      itemStatusFilter === 'all' ? true :
      itemStatusFilter === 'active' ? !isItemDeleted : isItemDeleted;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const activeMenuItemsCount = baseMenuItemsList.filter(item => !deletedMenuItems.includes(item.id)).length;
  const deletedMenuItemsCount = baseMenuItemsList.filter(item => deletedMenuItems.includes(item.id)).length;

  const handleSaveMenuItem = async (savedItem: MenuItem) => {
    if (itemBeingEdited) {
      if (onUpdateMenuItem) {
        await onUpdateMenuItem(savedItem);
        showToast(`✅ "${savedItem.nameBn}" এর তথ্য সফলভাবে আপডেট করা হয়েছে!`);
      }
    } else {
      if (onAddMenuItem) {
        await onAddMenuItem(savedItem);
        showToast(`✅ নতুন খাবার "${savedItem.nameBn}" সফলভাবে মেনুতে যুক্ত হয়েছে!`);
      }
    }
    setIsEditItemModalOpen(false);
    setItemBeingEdited(null);
  };

  const selectedItem = ADMIN_IMAGE_CATALOG.find(i => i.key === selectedItemKey) || ADMIN_IMAGE_CATALOG[0];
  const selectedLiveImg = customImages[selectedItem.key] || selectedItem.defaultImg;
  const isSelectedCustom = Boolean(customImages[selectedItem.key]);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept="image/*"
        className="hidden"
      />

      <div className="bg-stone-900 border border-amber-500/50 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl animate-scale-up text-stone-100 my-auto flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950/60 p-4 sm:p-5 border-b border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-extrabold shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  BRN এডমিন কন্ট্রোল প্যানেল
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/40 font-bold">
                  Super Admin
                </span>
              </div>
              <p className="text-xs text-stone-400">
                {adminUserEmail} • সেকশন ডিলিট, ইমেজ আপলোড ও লাইভ অপারেশন
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden sm:inline-flex text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded-lg border border-stone-750 hover:bg-stone-800 transition-all cursor-pointer"
              >
                লগআউট
              </button>
            )}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toast feedback */}
        {toastMessage && (
          <div className="bg-emerald-950/90 border-y border-emerald-500/50 text-emerald-200 text-xs font-bold px-4 py-2.5 flex items-center gap-2 animate-fade-in shrink-0">
            <CheckCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Login Gateway */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center space-y-6 max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black text-white">
                এডমিন অ্যাক্সেস যাচাইকরণ
              </h4>
              <p className="text-xs text-stone-400">
                মালিক হিসেবে সেকশন ডিলিট, ইমেজ আপলোড ও মেনু নিয়ন্ত্রণ করতে প্রবেশ করুন
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-3">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setAuthError(false);
                  }}
                  placeholder="এডমিন পিন দিন (অথবা সরাসরি ক্লিক করুন)"
                  className={`w-full bg-stone-850 border ${authError ? 'border-red-500' : 'border-stone-700'} rounded-2xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 placeholder:text-stone-500`}
                />
              </div>

              {authError && (
                <p className="text-xs text-red-400 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  ভুল পিন! পুনরায় চেষ্টা করুন (ডিফল্ট: 1234)
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition-all shadow-lg hover:shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>এডমিন প্যানেলে প্রবেশ করুন</span>
                <Check className="w-4 h-4" />
              </button>
            </form>

            <div className="bg-stone-850/80 border border-stone-800 rounded-2xl p-3 text-[11px] text-stone-400 w-full text-left">
              <span className="font-bold text-amber-300 block mb-0.5">💡 কুইক অ্যাক্সেস টিপ:</span>
              সরাসরি "এডমিন প্যানেলে প্রবেশ করুন" বাটনে ক্লিক করলেই অটো-অথরাইজেশন সক্রিয় হবে।
            </div>
          </div>
        ) : (
          /* Main Authenticated Admin Workspace */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="bg-stone-950 px-4 sm:px-6 pt-3 border-b border-stone-800 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {/* 1. SECTIONS DELETE & CONTROL TAB */}
                <button
                  onClick={() => setActiveTab('sections')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'sections'
                      ? 'bg-rose-500 text-white shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>সেকশন ডিলিট ও নিয়ন্ত্রণ</span>
                  {deletedSections.length > 0 && (
                    <span className="text-[10px] bg-black/40 text-rose-200 px-1.5 py-0.2 rounded-full font-black">
                      {deletedSections.length}টি ডিলিট
                    </span>
                  )}
                </button>

                {/* 2. IMAGE UPLOADER & PDF SYNC */}
                <button
                  onClick={() => setActiveTab('images')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'images'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>ইমেজ আপলোড ও ব্রোশিওর</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === 'images' ? 'bg-black/20 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                    {ADMIN_IMAGE_CATALOG.length}
                  </span>
                </button>

                {/* 3. MENU ITEMS ADD, EDIT & DELETE TAB */}
                <button
                  onClick={() => setActiveTab('items')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'items'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span>খাবার মেনু (Add/Edit)</span>
                  {deletedMenuItems.length > 0 ? (
                    <span className="text-[10px] bg-rose-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                      {deletedMenuItems.length}টি বন্ধ
                    </span>
                  ) : (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'items' ? 'bg-black/20 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                      {baseMenuItemsList.length}
                    </span>
                  )}
                </button>

                {/* 4. QUICK OFFERS & BANNER TAB (NEW) */}
                <button
                  onClick={() => setActiveTab('offers')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'offers'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>অফার সেকশন (Add/Edit)</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'offers' ? 'bg-black/20 text-stone-950' : 'bg-stone-800 text-stone-300'}`}>
                    {quickOffers.length}
                  </span>
                </button>

                {/* 5. LOGO & HEADER CONFIG TAB (NEW) */}
                <button
                  onClick={() => setActiveTab('header')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'header'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>লোগো ও হেডার নিয়ন্ত্রণ</span>
                </button>

                {/* 6. LIVE ORDERS TAB */}
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>লাইভ অর্ডার ({orders.length})</span>
                </button>

                {/* 7. SETTINGS TAB */}
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-amber-500 text-stone-950 shadow-md font-black'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800'
                  }`}
                >
                  <Sliders className="w-4 h-4" />
                  <span>সেটিংস</span>
                </button>
              </div>

              {/* Quick Actions based on tab */}
              {activeTab === 'sections' && deletedSections.length > 0 && onRestoreAllSections && (
                <button
                  onClick={async () => {
                    if (confirm('আপনি কি সকল ডিলিট করা সেকশন পুনরায় সক্রিয় করতে চান?')) {
                      await onRestoreAllSections();
                      showToast('🔄 সকল সেকশন পুনরায় সক্রিয় করা হয়েছে');
                    }
                  }}
                  className="hidden md:flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-xl border border-emerald-500/40 hover:bg-emerald-950/40 transition-all cursor-pointer shrink-0 pb-2"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  <span>সকল সেকশন রিস্টোর</span>
                </button>
              )}

              {activeTab === 'images' && (
                <button
                  onClick={async () => {
                    if (confirm('আপনি কি সব ছবি রিসেট করে ব্রোশিওরের মূল ছবিতে ফিরে যেতে চান?')) {
                      await onResetAllImages();
                      showToast('🔄 সকল ছবি মূল PDF ব্রোশিওর ডিফল্টে রিসেট করা হয়েছে');
                    }
                  }}
                  className="hidden md:flex items-center gap-1.5 text-xs text-stone-400 hover:text-rose-400 px-3 py-1.5 rounded-xl border border-stone-800 hover:border-rose-500/40 transition-all cursor-pointer shrink-0 pb-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>সব ছবি রিসেট</span>
                </button>
              )}
            </div>

            {/* TAB 1: SECTION MANAGER & DELETE CONTROL */}
            {activeTab === 'sections' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Information Header & Search Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-stone-850 p-4 rounded-2xl border border-stone-750">
                  <div className="space-y-1">
                    <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <Trash2 className="w-4 h-4 text-rose-400" />
                      <span>হোম পেজের যেকোনো সেকশন ডিলিট বা চালু করুন</span>
                    </h4>
                    <p className="text-xs text-stone-400">
                      যে সেকশনটি আপনি রাখতে চান না, 'ডিলিট করুন' বাটনে ক্লিক করলেই তা গ্রাহকদের স্ক্রিন থেকে অবিলম্বে মুছে যাবে।
                    </p>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={sectionSearch}
                      onChange={(e) => setSectionSearch(e.target.value)}
                      placeholder="সেকশন সার্চ করুন..."
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                {/* Section Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredSections.map((sec) => {
                    const isDeleted = deletedSections.includes(sec.id);

                    return (
                      <div
                        key={sec.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                          isDeleted
                            ? 'bg-rose-950/20 border-rose-500/40 opacity-75'
                            : 'bg-stone-850 border-stone-750 hover:border-stone-650'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                            isDeleted 
                              ? 'bg-rose-950/50 border-rose-500/40 text-rose-400' 
                              : 'bg-stone-900 border-stone-700 text-amber-400'
                          }`}>
                            {renderSectionIcon(sec.iconName)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <h5 className={`text-xs sm:text-sm font-black truncate ${isDeleted ? 'text-stone-400 line-through' : 'text-white'}`}>
                                {sec.nameBn}
                              </h5>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 border ${
                                isDeleted
                                  ? 'bg-rose-950 text-rose-300 border-rose-500/50'
                                  : 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                              }`}>
                                {isDeleted ? '🔴 ডিলিট করা হয়েছে' : '🟢 অ্যাপে সক্রিয়'}
                              </span>
                            </div>

                            <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                              {sec.descriptionBn}
                            </p>
                          </div>
                        </div>

                        {/* Control Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                          <span className="text-[11px] text-stone-500 font-mono">
                            ID: {sec.id}
                          </span>

                          <div className="flex items-center gap-2">
                            {sec.id === 'kitchen_dispatch_info' && (
                              <button
                                type="button"
                                onClick={() => setIsEditHeroModalOpen(true)}
                                className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                                title="ব্যানারের টেক্সট ও ছবি এডিট করুন"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-stone-950" />
                                <span>লেখা ও ছবি এডিট</span>
                              </button>
                            )}

                            {isDeleted ? (
                              <button
                                type="button"
                                onClick={async () => {
                                  if (onToggleSection) {
                                    await onToggleSection(sec.id, false);
                                    showToast(`✅ "${sec.nameBn}" পুনরায় অ্যাপে সক্রিয় করা হয়েছে`);
                                  }
                                }}
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                              >
                                <Undo2 className="w-3.5 h-3.5" />
                                <span>পুনরায় যোগ করুন (Restore)</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`আপনি কি "${sec.nameBn}" সেকশনটি গ্রাহকদের স্ক্রিন থেকে ডিলিট/হাইড করতে চান?`)) {
                                    if (onToggleSection) {
                                      await onToggleSection(sec.id, true);
                                      showToast(`🗑️ "${sec.nameBn}" সেকশনটি ডিলিট করা হয়েছে`);
                                    }
                                  }
                                }}
                                className="px-3 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/50 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span>সেকশন ডিলিট করুন</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Deleted status card summary */}
                <div className="bg-stone-850/80 border border-stone-750 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>
                      মোট ৯টি সেকশনের মধ্যে <strong>{STORE_SECTIONS.length - deletedSections.length}টি সক্রিয়</strong> এবং <strong>{deletedSections.length}টি ডিলিট করা</strong> রয়েছে।
                    </span>
                  </div>

                  {deletedSections.length > 0 && onRestoreAllSections && (
                    <button
                      onClick={async () => {
                        await onRestoreAllSections();
                        showToast('🔄 সকল সেকশন পুনরায় সক্রিয় করা হয়েছে');
                      }}
                      className="text-xs text-amber-400 hover:underline font-bold"
                    >
                      সবগুলো সেকশন একসাথে রিস্টোর করুন
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: IMAGE UPLOADER & PDF SYNC */}
            {activeTab === 'images' && (
              <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left Column: Interactive Catalog Grid */}
                <div className="lg:col-span-7 p-4 sm:p-5 overflow-y-auto space-y-4 border-r border-stone-800">
                  {/* Search & Filter Bar */}
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    <div className="relative w-full sm:flex-1">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="আইটেম সার্চ করুন (যেমন: বাংলা রুটি, ডায়াফিট)..."
                        className="w-full bg-stone-850 border border-stone-750 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                      {(['all', 'ruti', 'combos', 'curry', 'brand'] as const).map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategoryFilter(cat)}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                            categoryFilter === cat
                              ? 'bg-amber-500 text-stone-950 shadow-sm'
                              : 'bg-stone-800 text-stone-400 hover:text-white'
                          }`}
                        >
                          {cat === 'all' && 'সবগুলো'}
                          {cat === 'ruti' && 'রুটি ও পরোটা'}
                          {cat === 'combos' && 'কম্বো'}
                          {cat === 'curry' && 'ডাল ও ভাজি'}
                          {cat === 'brand' && 'ফ্যাক্টরি ও রাইডার'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Catalog Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {filteredCatalog.map((item) => {
                      const isSelected = item.key === selectedItemKey;
                      const hasCustom = Boolean(customImages[item.key]);
                      const currentImg = customImages[item.key] || item.defaultImg;
                      const isDragOver = dragOverKey === item.key;

                      return (
                        <div
                          key={item.key}
                          onClick={() => setSelectedItemKey(item.key)}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragOverKey(item.key);
                          }}
                          onDragLeave={() => setDragOverKey(null)}
                          onDrop={(e) => handleDrop(e, item.key)}
                          className={`p-3 rounded-2xl border transition-all cursor-pointer relative group flex flex-col justify-between gap-2.5 ${
                            isSelected
                              ? 'bg-amber-950/30 border-amber-500/80 ring-1 ring-amber-500/40'
                              : 'bg-stone-850/70 border-stone-750/80 hover:border-stone-600 hover:bg-stone-850'
                          } ${isDragOver ? 'border-dashed border-amber-400 bg-amber-950/50 scale-[1.01]' : ''}`}
                        >
                          <div className="flex items-start gap-2.5">
                            {/* Thumbnail */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/60 border border-stone-700 shrink-0 relative">
                              <img
                                src={currentImg}
                                alt={item.titleBn}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              {hasCustom && (
                                <span className="absolute bottom-0 inset-x-0 bg-emerald-600 text-white text-[8px] font-black text-center py-0.2">
                                  আপলোড
                                </span>
                              )}
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <h4 className="text-xs font-black text-white truncate">
                                  {item.titleBn}
                                </h4>
                              </div>
                              <p className="text-[10px] text-stone-400 line-clamp-1 mt-0.5">
                                {item.descriptionBn}
                              </p>
                              {item.price && (
                                <span className="text-[11px] font-extrabold text-amber-400 mt-1 block">
                                  {item.price} ৳
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-800/80">
                            <span className="text-[10px] text-stone-400">
                              {hasCustom ? (
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                  <Check className="w-3 h-3" /> কাস্টম
                                </span>
                              ) : (
                                <span className="text-stone-500">PDF আসল</span>
                              )}
                            </span>

                            <div className="flex items-center gap-1.5">
                              {hasCustom && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onResetImage(item.key);
                                    showToast('ডিফল্ট PDF ছবিতে রিস্টোর করা হয়েছে');
                                  }}
                                  className="px-2 py-1 rounded-lg text-[10px] font-bold text-stone-400 hover:text-rose-400 hover:bg-stone-800 transition-colors"
                                  title="রিসেট"
                                >
                                  রিসেট
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  triggerUploadFor(item.key);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 hover:text-stone-950 text-amber-300 font-black text-[10px] transition-all flex items-center gap-1 border border-amber-500/40"
                              >
                                <Upload className="w-3 h-3" />
                                <span>আপলোড</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right Column: Selected Item High-Def Workspace & Live Preview */}
                <div className="lg:col-span-5 p-4 sm:p-5 overflow-y-auto space-y-4 bg-stone-950/40">
                  <div className="bg-stone-850 border border-stone-750 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                          {selectedItem.category.toUpperCase()}
                        </span>
                        <h4 className="text-sm sm:text-base font-black text-white mt-1">
                          {selectedItem.titleBn}
                        </h4>
                        <p className="text-xs text-stone-400">
                          {selectedItem.titleEn}
                        </p>
                      </div>

                      {isSelectedCustom ? (
                        <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          আপলোড করা ইমেজ সক্রিয়
                        </span>
                      ) : (
                        <span className="text-[10px] bg-stone-800 border border-stone-700 text-stone-400 font-bold px-2 py-1 rounded-full">
                          ব্রোশিওরের মূল ছবি
                        </span>
                      )}
                    </div>

                    {/* Big Live Preview Box */}
                    <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden bg-black/80 border-2 border-stone-700 shadow-inner group">
                      <img
                        src={selectedLiveImg}
                        alt={selectedItem.titleBn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                        <span className="text-xs font-bold text-white">লাইভ শপ ও মডাল প্রিভিউ</span>
                        <span className="text-[10px] text-stone-300">কাস্টমাররা এই ছবিটি দেখতে পাবে</span>
                      </div>

                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-amber-300 border border-stone-700">
                        {isSelectedCustom ? 'কাস্টম ছবি' : 'PDF ডিফল্ট'}
                      </div>
                    </div>

                    {/* Drag & Drop Upload Zone */}
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOverKey(selectedItem.key);
                      }}
                      onDragLeave={() => setDragOverKey(null)}
                      onDrop={(e) => handleDrop(e, selectedItem.key)}
                      onClick={() => triggerUploadFor(selectedItem.key)}
                      className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                        dragOverKey === selectedItem.key
                          ? 'border-amber-400 bg-amber-950/50 scale-[1.01]'
                          : 'border-amber-500/40 bg-stone-900/80 hover:border-amber-400 hover:bg-stone-900'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto mb-2">
                        <Upload className="w-5 h-5 animate-bounce" />
                      </div>
                      <p className="text-xs font-bold text-white">
                        {selectedItem.titleBn}-এর নতুন ছবি আপলোড করুন
                      </p>
                      <p className="text-[11px] text-stone-400 mt-0.5">
                        ডিভাইস থেকে ফাইল নির্বাচন করতে ক্লিক করুন অথবা ড্র্যাগ & ড্রপ করুন
                      </p>
                      <span className="inline-block mt-2 text-[10px] bg-amber-500 text-stone-950 font-black px-3 py-1 rounded-lg shadow-sm">
                        কম্পিউটার/মোবাইল থেকে ছবি পছন্দ করুন
                      </span>
                    </div>

                    {/* Revert Button if Custom */}
                    {isSelectedCustom && (
                      <button
                        type="button"
                        onClick={() => {
                          onResetImage(selectedItem.key);
                          showToast('ডিফল্ট PDF ছবিতে রিস্টোর করা হয়েছে');
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold text-xs border border-stone-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        <span>ব্রোশিওরের মূল PDF ছবিতে ফিরে যান</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MENU ITEMS MANAGEMENT (ADD, EDIT, DELETE) */}
            {activeTab === 'items' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                {/* Top Action & Announcement Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-stone-850 p-4 sm:p-5 rounded-2xl border border-stone-750">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <Flame className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-black text-white">
                        খাবার মেনু ও আইটেম কন্ট্রোল (Add, Edit & Delete)
                      </h4>
                    </div>
                    <p className="text-xs text-stone-400">
                      নতুন খাবার আইটেম যুক্ত করুন, মূল্য ও বিবরণ পরিবর্তন করুন, এবং মেনুতে সক্রিয়/বন্ধ রাখুন।
                    </p>
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    {deletedMenuItems.length > 0 && onRestoreAllMenuItems && (
                      <button
                        type="button"
                        onClick={async () => {
                          if (confirm('আপনি কি বন্ধ থাকা সকল আইটেম পুনরায় মেনুতে সক্রিয় করতে চান?')) {
                            await onRestoreAllMenuItems();
                            showToast('✅ সকল খাবার আইটেম পুনরায় মেনুতে চালু করা হয়েছে');
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0 border border-stone-700"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        <span>সব চালু ({deletedMenuItems.length})</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setItemBeingEdited(null);
                        setIsEditItemModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs transition-all shadow-lg hover:shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer w-full md:w-auto shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 text-stone-950" />
                      <span>+ নতুন খাবার আইটেম যোগ করুন</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Search Bar */}
                <div className="space-y-2.5 bg-stone-900/90 p-3 sm:p-3.5 rounded-2xl border border-stone-800">
                  <div className="flex flex-col sm:flex-row items-center gap-2.5">
                    {/* Search Field */}
                    <div className="relative w-full sm:flex-1">
                      <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={itemSearch}
                        onChange={(e) => setItemSearch(e.target.value)}
                        placeholder="খাবারের নাম, বিবরণ বা কোড দিয়ে খুঁজুন..."
                        className="w-full bg-stone-850 border border-stone-700 rounded-xl pl-8 pr-8 py-2 text-xs text-white placeholder:text-stone-500 focus:outline-none focus:border-amber-400"
                      />
                      {itemSearch && (
                        <button
                          type="button"
                          onClick={() => setItemSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white text-xs cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    {/* Status Filter Tabs */}
                    <div className="flex items-center gap-1 bg-stone-850 p-1 rounded-xl border border-stone-750 shrink-0 w-full sm:w-auto overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => setItemStatusFilter('all')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          itemStatusFilter === 'all'
                            ? 'bg-amber-500 text-stone-950 shadow-sm'
                            : 'text-stone-400 hover:text-white'
                        }`}
                      >
                        সব ({baseMenuItemsList.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => setItemStatusFilter('active')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          itemStatusFilter === 'active'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-emerald-400'
                        }`}
                      >
                        🟢 সক্রিয় ({activeMenuItemsCount})
                      </button>
                      <button
                        type="button"
                        onClick={() => setItemStatusFilter('deleted')}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          itemStatusFilter === 'deleted'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-stone-400 hover:text-rose-400'
                        }`}
                      >
                        🔴 বন্ধ ({deletedMenuItemsCount})
                      </button>
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    <span className="text-[10px] font-bold text-stone-400 shrink-0 mr-1">ক্যাটাগরি:</span>
                    {[
                      { id: 'all', label: 'সব ক্যাটাগরি' },
                      { id: 'ruti', label: '🫓 ফুলকো রুটি' },
                      { id: 'paratha', label: '🥐 শাহী পরোটা' },
                      { id: 'curry', label: '🍲 ডাল ও ভাজি' },
                      { id: 'combos', label: '📦 কম্বো মিল' },
                      { id: 'drinks', label: '☕ চা ও পানীয়' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setItemCategoryFilter(cat.id)}
                        className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          itemCategoryFilter === cat.id
                            ? 'bg-amber-500 text-stone-950 shadow-sm'
                            : 'bg-stone-850 text-stone-300 hover:bg-stone-800 border border-stone-750'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Menu Items Grid */}
                {filteredMenuItems.length === 0 ? (
                  <div className="bg-stone-850 border border-stone-800 rounded-2xl p-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
                      <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">কোনো খাবার আইটেম পাওয়া যায়নি</h5>
                      <p className="text-xs text-stone-400 mt-0.5">
                        অনুগ্রহ করে সার্চ বা ফিল্টার পরিবর্তন করুন অথবা নতুন খাবার যুক্ত করুন।
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setItemBeingEdited(null);
                        setIsEditItemModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs inline-flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>নতুন খাবার যোগ করুন</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredMenuItems.map((item) => {
                      const isItemDeleted = deletedMenuItems.includes(item.id);
                      const itemImg = customImages[item.id] || item.image;

                      return (
                        <div 
                          key={item.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between gap-3 relative ${
                            isItemDeleted 
                              ? 'bg-rose-950/20 border-rose-500/40 opacity-75' 
                              : 'bg-stone-850 border-stone-750 hover:border-amber-500/40'
                          }`}
                        >
                          {/* Card Top: Image + Info */}
                          <div className="flex items-start gap-3">
                            {/* Thumbnail with Quick Camera Trigger */}
                            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden bg-black/60 border border-stone-700 shrink-0 relative group shadow-inner">
                              {itemImg ? (
                                <img 
                                  src={itemImg} 
                                  alt={item.nameBn} 
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-amber-400 font-black text-xs">
                                  BRN
                                </div>
                              )}

                              {/* Camera Overlay */}
                              <button
                                type="button"
                                onClick={() => {
                                  setUploadTargetKey(item.id);
                                  fileInputRef.current?.click();
                                }}
                                title="ছবি আপলোড / পরিবর্তন"
                                className="absolute bottom-1 right-1 bg-black/80 hover:bg-amber-500 hover:text-stone-950 text-white p-1 rounded-lg border border-stone-700 text-[9px] flex items-center justify-center transition-colors cursor-pointer"
                              >
                                <Camera className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Details */}
                            <div className="min-w-0 flex-1 space-y-1">
                              {/* Badges row */}
                              <div className="flex flex-wrap items-center gap-1">
                                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-stone-800 text-amber-300 border border-stone-700">
                                  {item.category === 'ruti' && '🫓 রুটি'}
                                  {item.category === 'paratha' && '🥐 পরোটা'}
                                  {item.category === 'curry' && '🍲 ডাল/ভাজি'}
                                  {item.category === 'combos' && '📦 কম্বো'}
                                  {item.category === 'drinks' && '☕ পানীয়'}
                                </span>

                                {item.isCustom && (
                                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-500 text-stone-950">
                                    ✨ নতুন যুক্ত
                                  </span>
                                )}

                                {item.isEdited && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                                    ✏️ এডিট করা
                                  </span>
                                )}

                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-300 border border-orange-500/40">
                                    {item.badge}
                                  </span>
                                )}
                              </div>

                              <h5 className={`text-xs sm:text-sm font-black truncate ${isItemDeleted ? 'text-stone-400 line-through' : 'text-white'}`}>
                                {item.nameBn}
                              </h5>
                              <p className="text-[10px] text-stone-400 truncate">
                                {item.nameEn}
                              </p>

                              <div className="flex items-center gap-2">
                                <span className="text-sm font-black text-amber-400">
                                  {item.price} ৳
                                </span>
                                <span className="text-[10px] text-stone-400 font-medium">
                                  / {item.unitBn}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Tagline / Description Snippet */}
                          {item.taglineBn && (
                            <p className="text-[10px] text-stone-400 line-clamp-1 bg-stone-900/60 p-1.5 rounded-lg border border-stone-800/80">
                              {item.taglineBn}
                            </p>
                          )}

                          {/* Status and Action Buttons */}
                          <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
                            <div className="flex items-center justify-between text-[10px]">
                              <span className="text-stone-500 font-mono text-[9px]">
                                ID: {item.id}
                              </span>
                              <span className={`font-bold ${isItemDeleted ? 'text-rose-400' : 'text-emerald-400'}`}>
                                {isItemDeleted ? '🔴 মেনু থেকে বন্ধ' : '🟢 মেনুতে সক্রিয়'}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-1.5 pt-0.5">
                              {/* Edit Button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setItemBeingEdited(item);
                                  setIsEditItemModalOpen(true);
                                }}
                                className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3 text-amber-400" />
                                <span>এডিট করুন</span>
                              </button>

                              <div className="flex items-center gap-1">
                                {/* Toggle Active / Inactive on Menu */}
                                {isItemDeleted ? (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (onToggleMenuItem) {
                                        await onToggleMenuItem(item.id, false);
                                        showToast(`✅ "${item.nameBn}" পুনরায় মেনুতে যুক্ত করা হয়েছে`);
                                      }
                                    }}
                                    className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                                  >
                                    <Undo2 className="w-3 h-3" />
                                    <span>সক্রিয় করুন</span>
                                  </button>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (confirm(`আপনি কি "${item.nameBn}" আইটেমটি মেনু থেকে সাময়িকভাবে বন্ধ করতে চান?`)) {
                                        if (onToggleMenuItem) {
                                          await onToggleMenuItem(item.id, true);
                                          showToast(`🗑️ "${item.nameBn}" আইটেমটি মেনু থেকে বন্ধ করা হয়েছে`);
                                        }
                                      }
                                    }}
                                    className="px-2.5 py-1.5 rounded-xl bg-rose-950/80 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/50 font-bold text-[11px] transition-all flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    <span>বন্ধ করুন</span>
                                  </button>
                                )}

                                {/* Delete Custom Item Permanently */}
                                {item.isCustom && onDeleteCustomMenuItem && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (confirm(`⚠️ সতর্কবার্তা: আপনি কি "${item.nameBn}" আইটেমটি স্থায়ীভাবে ডাটাবেস থেকে মুছে ফেলতে চান?`)) {
                                        await onDeleteCustomMenuItem(item.id);
                                        showToast(`🗑️ "${item.nameBn}" স্থায়ীভাবে মুছে ফেলা হয়েছে`);
                                      }
                                    }}
                                    className="p-1.5 rounded-xl bg-stone-800 hover:bg-rose-900 text-stone-400 hover:text-rose-200 border border-stone-700 text-[11px] transition-colors cursor-pointer"
                                    title="স্থায়ীভাবে ডিলিট করুন"
                                  >
                                    <Trash className="w-3 h-3" />
                                  </button>
                                )}

                                {/* Reset Modified Item to Original Defaults */}
                                {item.isEdited && onResetModifiedItem && (
                                  <button
                                    type="button"
                                    onClick={async () => {
                                      if (confirm(`আপনি কি "${item.nameBn}" এর সম্পাদিত তথ্য মুছে মূল ব্রোশিওর তথ্যে ফেরত যেতে চান?`)) {
                                        await onResetModifiedItem(item.id);
                                        showToast(`🔄 "${item.nameBn}" মূল তথ্যে ফেরত নেওয়া হয়েছে`);
                                      }
                                    }}
                                    className="p-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-amber-300 border border-stone-700 text-[11px] transition-colors cursor-pointer"
                                    title="মূল তথ্যে রিসেট"
                                  >
                                    <RotateCcw className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: LIVE ORDERS */}
            {activeTab === 'orders' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-white">
                    মিরপুর সেন্ট্রাল কিচেন লাইভ অর্ডার ডিসপ্যাচ ({orders.length})
                  </h4>
                  <span className="text-xs text-stone-400">
                    ১৫ মিনিট গ্যারান্টি ট্র্যাকিং
                  </span>
                </div>

                {orders.length === 0 ? (
                  <div className="text-center py-12 bg-stone-850/50 rounded-2xl border border-stone-800 space-y-2">
                    <ShoppingBag className="w-10 h-10 text-stone-600 mx-auto" />
                    <p className="text-sm font-bold text-stone-400">বর্তমানে কোনো সক্রিয় লাইভ অর্ডার নেই</p>
                    <p className="text-xs text-stone-500">গ্রাহকরা মেনু থেকে অর্ডার করলে এখানে রিয়েল-টাইমে প্রদর্শিত হবে</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {orders.map((ord) => (
                      <div key={ord.id} className="bg-stone-850 border border-stone-750 rounded-2xl p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-amber-400">
                            #{ord.id.slice(-6).toUpperCase()}
                          </span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                            ord.status === 'delivered' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' :
                            ord.status === 'rider_assigned' ? 'bg-sky-950 text-sky-300 border border-sky-500/40' :
                            'bg-amber-950 text-amber-300 border border-amber-500/40'
                          }`}>
                            {ord.status === 'baking' && '🔥 তাওয়ায় বেকিং হচ্ছে'}
                            {ord.status === 'casserole_packed' && '📦 ক্যাসারোলে প্যাকড'}
                            {ord.status === 'rider_assigned' && '🚴 রাইডার রওনা হয়েছে'}
                            {ord.status === 'delivered' && '✅ ডেলিভারি সম্পন্ন'}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-bold text-white">{ord.customerAddress}</p>
                          <p className="text-[11px] text-stone-400">{ord.customerPhone} • {ord.zone}</p>
                        </div>

                        <div className="bg-stone-900 rounded-xl p-2 text-xs text-stone-300">
                          {ord.items}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                          <span className="text-sm font-black text-amber-400">{ord.totalAmount} ৳</span>

                          {onUpdateOrderStatus && ord.status !== 'delivered' && (
                            <div className="flex items-center gap-1.5">
                              {ord.status === 'baking' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'casserole_packed')}
                                  className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-bold text-[10px] hover:bg-amber-400"
                                >
                                  প্যাকিং সম্পন্ন
                                </button>
                              )}
                              {ord.status === 'casserole_packed' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'rider_assigned')}
                                  className="px-2.5 py-1 rounded-lg bg-sky-500 text-stone-950 font-bold text-[10px] hover:bg-sky-400"
                                >
                                  রাইডার অ্যাসাইন
                                </button>
                              )}
                              {ord.status === 'rider_assigned' && (
                                <button
                                  onClick={() => onUpdateOrderStatus(ord.id, 'delivered')}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-500 text-stone-950 font-bold text-[10px] hover:bg-emerald-400"
                                >
                                  ডেলিভারি কনফার্ম
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: QUICK OFFERS & HERO OFFER CARDS MANAGEMENT */}
            {activeTab === 'offers' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-850 border border-stone-750 p-4 rounded-2xl">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>কুইক অফার ও ব্যানার ব্যবস্থাপনা ({quickOffers.length})</span>
                      </h4>
                    </div>
                    <p className="text-xs text-stone-400 mt-1">
                      হোম স্ক্রিনের ওপরের বিশেষ অফার কার্ড (যেমন: ৪টি রুটি ৩৫৳ বা কম্বো অফার) তৈরি, ছবি পরিবর্তন, মূল্য আপডেট ও মুছে ফেলা
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {onResetQuickOffers && (
                      <button
                        onClick={async () => {
                          if (confirm('আপনি কি অফারগুলো ব্রোশিওরের মূল অফারে রিসেট করতে চান?')) {
                            await onResetQuickOffers();
                            showToast('🔄 অফারগুলো মূল ডিফল্টে রিসেট করা হয়েছে');
                          }
                        }}
                        className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="মূল অফারে রিসেট করুন"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                        <span>ডিফল্টে রিসেট</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setOfferBeingEdited(null);
                        setIsEditOfferModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4 text-stone-950" />
                      <span>+ নতুন অফার যোগ করুন</span>
                    </button>
                  </div>
                </div>

                {/* Offer cards list */}
                {quickOffers.length === 0 ? (
                  <div className="text-center py-12 bg-stone-850/50 rounded-2xl border border-stone-800 space-y-2">
                    <Sparkles className="w-10 h-10 text-stone-600 mx-auto" />
                    <p className="text-sm font-bold text-stone-400">বর্তমানে কোনো সক্রিয় কুইক অফার নেই</p>
                    <p className="text-xs text-stone-500">"+ নতুন অফার যোগ করুন" বোতামে ক্লিক করে নতুন স্পেশাল অফার তৈরি করুন</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {quickOffers.map((offer) => (
                      <div 
                        key={offer.id} 
                        className={`bg-stone-850 border rounded-2xl p-3.5 flex flex-col justify-between transition-all ${
                          offer.isActive 
                            ? 'border-stone-750 hover:border-amber-500/50' 
                            : 'border-rose-950/60 bg-stone-900/80 opacity-70'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-700 bg-black/40">
                            <img 
                              src={offer.imageUrl || '/images/pdf_bangla_ruti.png'} 
                              alt={offer.titleBn} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/pdf_bangla_ruti.png';
                              }}
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded inline-block ${
                                offer.badgeColor === 'emerald' ? 'bg-emerald-500 text-stone-950' :
                                offer.badgeColor === 'orange' ? 'bg-orange-500 text-white' :
                                offer.badgeColor === 'rose' ? 'bg-rose-500 text-white' :
                                offer.badgeColor === 'sky' ? 'bg-sky-500 text-stone-950' :
                                'bg-amber-500 text-stone-950'
                              }`}>
                                {offer.badgeBn || 'অফার'}
                              </span>
                              <span className="text-xs font-black text-amber-400">
                                ৳{offer.price}
                              </span>
                              {offer.originalPrice && offer.originalPrice > offer.price && (
                                <span className="text-[10px] text-stone-500 line-through">
                                  ৳{offer.originalPrice}
                                </span>
                              )}
                              {!offer.isActive && (
                                <span className="text-[9px] bg-rose-600/30 text-rose-300 border border-rose-600/40 px-1.5 py-0.2 rounded font-bold">
                                  লুকানো
                                </span>
                              )}
                            </div>

                            <h4 className="text-sm font-bold text-white mt-1">
                              {offer.titleBn}
                            </h4>
                            {offer.subtitleBn && (
                              <p className="text-xs text-stone-400 truncate mt-0.5">{offer.subtitleBn}</p>
                            )}

                            <div className="flex items-center gap-2 mt-2 text-[11px] text-stone-400">
                              <span>অ্যাকশন: <strong className="text-stone-300">{offer.actionTextBn}</strong></span>
                              {offer.targetItemId && (
                                <span className="text-stone-500 font-mono text-[10px]">({offer.targetItemId})</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Card controls */}
                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-stone-800">
                          <button
                            onClick={() => {
                              if (onToggleQuickOfferActive) {
                                onToggleQuickOfferActive(offer.id, !offer.isActive);
                                showToast(offer.isActive ? '👁️ অফারটি সাময়িক বন্ধ করা হয়েছে' : '✅ অফারটি হোম স্ক্রিনে সক্রিয় করা হয়েছে');
                              }
                            }}
                            className="flex items-center gap-1 text-xs text-stone-400 hover:text-white cursor-pointer"
                          >
                            {offer.isActive ? (
                              <>
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-bold">সক্রিয়</span>
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                                <span className="text-rose-400 font-bold">লুকানো</span>
                              </>
                            )}
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setOfferBeingEdited(offer);
                                setIsEditOfferModalOpen(true);
                              }}
                              className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-750 text-amber-300 border border-stone-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                              <span>এডিট</span>
                            </button>

                            {onDeleteQuickOffer && (
                              <button
                                onClick={async () => {
                                  if (confirm(`আপনি কি "${offer.titleBn}" অফারটি চিরতরে মুছে ফেলতে চান?`)) {
                                    await onDeleteQuickOffer(offer.id);
                                    showToast('🗑️ অফারটি সফলভাবে মুছে ফেলা হয়েছে');
                                  }
                                }}
                                className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-bold text-xs flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                                <span>মুছুন</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB: HEADER & LOGO CONFIGURATION */}
            {activeTab === 'header' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-w-2xl">
                <div className="bg-stone-850 border border-stone-750 rounded-2xl p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-white flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <span>হেডার ও লোগো কাস্টমাইজেশন</span>
                      </h4>
                      <p className="text-xs text-stone-400 mt-0.5">
                        ওয়েবসাইট/অ্যাপের ওপরের হেডার বার, ব্র্যান্ড লোগো টেক্সট, স্লোগান ও আইকন পরিবর্তন
                      </p>
                    </div>

                    {onResetHeaderConfig && (
                      <button
                        onClick={async () => {
                          if (confirm('আপনি কি হেডার ও লোগো মূল ডিফল্টে রিসেট করতে চান?')) {
                            await onResetHeaderConfig();
                            setLocalHeaderConfig({
                              logoTextBn: 'বাংলা রুটি',
                              logoTagBn: 'BRN',
                              logoIconType: 'flame',
                              headerTaglineBn: 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস',
                              showLocationPill: true,
                              showWalletPill: true,
                              showApkBtn: true
                            });
                            showToast('🔄 হেডার ও লোগো মূল ডিফল্টে ফিরে গেছে');
                          }
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-750 text-stone-300 font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                        <span>ডিফল্ট রিসেট</span>
                      </button>
                    )}
                  </div>

                  {/* Live Header Preview */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-400">লাইভ হেডার প্রিভিউ:</label>
                    <div className="bg-stone-900 border border-stone-750 rounded-2xl p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-md overflow-hidden shrink-0">
                          {localHeaderConfig.logoIconType === 'image' && localHeaderConfig.logoCustomImage ? (
                            <img 
                              src={localHeaderConfig.logoCustomImage} 
                              alt="Logo" 
                              className="w-full h-full object-cover" 
                            />
                          ) : (
                            <Flame className="w-5 h-5 text-stone-950" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-sm text-white tracking-tight">
                              {localHeaderConfig.logoTextBn || 'বাংলা রুটি'}
                            </span>
                            {localHeaderConfig.logoTagBn && (
                              <span className="text-[10px] font-black bg-amber-500/20 text-amber-400 px-1.5 py-0.2 rounded border border-amber-500/30">
                                {localHeaderConfig.logoTagBn}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-[11px] text-stone-400">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            <span>{localHeaderConfig.headerTaglineBn || 'মিরপুর ১১ ও ১২ • ১৫ মিনিট'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {localHeaderConfig.showHeaderAdminBtn && (
                          <span className="text-[10px] font-black bg-amber-500 text-stone-950 px-2 py-1 rounded-xl">
                            এডমিন
                          </span>
                        )}
                        {localHeaderConfig.showHeaderImageBtn && (
                          <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-1 rounded-xl border border-amber-500/30">
                            ছবি
                          </span>
                        )}
                        {localHeaderConfig.showWalletPill !== false && (
                          <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-xl border border-emerald-500/30">
                            ৳৫০০
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Header Form Controls */}
                  <div className="space-y-3 pt-2 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-300 font-bold block mb-1">
                          লোগো ব্র্যান্ড নাম (বাংলা)
                        </label>
                        <input
                          type="text"
                          value={localHeaderConfig.logoTextBn}
                          onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, logoTextBn: e.target.value })}
                          placeholder="যেমন: বাংলা রুটি"
                          className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="text-stone-300 font-bold block mb-1">
                          লোগো শর্ট ট্যাগ / ব্যাজ
                        </label>
                        <input
                          type="text"
                          value={localHeaderConfig.logoTagBn}
                          onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, logoTagBn: e.target.value })}
                          placeholder="যেমন: BRN"
                          className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-stone-300 font-bold block mb-1">
                        হেডার লোকেশন সাবটাইটেল / স্লোগান
                      </label>
                      <input
                        type="text"
                        value={localHeaderConfig.headerTaglineBn || ''}
                        onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, headerTaglineBn: e.target.value })}
                        placeholder="যেমন: মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস"
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Logo Icon Style Selection */}
                    <div>
                      <label className="text-stone-300 font-bold block mb-1">
                        লোগো আইকন ধরণ
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="logoType"
                            checked={localHeaderConfig.logoIconType !== 'image'}
                            onChange={() => setLocalHeaderConfig({ ...localHeaderConfig, logoIconType: 'flame' })}
                            className="accent-amber-500"
                          />
                          <span className="text-stone-200">অগ্নিশিখা (Flame আইকন)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="logoType"
                            checked={localHeaderConfig.logoIconType === 'image'}
                            onChange={() => setLocalHeaderConfig({ ...localHeaderConfig, logoIconType: 'image' })}
                            className="accent-amber-500"
                          />
                          <span className="text-stone-200">কাস্টম ইমেজ লোগো</span>
                        </label>
                      </div>
                    </div>

                    {localHeaderConfig.logoIconType === 'image' && (
                      <div>
                        <label className="text-stone-300 font-bold block mb-1">
                          কাস্টম লোগো ইমেজ ইউআরএল বা আপলোড
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={localHeaderConfig.logoCustomImage || ''}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, logoCustomImage: e.target.value })}
                            placeholder="ছবির লিঙ্ক দিন বা আপলোড করুন"
                            className="flex-1 bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white font-mono text-[11px] focus:outline-none focus:border-amber-400"
                          />
                          <button
                            type="button"
                            onClick={() => triggerUploadFor('custom_logo_icon')}
                            className="px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Camera className="w-3.5 h-3.5" />
                            <span>আপলোড</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Visibility Toggles */}
                    <div className="pt-2 border-t border-stone-800 space-y-2">
                      <label className="text-stone-400 font-bold block text-[11px]">হেডারের বাটন দৃশ্যমানতা:</label>
                      <div className="flex flex-wrap gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localHeaderConfig.showLocationPill !== false}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, showLocationPill: e.target.checked })}
                            className="accent-amber-500 rounded"
                          />
                          <span className="text-stone-300">মিরপুর এরিয়া পিল</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localHeaderConfig.showWalletPill !== false}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, showWalletPill: e.target.checked })}
                            className="accent-amber-500 rounded"
                          />
                          <span className="text-stone-300">ওয়ালেট ব্যালেন্স বাটন</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={localHeaderConfig.showApkBtn !== false}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, showApkBtn: e.target.checked })}
                            className="accent-amber-500 rounded"
                          />
                          <span className="text-stone-300">APK ডাউনলোড বাটন</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(localHeaderConfig.showHeaderAdminBtn)}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, showHeaderAdminBtn: e.target.checked })}
                            className="accent-amber-500 rounded"
                          />
                          <span className="text-stone-300">হেডারে এডমিন বাটন (Admin)</span>
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={Boolean(localHeaderConfig.showHeaderImageBtn)}
                            onChange={(e) => setLocalHeaderConfig({ ...localHeaderConfig, showHeaderImageBtn: e.target.checked })}
                            className="accent-amber-500 rounded"
                          />
                          <span className="text-stone-300">হেডারে ছবি বাটন (Image)</span>
                        </label>
                      </div>
                    </div>

                    {/* Save Button */}
                    <div className="pt-3 border-t border-stone-800 flex justify-end">
                      <button
                        onClick={async () => {
                          if (onUpdateHeaderConfig) {
                            await onUpdateHeaderConfig(localHeaderConfig);
                            showToast('✅ হেডার ও লোগো কনফিগারেশন সফলভাবে সেভ হয়েছে!');
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-stone-950" />
                        <span>হেডার পরিবর্তন সংরক্ষণ করুন</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-w-2xl">
                <div className="bg-stone-850 border border-stone-750 rounded-2xl p-4 space-y-4">
                  <h4 className="text-sm font-black text-white flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    <span>সেন্ট্রাল কিচেন ও ডেলিভারি কনফিগারেশন</span>
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="text-stone-400 block mb-1">অফিশিয়াল হটলাইন নম্বর</label>
                      <input
                        type="text"
                        defaultValue={BRN_BRAND_INFO.hotline}
                        disabled
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="text-stone-400 block mb-1">সেন্ট্রাল কিচেন ইউনিট ঠিকানা</label>
                      <input
                        type="text"
                        defaultValue={BRN_BRAND_INFO.addressBn}
                        disabled
                        className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-stone-400 block mb-1">ডেলিভারি ব্যাসার্ধ (সর্বোচ্চ)</label>
                        <input
                          type="text"
                          defaultValue="২.০ কিলোমিটার (মিরপুর ১১ ও ১২)"
                          disabled
                          className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-stone-400 block mb-1">গ্যারান্টি ডেলিভারি সময়</label>
                        <input
                          type="text"
                          defaultValue="১৫ মিনিট"
                          disabled
                          className="w-full bg-stone-900 border border-stone-750 rounded-xl px-3 py-2 text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="bg-stone-950 p-4 border-t border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>ফায়ারস্টোর ক্লাউড সিঙ্ক সক্রিয়</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition-all cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>

      {/* Sub-modal: Add or Edit Menu Item */}
      <EditMenuItemModal
        isOpen={isEditItemModalOpen}
        onClose={() => {
          setIsEditItemModalOpen(false);
          setItemBeingEdited(null);
        }}
        itemToEdit={itemBeingEdited}
        onSave={handleSaveMenuItem}
        currentImage={itemBeingEdited ? (customImages[itemBeingEdited.id] || itemBeingEdited.image) : undefined}
      />

      {/* Sub-modal: Add or Edit Quick Offer */}
      <EditOfferModal
        isOpen={isEditOfferModalOpen}
        onClose={() => {
          setIsEditOfferModalOpen(false);
          setOfferBeingEdited(null);
        }}
        offerToEdit={offerBeingEdited}
        menuItems={baseMenuItemsList}
        onSave={async (savedOffer) => {
          if (offerBeingEdited) {
            if (onUpdateQuickOffer) {
              await onUpdateQuickOffer(savedOffer);
              showToast(`✅ "${savedOffer.titleBn}" অফারটি সফলভাবে আপডেট করা হয়েছে!`);
            }
          } else {
            if (onAddQuickOffer) {
              await onAddQuickOffer(savedOffer);
              showToast(`✅ নতুন অফার "${savedOffer.titleBn}" যুক্ত করা হয়েছে!`);
            }
          }
          setIsEditOfferModalOpen(false);
          setOfferBeingEdited(null);
        }}
      />

      {/* Sub-modal: Edit Hero Banner Section */}
      <EditHeroBannerModal
        isOpen={isEditHeroModalOpen}
        onClose={() => setIsEditHeroModalOpen(false)}
        bannerConfig={heroBannerConfig || {
          pillTextBn: 'মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস',
          ctaButtonTextBn: 'বিস্তারিত দেখুন',
          headingLine1Bn: 'তাওয়া থেকে তাজা গরম রুটি',
          headingLine2HighlightBn: '১৫ মিনিটে',
          headingLine2SuffixBn: 'আপনার দরজায়!',
          mottoBn: `${BRN_BRAND_INFO.mottoBn} — সকাল-সন্ধ্যার ঝামেলাহীন স্বস্তিতে স্বাগতম।`,
          footerFeatureBn: 'স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক',
          footerDistanceBn: 'সর্বোচ্চ ২ কিমি',
          imageUrl: BRN_BRAND_INFO.images.heroCombo,
          isVisible: !deletedSections.includes('kitchen_dispatch_info')
        }}
        onSave={async (savedHero) => {
          if (onUpdateHeroBannerConfig) {
            await onUpdateHeroBannerConfig(savedHero);
            showToast('✅ হেডারের নিচের ব্যানার (Hero Section) সফলভাবে আপডেট করা হয়েছে!');
          }
          if (savedHero.isVisible === false && !deletedSections.includes('kitchen_dispatch_info') && onToggleSection) {
            await onToggleSection('kitchen_dispatch_info', true);
          } else if (savedHero.isVisible !== false && deletedSections.includes('kitchen_dispatch_info') && onToggleSection) {
            await onToggleSection('kitchen_dispatch_info', false);
          }
        }}
        onDeleteSection={async () => {
          if (onToggleSection) {
            await onToggleSection('kitchen_dispatch_info', true);
            showToast('🗑️ হেডারের নিচের ব্যানার সেকশনটি ডিলিট (হাইড) করা হয়েছে');
          }
        }}
        onResetDefault={async () => {
          if (onResetHeroBannerConfig) {
            await onResetHeroBannerConfig();
            showToast('🔄 ব্যানার ডিফল্ট অবস্থায় রিস্টোর করা হয়েছে');
          }
        }}
      />
    </div>
  );
};

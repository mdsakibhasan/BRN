export type Language = 'bn' | 'en';

export interface MenuItem {
  id: string;
  nameBn: string;
  nameEn: string;
  descriptionBn: string;
  descriptionEn: string;
  price: number;
  unitBn: string;
  unitEn: string;
  category: 'ruti' | 'paratha' | 'curry' | 'combos' | 'drinks';
  prepTimeMinutes: number;
  popular?: boolean;
  isVegetarian?: boolean;
  badge?: string;
  calories?: string;
  image?: string;
  taglineBn?: string;
  ingredientsBn?: string[];
  featuresBn?: string[];
  nutritionFacts?: {
    energy?: string;
    carbs?: string;
    protein?: string;
    fat?: string;
    fiber?: string;
    sodium?: string;
  };
  isCustom?: boolean;
  isEdited?: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface MirpurLocation {
  id: string;
  nameBn: string;
  nameEn: string;
  zone: 'Mirpur 11' | 'Mirpur 12';
  distanceKm: number;
  estimatedDeliveryMin: number;
  isAvailable: boolean;
  addressHint: string;
}

export interface WalletTransaction {
  id: string;
  date: string;
  type: 'credit' | 'debit';
  method: 'bKash' | 'Nagad' | 'Order Payment' | 'Refund' | 'Bonus';
  amount: number;
  trxId: string;
  status: 'Completed' | 'Pending';
  note: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: 'Wallet' | 'bKash' | 'Nagad';
  customerName: string;
  phone: string;
  deliveryAddress: string;
  zone: string;
  distanceKm: number;
  status: 'confirmed' | 'baking' | 'packing' | 'rider_assigned' | 'delivering' | 'delivered';
  targetDeliveryTime: string; // 15 min after order
  riderName: string;
  riderPhone: string;
  remainingSeconds: number;
}

export interface HeaderConfig {
  logoTextBn: string;       // e.g. "বাংলা রুটি"
  logoTagBn: string;        // e.g. "BRN"
  logoIconType?: 'flame' | 'image' | 'ruti';
  logoCustomImage?: string; // Optional custom logo image URL/dataUrl
  headerTaglineBn?: string; // Subtitle or slogan e.g. "১৫ মিনিট এক্সপ্রেস রুটি"
  showLocationPill?: boolean;
  showWalletPill?: boolean;
  showApkBtn?: boolean;
  showHeaderAdminBtn?: boolean; // Controls Admin button in header
  showHeaderImageBtn?: boolean; // Controls Image button in header
}

export interface HeroBannerConfig {
  pillTextBn: string;       // e.g. "মিরপুর ১১ ও ১২ • ১৫ মিনিট এক্সপ্রেস"
  ctaButtonTextBn: string;  // e.g. "বিস্তারিত দেখুন"
  headingLine1Bn: string;   // e.g. "তাওয়া থেকে তাজা গরম রুটি"
  headingLine2HighlightBn: string; // e.g. "১৫ মিনিটে"
  headingLine2SuffixBn: string;    // e.g. "আপনার দরজায়!"
  mottoBn: string;          // e.g. "“স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি” — সকাল-সন্ধ্যার ঝামেলাহীন স্বস্তিতে স্বাগতম।"
  footerFeatureBn: string;  // e.g. "স্বয়ংক্রিয় মেশিনে তৈরি ও ১০০% হাইজেনিক"
  footerDistanceBn: string; // e.g. "সর্বোচ্চ ২ কিমি"
  imageUrl?: string;        // Background image
  isVisible?: boolean;      // Section visibility toggle
}

export interface QuickOfferItem {
  id: string;
  titleBn: string;          // e.g. "৪টি রুটি ৩৫৳"
  badgeBn: string;          // e.g. "অফার" or "কম্বো"
  badgeColor?: 'amber' | 'emerald' | 'orange' | 'rose' | 'sky';
  price: number;            // e.g. 35
  originalPrice?: number;   // e.g. 45
  actionTextBn: string;     // e.g. "+ ১-ট্যাপে যোগ"
  targetItemId?: string;    // Associated MenuItem ID for 1-tap add to cart
  imageUrl: string;         // Offer image url or dataUrl
  isActive: boolean;
  subtitleBn?: string;      // e.g. "তাজা গরম বাংলা রুটি"
}

import { MenuItem, MirpurLocation } from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'fulko-ruti',
    nameBn: 'হাতে তৈরি লাল আটার ফুলকো রুটি',
    nameEn: 'Handmade Whole Wheat Fulko Ruti',
    descriptionBn: '১০০% খাঁটি লাল আটার নরম ও ফুলকো তাজা রুটি, তাওয়া থেকে সরাসরি প্যাকেটে। তেলমুক্ত ও স্বাস্থ্যসম্মত।',
    descriptionEn: '100% pure whole wheat, oil-free, puffed fresh from hot iron tawa straight into thermal packaging.',
    price: 12,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 5,
    popular: true,
    isVegetarian: true,
    badge: 'সেরা চয়েস 🔥',
    calories: '75 kcal'
  },
  {
    id: 'shahi-paratha',
    nameBn: 'গাওয়া ঘিয়ের লেয়ার পরোটা',
    nameEn: 'Pure Ghee Layered Flaky Paratha',
    descriptionBn: 'খাঁটি দেশি গাওয়া ঘি দিয়ে মচমচে খাস্তা ও নরম লেয়ারের স্পেশাল পরোটা। সুস্বাদু ও মুখরোচক।',
    descriptionEn: 'Crisp, multi-layered flaky paratha brushed with pure desi cow ghee on slow tawa fire.',
    price: 25,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'paratha',
    prepTimeMinutes: 6,
    popular: true,
    isVegetarian: true,
    badge: 'গাওয়া ঘি স্পেশাল ✨',
    calories: '185 kcal'
  },
  {
    id: 'rumali-ruti',
    nameBn: 'পাতলা রেশমি রুমালি রুটি',
    nameEn: 'Silk Thin Rumali Ruti',
    descriptionBn: 'হাতের জাদুতে আলতো করে ওল্টানো রুমালের মতো পাতলা ও নরম রুমালি রুটি। মাংস বা ডালের সাথে অপূর্ব।',
    descriptionEn: 'Ultra-thin, soft, handkerchief-styled artisanal ruti baked on convex wok dome.',
    price: 20,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 6,
    isVegetarian: true,
    calories: '90 kcal'
  },
  {
    id: 'dim-porota',
    nameBn: 'স্পেশাল ডিম পরোটা রোল',
    nameEn: 'Special Egg Roll Paratha',
    descriptionBn: 'পরোটার ভেতর তাজা দেশি ডিম, পেঁয়াজ, কাঁচামরিচ দিয়ে তৈরি গরম গরম রোল।',
    descriptionEn: 'Hot flaky paratha encasing beaten farm egg with chopped shallots, green chilies and house spice.',
    price: 45,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'paratha',
    prepTimeMinutes: 7,
    badge: 'নাস্তা স্পেশাল 🍳',
    calories: '280 kcal'
  },
  {
    id: 'deshi-booter-dal',
    nameBn: 'ঘরোয়া স্পেশাল বুটের ডাল বাগার',
    nameEn: 'Homestyle Spiced Yellow Gram Dal',
    descriptionBn: 'জিরা, শুকনা মরিচ আর তেজপাতার বাগার দেওয়া ঘন সুস্বাদু বুটের ডাল। রুটি ও পরোটার সেরা জুটি।',
    descriptionEn: 'Slow-simmered split Bengal gram tempered with cumin, whole dried red chili and bay leaves.',
    price: 40,
    unitBn: '১ বাটি',
    unitEn: '1 bowl',
    category: 'curry',
    prepTimeMinutes: 4,
    popular: true,
    isVegetarian: true,
    calories: '140 kcal'
  },
  {
    id: 'alu-sobji-torkari',
    nameBn: 'পাঁচফোড়ন মেথি আলু ভাজি',
    nameEn: 'Five-Spice Spiced Potato Vegetable',
    descriptionBn: 'সকালের তাজা ফুলকপি, আলু ও পাঁচফোড়ন দিয়ে কষানো সুস্বাদু ভাজি। কোনো কৃত্রিম রঙ নেই।',
    descriptionEn: 'Homestyle potatoes sautéed with traditional panch-phoron spice blend and mild green chilies.',
    price: 35,
    unitBn: '১ বাটি',
    unitEn: '1 bowl',
    category: 'curry',
    prepTimeMinutes: 4,
    isVegetarian: true,
    calories: '110 kcal'
  },
  {
    id: 'shahi-beef-kolija',
    nameBn: 'শাহী গরুর কলিজা ভুনা',
    nameEn: 'Shahi Beef Liver Bhuna',
    descriptionBn: 'গরম মসলা ও পেঁয়াজ-আদায় ভুনা তাজা গরুর কলিজা। রাতের রুটি খাওয়ার দারুণ আইটেম।',
    descriptionEn: 'Tender beef liver sautéed in aromatic brown gravy with whole spices, cinnamon and cardamom.',
    price: 95,
    unitBn: '১ প্লেট',
    unitEn: '1 plate',
    category: 'curry',
    prepTimeMinutes: 5,
    popular: true,
    badge: 'সেরা স্বাদ 👑',
    calories: '260 kcal'
  },
  {
    id: 'dim-vaji',
    nameBn: 'দেশি ডিম ভাজি (কাঁচামরিচ-পেঁয়াজ)',
    nameEn: 'Desi Egg Omelette with Green Chili',
    descriptionBn: 'কুচানো দেশি পেঁয়াজ, ঝাল কাঁচামরিচ ও ধনেপাতা দিয়ে মচমচে ডিম ভাজা।',
    descriptionEn: 'Fresh double-beaten farm egg fried golden with crisp shallots and cilantro.',
    price: 25,
    unitBn: '১ পিস',
    unitEn: '1 piece',
    category: 'curry',
    prepTimeMinutes: 3,
    calories: '95 kcal'
  },
  {
    id: 'morning-combo-box',
    nameBn: 'BRN সকালের কম্বো বক্স (৫ রুটি + ডাল + ডিম)',
    nameEn: 'BRN Morning Breakfast Combo (5 Ruti + Dal + Egg)',
    descriptionBn: '৫ পিস গরম ফুলকো রুটি, ১ বাটি স্পেশাল বুটের ডাল এবং ১টি দেশি ডিম ভাজি। দ্রুত ১৫ মিনিটে ডেলিভারি।',
    descriptionEn: '5 fresh piping-hot fulko rutis, 1 bowl aromatic booter dal, and 1 crispy farm egg omelette.',
    price: 110,
    unitBn: '১ কম্বো বক্স',
    unitEn: '1 combo pack',
    category: 'combos',
    prepTimeMinutes: 7,
    popular: true,
    badge: '৳১৫ ছাড়! ⚡',
    calories: '490 kcal'
  },
  {
    id: 'office-family-pack',
    nameBn: 'ফ্যামিলি প্যাক (১০ রুটি + ২ বুটের ডাল + ২ ডিম ভাজি)',
    nameEn: 'BRN Family Hot Box (10 Ruti + 2 Dal + 2 Eggs)',
    descriptionBn: 'পুরো পরিবারের জন্য ইনসুলেটেড গরম ক্যাসারোল প্যাক। রুটি থাকে একদম ধোঁয়া ওঠা গরম।',
    descriptionEn: '10 handmade whole wheat rutis in thermal casserole box, 2 bowls dal, and 2 fresh egg omelettes.',
    price: 220,
    unitBn: '১ ফ্যামিলি বক্স',
    unitEn: '1 family box',
    category: 'combos',
    prepTimeMinutes: 8,
    badge: 'ফ্যামিলি হট প্যাক ♨️',
    calories: '980 kcal'
  },
  {
    id: 'nolen-gurer-cha',
    nameBn: 'খাঁটি নলেন গুড়ের স্পেশাল মালাই চা',
    nameEn: 'Nolen Gur Artisanal Malai Milk Tea',
    descriptionBn: 'খাঁটি খেজুরের নলেন গুড় ও ঘন খাঁটি দুধের শাহী মালাই চা। রুটির সাথে চমৎকার তৃপ্তি।',
    descriptionEn: 'Signature authentic winter date palm molasses boiled with thick cream milk tea.',
    price: 30,
    unitBn: '১ কাপ',
    unitEn: '1 cup',
    category: 'drinks',
    prepTimeMinutes: 4,
    badge: 'নলেন গুড় ☕',
    calories: '120 kcal'
  }
];

export const MIRPUR_LOCATIONS: MirpurLocation[] = [
  {
    id: 'mirpur-11-avenue-4',
    nameBn: 'মিরপুর ১১, এভিনিউ ৪ (নানক চত্বর সংলগ্ন)',
    nameEn: 'Mirpur 11, Avenue 4 (Near Nanna Mor)',
    zone: 'Mirpur 11',
    distanceKm: 0.6,
    estimatedDeliveryMin: 10,
    isAvailable: true,
    addressHint: 'কেন্দ্রীয় কিচেনের কাছেই (৬০০ মিটার)'
  },
  {
    id: 'mirpur-11-block-b',
    nameBn: 'মিরপুর ১১, ব্লক বি (কালশী রোড সংলগ্ন)',
    nameEn: 'Mirpur 11, Block B (Kalshi Road)',
    zone: 'Mirpur 11',
    distanceKm: 1.1,
    estimatedDeliveryMin: 12,
    isAvailable: true,
    addressHint: '১.১ কিমি - এক্সপ্রেস ডেলিভারি জোন'
  },
  {
    id: 'mirpur-11-bus-stand',
    nameBn: 'মিরপুর ১১ মেট্রো স্টেশন / বাস স্ট্যান্ড এরিয়া',
    nameEn: 'Mirpur 11 Metro Station / Bus Stand Area',
    zone: 'Mirpur 11',
    distanceKm: 0.9,
    estimatedDeliveryMin: 11,
    isAvailable: true,
    addressHint: 'মেট্রো সংলগ্ন এলাকা (৯০০ মিটার)'
  },
  {
    id: 'mirpur-12-block-c',
    nameBn: 'মিরপুর ১২, ব্লক সি (মুসলিম বাজার / ঝিলপাড়)',
    nameEn: 'Mirpur 12, Block C (Muslim Bazar / Jheelpar)',
    zone: 'Mirpur 12',
    distanceKm: 1.3,
    estimatedDeliveryMin: 13,
    isAvailable: true,
    addressHint: '১.৩ কিমি - নির্ধারিত ডেলিভারি জোন'
  },
  {
    id: 'mirpur-12-bus-stand',
    nameBn: 'মিরপুর ১২ বাস স্ট্যান্ড ও পল্লবী থানা চত্বর',
    nameEn: 'Mirpur 12 Bus Stand & Pallabi PS Area',
    zone: 'Mirpur 12',
    distanceKm: 1.6,
    estimatedDeliveryMin: 14,
    isAvailable: true,
    addressHint: '১.৬ কিমি - ২ কিমির ভেতরে (অনুমোদিত)'
  },
  {
    id: 'mirpur-12-dohs-gate',
    nameBn: 'মিরপুর ১২, ডিওএইচএস ১ নম্বর গেট সংলগ্ন',
    nameEn: 'Mirpur 12, DOHS Gate 1 Area',
    zone: 'Mirpur 12',
    distanceKm: 1.8,
    estimatedDeliveryMin: 15,
    isAvailable: true,
    addressHint: '১.৮ কিমি - সর্বোচ্চ ১৫ মিনিট গ্যারান্টি'
  },
  {
    id: 'mirpur-10-roundabout',
    nameBn: 'মিরপুর ১০ গোলচত্বর (সীমার বাইরে)',
    nameEn: 'Mirpur 10 Circle (Out of Zone)',
    zone: 'Mirpur 11',
    distanceKm: 2.8,
    estimatedDeliveryMin: 28,
    isAvailable: false,
    addressHint: '২.৮ কিমি - ২ কিমি সীমার বাইরে (শীঘ্রই চালু হবে)'
  },
  {
    id: 'pallabi-ext',
    nameBn: 'পল্লবী এক্সটেনশন (মিরপুর সাড়ে এগারো)',
    nameEn: 'Pallabi Extension (Mirpur 11.5)',
    zone: 'Mirpur 11',
    distanceKm: 1.4,
    estimatedDeliveryMin: 13,
    isAvailable: true,
    addressHint: '১.৪ কিমি - ১৫ মিনিট ডেলিভারি কভারেজ'
  }
];

export const BRN_KITCHEN_LOCATION = {
  name: 'BRN Central Bakery Hub, Mirpur 11 Avenue 3',
  lat: 23.8223,
  lng: 90.3654,
  hotline: '01711-BRN-RUTI',
  maxRadiusKm: 2.0,
  guaranteedTimeMinutes: 15
};

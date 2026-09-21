import { MenuItem, MirpurLocation } from '../types';

export const BRN_BRAND_INFO = {
  nameBn: 'বাংলা রুটি নেটওয়ার্ক',
  nameEn: 'Bangla Roti Network (BRN)',
  sloganBn: '"তাৎক্ষণিক-খাওয়ার-উপযোগী" আটার রুটি উৎপাদন ও ডেলিভারি নেটওয়ার্ক',
  mottoBn: '“স্বাস্থ্যসম্মত খাদ্য প্রস্তুত করি, জনস্বাস্থ্যে অবদান রাখি”',
  addressBn: 'হাউজ- ২০৫, রোড- ১৬, ব্লক- বি, সেকশন-১২, পল্লবী, ঢাকা-১২১৬',
  unitBn: 'পল্লবী মেইন ব্রাঞ্চ ও সেন্ট্রাল কিচেন ইউনিট',
  hotline: '01329593540',
  hotlineAlt: '01329593541',
  email: 'arka.banglaroti@gmail.com',
  deliverySlots: {
    morning: 'সকাল: ৭:০০টা - ১১:০০টা',
    evening: 'সন্ধ্যা: ০৫:৩০টা - ০৯:৩০টা'
  },
  maxRadiusKm: 2.0,
  guaranteedTimeMinutes: 15,
  images: {
    heroCombo: '/images/pdf_roti_dal_combo.png',
    machine: '/images/pdf_machine_production.png',
    rider: '/images/pdf_delivery_rider.png',
    familyBreakfast: '/images/pdf_family_breakfast.png'
  }
};

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'roti-booter-dal-combo',
    nameBn: 'গরম রুটি + বুটের ডাল কম্বো',
    nameEn: 'Piping Hot Roti + Booter Dal Combo',
    descriptionBn: 'গরম রুটির সাথে সুস্বাদু বুটের ডাল একটি সম্পূর্ণ খাবারের সুবিধা। একজন গৃহিণীর নির্ঝঞ্ঝাট সন্ধ্যা-সকাল।',
    descriptionEn: 'Fresh hot puffed rutis paired with slow-cooked aromatic booter dal. The complete meal solution.',
    taglineBn: 'ঝামেলাহীন সন্ধ্যা-সকাল • গৃহিণীর স্বস্তি',
    price: 65,
    unitBn: '১ কম্বো প্যাক',
    unitEn: '1 combo pack',
    category: 'combos',
    prepTimeMinutes: 5,
    popular: true,
    isVegetarian: true,
    badge: 'সেরা কম্বো অফার 🌟',
    calories: '340 kcal',
    image: '/images/pdf_roti_dal_combo.png',
    ingredientsBn: ['৪টি তাজা বাংলা রুটি', '১ বাটি ঘন বুটের ডাল বাগার', 'কাঁচা মরিচ', 'কুচানো পেঁয়াজ'],
    featuresBn: ['১৫ মিনিটে ডেলিভারি', 'থার্মাল ব্যাগে গরম', '১০০% পুষ্টিকর']
  },
  {
    id: 'bangla-ruti-4pack',
    nameBn: '৪টি বাংলা রুটি স্পেশাল প্যাক',
    nameEn: 'Bangla Roti 4-Pack (Brochure Special)',
    descriptionBn: 'সকাল সন্ধ্যায় খাবারের স্বাস্থ্যকর সঙ্গী। নরম ও সুস্বাদু রুটি সবার জন্য। ১০০% ফ্রেশ মেশিনমেড।',
    descriptionEn: 'Healthy everyday meal companion. Puffed, soft, hygienic machine-made whole wheat rotis.',
    taglineBn: '৪টি বাংলা রুটি মাত্র ৩৫ টাকা!',
    price: 35,
    unitBn: '৪ পিস প্যাক',
    unitEn: '4 pcs pack',
    category: 'ruti',
    prepTimeMinutes: 4,
    popular: true,
    isVegetarian: true,
    badge: 'মাত্র ৩৫৳ স্পেশাল 🔥',
    calories: '281 kcal / 100g',
    image: '/images/pdf_bangla_ruti.png',
    ingredientsBn: ['সাদা গমের আটা', 'গুড়া দুধ', 'লবণ', 'বেকিং সোডা', 'ড্ৰাই ইস্ট', 'সয়াবিন তেল', 'সামান্য চিনি'],
    featuresBn: ['100% Fresh', 'Machine Made', 'Hygienic', 'Quick Meal'],
    nutritionFacts: {
      energy: '২৮১ ক্যালরি',
      carbs: '৫৬ গ্রাম',
      protein: '৯.৫ গ্রাম',
      fat: '২.০ গ্রাম',
      fiber: '১.৫ গ্রাম',
      sodium: '২০০ মি.গ্রা.'
    }
  },
  {
    id: 'diafit-roti',
    nameBn: 'DiaFit Roti (ডায়াফিট রুটি)',
    nameEn: 'DiaFit Health & Diabetic Friendly Roti',
    descriptionBn: 'ডায়াবেটিস ও স্বাস্থ্য সচেতন গ্রাহকদের জন্য। Low GI, হাই ফাইবার ও সুগার ফ্রেন্ডলি ফর্মুলা।',
    descriptionEn: 'Specially crafted for diabetics & fitness seekers. Low GI, high fiber, 100% natural seeds.',
    taglineBn: 'সঠিক পছন্দ সুস্থ জীবন • ডায়াবেটিস ফ্রেন্ডলি',
    price: 18,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 5,
    popular: true,
    isVegetarian: true,
    badge: 'ডায়াফিট স্পেশাল 🌿',
    calories: '265 kcal / 100g',
    image: '/images/pdf_diafit_roti.png',
    ingredientsBn: ['লাল আটা', 'ওটস আটা', 'বার্লি পাউডার', 'শিয়া সীড', 'তিসি গুঁড়া', 'মেথি গুঁড়া', 'ইসুবগুল', 'দারুচিনি গুঁড়া', 'ড্ৰাই ইস্ট', 'সূর্যমুখী তেল', 'তিল', 'লবণ'],
    featuresBn: ['Low GI', 'High Fiber', 'Sugar Friendly', 'Machine Made', 'Fresh & Soft'],
    nutritionFacts: {
      energy: '২৬৫ ক্যালরি',
      carbs: '৪৮ গ্রাম',
      protein: '১২.০ গ্রাম',
      fat: '৩.০ গ্রাম',
      fiber: '৮.০ গ্রাম',
      sodium: '১৮০ মি.গ্রা.'
    }
  },
  {
    id: 'youngfuel-roti',
    nameBn: 'YoungFuel Roti (ইয়াংফুয়েল রুটি)',
    nameEn: 'YoungFuel High Protein Energy Booster Roti',
    descriptionBn: 'High Protein Energy Booster - যুবসমাজের শক্তি ও কর্মক্ষমতার স্মার্ট চয়েস।',
    descriptionEn: 'High protein energy booster. Fortified with chickpeas, peanut powder, oats & farm egg.',
    taglineBn: 'যুবসমাজের শক্তি ও কর্মক্ষমতার স্মার্ট চয়েস',
    price: 20,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 5,
    popular: true,
    isVegetarian: false,
    badge: 'উচ্চ প্রোটিন বুস্টার ⚡',
    calories: '280 kcal / 100g',
    image: '/images/pdf_youngfuel_roti.png',
    ingredientsBn: ['লাল আটা', 'ছোলা আটা', 'পিনাট পাউডার', 'বাদাম গুঁড়া', 'ওটস গুঁড়া', 'কাঁচা মুগ', 'ড্ৰাই ইস্ট', 'সূর্যমুখী তেল', 'ডিম', 'লবণ'],
    featuresBn: ['উচ্চ প্রোটিন ও ফাইবার', 'দীর্ঘক্ষণ শক্তি জোগায়', 'দৈহিক ও মানসিক কর্মক্ষমতা বাড়ায়', 'স্বাস্থ্যসম্মত ও সুস্বাদু'],
    nutritionFacts: {
      energy: '২৮০ ক্যালরি',
      carbs: '৫০ গ্রাম',
      protein: '১৪.০ গ্রাম',
      fat: '৬.৫ গ্রাম',
      fiber: '৬.৫ গ্রাম',
      sodium: '১৯০ মি.গ্রা.'
    }
  },
  {
    id: 'rice-flour-roti',
    nameBn: 'চালের আটা রুটি (Rice Flour Roti)',
    nameEn: 'Rice Flour Traditional Soft Roti',
    descriptionBn: 'সুস্বাদু রুটি, ঐতিহ্যের পুষ্টি - নরম, হালকা ও সহজপাচ্য। ১০০% গ্লুটেন ফ্রি, নো অ্যাসিডিটি।',
    descriptionEn: 'Authentic Bangladeshi rice flour flatbread. Delicate, light on stomach, gluten-free.',
    taglineBn: 'নরম, হালকা ও সহজপাচ্য • ১০০% Gluten Free',
    price: 16,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 5,
    isVegetarian: true,
    badge: 'গ্লুটেন ফ্রি 🌾',
    calories: '190 kcal',
    image: '/images/pdf_rice_flour_roti.png',
    ingredientsBn: ['চালের গুঁড়া', 'কুসুম গরম পানি', 'লবণ', 'তেল'],
    featuresBn: ['Gluten Free', 'পেট ফাঁপা বা অ্যাসিডিটি নেই', 'গ্যাস্ট্রিক ও বদহজম দূর করে']
  },
  {
    id: 'spice-kalai-roti',
    nameBn: 'Spice Kalai Roti (স্পাইস কলাই রুটি)',
    nameEn: 'Chapainawabganj Spice Kalai Roti',
    descriptionBn: 'চাঁপাইনবাবগঞ্জের ঐতিহ্যবাহী কলাই রুটি। ২৫% প্রাকৃতিক প্রোটিন সমৃদ্ধ, নরম ও সুস্বাদু।',
    descriptionEn: 'Heritage black gram lentils flatbread from Chapainawabganj. Packed with 25% plant protein.',
    taglineBn: 'চাঁপাইনবাবগঞ্জের ঐতিহ্যবাহী স্বাদ • ২৫% প্রোটিন',
    price: 22,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'ruti',
    prepTimeMinutes: 6,
    isVegetarian: true,
    badge: '২৫% প্রোটিন সমৃদ্ধ 💥',
    calories: '230 kcal',
    image: '/images/pdf_kalai_roti.png',
    ingredientsBn: ['মাষকলাইয়ের আটা', 'আতপ চালের আটা', 'পানি', 'লবণ'],
    featuresBn: ['২৫% প্রোটিন সমৃদ্ধ', 'ঐতিহ্যবাহী স্বাদ', 'সুস্বাদু ও পুষ্টিকর']
  },
  {
    id: 'shahi-paratha',
    nameBn: 'সাদ্দাক সিগনেচার পরোটা',
    nameEn: 'Shaddak Signature Paratha (Low Trans-Fat)',
    descriptionBn: 'গাওয়া ঘি ও উন্নত তেলে ভাজা মচমচে লেয়ার পরোটা। স্বাদ অতুলনীয়, হাইজিনিক ও বনস্পতি মুক্ত।',
    descriptionEn: 'Artisanal multi-layered flaky paratha with pure desi cow ghee. Zero vanaspati, low trans-fat.',
    taglineBn: 'খাঁটি গাওয়া ঘি ও উন্নত তেলের পারফেক্ট লেয়ার',
    price: 25,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'paratha',
    prepTimeMinutes: 6,
    popular: true,
    isVegetarian: true,
    badge: 'সিগনেচার পরোটা ✨',
    calories: '185 kcal',
    image: '/images/pdf_saddak_paratha.png',
    ingredientsBn: ['উন্নত ময়দা', 'খাঁটি গাওয়া ঘি', 'রিফাইন্ড সয়াবিন ও রাইস ব্রান অয়েল', 'সামান্য চিনি', 'লবণ'],
    featuresBn: ['Rich Aroma of Ghee', 'Low Trans-Fat (Vanaspati Free)', 'More Taste & Satisfaction']
  },
  {
    id: 'deshi-booter-dal',
    nameBn: 'ঘরোয়া স্পেশাল বুটের ডাল বাগার',
    nameEn: 'Homestyle Spiced Booter Dal Bagar',
    descriptionBn: 'জিরা, শুকনা মরিচ আর তেজপাতার বাগার দেওয়া ঘন সুস্বাদু বুটের ডাল। রুটির সেরা সঙ্গী।',
    descriptionEn: 'Slow-simmered split Bengal gram tempered with cumin seeds, whole dried red chili and bay leaves.',
    taglineBn: 'জিরা ও শুকনা মরিচের আসল বাগার',
    price: 40,
    unitBn: '১ বাটি',
    unitEn: '1 bowl',
    category: 'curry',
    prepTimeMinutes: 4,
    popular: true,
    isVegetarian: true,
    badge: 'ঘরোয়া বাগার 🍲',
    calories: '140 kcal',
    image: '/images/pdf_roti_dal_combo.png',
    ingredientsBn: ['বুটের ডাল (ছোলার ডাল)', 'জিরা', 'শুকনা মরিচ', 'তেজপাতা', 'সরিষার তেল', 'হলুদ ও ধনে']
  },
  {
    id: 'dim-porota',
    nameBn: 'স্পেশাল ডিম পরোটা রোল',
    nameEn: 'Special Desi Egg Paratha Roll',
    descriptionBn: 'পরোটার ভেতর তাজা দেশি ডিম, পেঁয়াজ, কাঁচামরিচ দিয়ে তৈরি গরম গরম পুষ্টিকর রোল।',
    descriptionEn: 'Hot flaky paratha encasing farm egg omelette with fresh shallots, green chilies and house spice.',
    price: 45,
    unitBn: 'প্রতি পিস',
    unitEn: 'per piece',
    category: 'paratha',
    prepTimeMinutes: 7,
    badge: 'নাস্তা স্পেশাল 🍳',
    calories: '280 kcal',
    image: '/images/pdf_saddak_paratha.png'
  },
  {
    id: 'alu-sobji-torkari',
    nameBn: 'পাঁচফোড়ন কাশ্মীরি আলু ভাজি / দম',
    nameEn: 'Kashmiri Alur Dom & Potato Curry',
    descriptionBn: 'কাশ্মীরি স্টাইল আলুর দম ও পাঁচফোড়ন দিয়ে কষানো সুস্বাদু ঘরোয়া তরকারি। রুটি-পরোটার সেরা জুটি।',
    descriptionEn: 'Homestyle Kashmiri spiced baby potatoes cooked in rich fragrant gravy.',
    price: 35,
    unitBn: '১ বাটি',
    unitEn: '1 bowl',
    category: 'curry',
    prepTimeMinutes: 4,
    isVegetarian: true,
    calories: '110 kcal',
    image: '/images/pdf_alur_dom.png'
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
    calories: '260 kcal',
    image: '/images/pdf_alur_dom.png'
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
    calories: '95 kcal',
    image: '/images/pdf_youngfuel_roti.png'
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
    calories: '120 kcal',
    image: '/images/pdf_shahi_cha.png'
  }
];

export const MIRPUR_LOCATIONS: MirpurLocation[] = [
  {
    id: 'pallabi-main',
    nameBn: 'পল্লবী (প্রধান ইউনিট - সেকশন ১২)',
    nameEn: 'Pallabi Main Unit (Section 12)',
    zone: 'Mirpur 12',
    distanceKm: 0.3,
    estimatedDeliveryMin: 10,
    isAvailable: true,
    addressHint: 'হাউজ ২০৫, রোড ১৬, ব্লক বি (সেন্ট্রাল কিচেন সংলগ্ন)'
  },
  {
    id: 'mirpur-dohs',
    nameBn: 'মিরপুর ডিওএইচএস (Mirpur DOHS)',
    nameEn: 'Mirpur DOHS Residential Zone',
    zone: 'Mirpur 12',
    distanceKm: 1.2,
    estimatedDeliveryMin: 12,
    isAvailable: true,
    addressHint: 'গেট ১ ও ২ সংলগ্ন এলাকা (১.২ কিমি)'
  },
  {
    id: 'mirpur-11-avenue-4',
    nameBn: 'মিরপুর-১১ (এভিনিউ ৪ ও নানক চত্বর)',
    nameEn: 'Mirpur-11 (Avenue 4 & Nanna Mor)',
    zone: 'Mirpur 11',
    distanceKm: 0.8,
    estimatedDeliveryMin: 11,
    isAvailable: true,
    addressHint: 'মেট্রো স্টেশন ও কালশী রোড সংলগ্ন (৮০০ মিটার)'
  },
  {
    id: 'mirpur-12-block-c',
    nameBn: 'মিরপুর-১২ (ব্লক সি ও মুসলিম বাজার)',
    nameEn: 'Mirpur-12 (Block C & Muslim Bazar)',
    zone: 'Mirpur 12',
    distanceKm: 1.1,
    estimatedDeliveryMin: 12,
    isAvailable: true,
    addressHint: 'ঝিলপাড় ও বাসস্ট্যান্ড এরিয়া (১.১ কিমি)'
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
  }
];

export const BRN_SERVICES = [
  {
    id: 'machine-production',
    titleBn: 'স্বয়ংক্রিয় মেশিনে তাজা রুটি উৎপাদন',
    descBn: 'প্রতিদিন স্বাস্থ্যসম্মত পরিবেশে সম্পূর্ণ আধুনিক মেশিনে তৈরি তাজা রুটি প্রস্তুত ও সরবরাহ।',
    icon: 'Flame'
  },
  {
    id: 'classified-roti',
    titleBn: 'পুষ্টিকর ও শ্রেণীবদ্ধ রুটি-পরোটা',
    descBn: 'ডায়াবেটিসের জন্য DiaFit, কর্মক্ষমতার জন্য YoungFuel, গ্লুটেন ফ্রি চালের রুটি ও ঐতিহ্যবাহী কলাই রুটি।',
    icon: 'Sparkles'
  },
  {
    id: 'combo-meal',
    titleBn: 'রুটি + বুটের ডাল কম্বো',
    descBn: 'গরম রুটির সাথে সুস্বাদু বুটের ডাল। একজন গৃহিণীর নির্ঝঞ্ঝাট সকাল ও সন্ধ্যার পুষ্টিকর খাবার।',
    icon: 'Package'
  },
  {
    id: 'own-rider',
    titleBn: 'Own Rider Routing System',
    descBn: 'নিজস্ব ডেলিভারি কর্মী ও ডিজিটাল পথ নির্দেশক ব্যবস্থা—নির্ধারিত সর্বোচ্চ ২ কিমি রুটে ১৫ মিনিটে হোম ডেলিভারি।',
    icon: 'Bike'
  },
  {
    id: 'digital-wallet',
    titleBn: 'প্রিপেইড ওয়ালেট ও অনলাইন সুবিধা',
    descBn: 'bKash, নগদ ও Rocket-এ নিরাপদ ডিজিটাল পেমেন্ট—খুচরা ও ভাঙতি টাকার ঝামেলাহীন ব্যবস্থা।',
    icon: 'Wallet'
  },
  {
    id: 'wholesale-supply',
    titleBn: 'পাইকারি রুটি সরবরাহ সার্ভিস',
    descBn: 'হাসপাতাল, মাদ্রাসা, হোস্টেল, কারখানা ও অফিসের জন্য প্রতিদিনের পাইকারি রুটি সরবরাহ চুক্তি।',
    icon: 'Building'
  }
];

export const BRN_KITCHEN_LOCATION = {
  name: 'Bangla Roti Network, Central Kitchen, Pallabi',
  lat: 23.8223,
  lng: 90.3654,
  hotline: '01329593540',
  hotlineAlt: '01329593541',
  email: 'arka.banglaroti@gmail.com',
  address: 'হাউজ- ২০৫, রোড- ১৬, ব্লক- বি, সেকশন-১২, পল্লবী, ঢাকা-১২১৬',
  maxRadiusKm: 2.0,
  guaranteedTimeMinutes: 15
};

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

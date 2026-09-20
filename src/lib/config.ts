export const APP_CONFIG = {
  name: 'UMA',
  fullName: 'UMA B2B Agricultural Marketplace',
  description: 'Scheduled farm produce directly from Butuan-area farmers to commercial kitchens.',
  location: {
    city: 'Butuan City',
    province: 'Agusan del Norte',
    region: 'Caraga (Region XIII)',
    country: 'Philippines',
    defaultPhonePrefix: '+63',
  },
  timezone: 'Asia/Manila',
  cutoff: {
    hour: 20, // 8:00 PM Manila
    minute: 0,
    readableTime: '8:00 PM',
  },
  economics: {
    commissionRate: 0.08, // 8% commission on produce subtotal
    deliveryFeeOneToOneCentavos: 15000, // ₱150.00
    deliveryFeePooledCentavos: 10000,   // ₱100.00
    minOrderDefaultKg: 5,
    firstOrderDeliveryCredit: true,     // First-order waived delivery fee flag
  },
  deliveryWindows: [
    { id: 'MORNING_6_9', label: 'Morning (6:00 AM – 9:00 AM)', startHour: 6, endHour: 9 },
    { id: 'MIDDAY_10_1', label: 'Midday (10:00 AM – 1:00 PM)', startHour: 10, endHour: 13 },
    { id: 'AFTERNOON_2_5', label: 'Afternoon (2:00 PM – 5:00 PM)', startHour: 14, endHour: 17 },
  ] as const,
  categories: [
    'Vegetables',
    'Root Crops',
    'Fruits',
    'Dairy & Eggs',
    'Staples & Grains',
    'Herbs & Spices',
  ] as const,
  units: ['KG', 'PIECE', 'TRAY', 'LITER', 'BOTTLE', 'BUNCH'] as const,
} as const;

export type DeliveryWindowId = (typeof APP_CONFIG.deliveryWindows)[number]['id'];
export type ProductCategory = (typeof APP_CONFIG.categories)[number];

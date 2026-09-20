import { APP_CONFIG } from './config';

/**
 * Formats integer centavos into a formatted Philippine Peso (₱) string.
 * Example: 184000 -> "₱1,840.00" or "₱1,840"
 */
export function formatPeso(
  centavos: number,
  options: { showDecimals?: boolean; compact?: boolean } = {}
): string {
  const { showDecimals = true, compact = false } = options;
  const pesos = centavos / 100;

  if (compact && Math.abs(pesos) >= 1000000) {
    return `₱${(pesos / 1000000).toFixed(1)}M`;
  }
  if (compact && Math.abs(pesos) >= 1000) {
    return `₱${(pesos / 1000).toFixed(1)}k`;
  }

  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return formatter.format(pesos);
}

/**
 * Converts pesos to integer centavos safely rounding to avoid float drift.
 */
export function pesosToCentavos(pesos: number): number {
  return Math.round(pesos * 100);
}

/**
 * Converts integer centavos to floating pesos.
 */
export function centavosToPesos(centavos: number): number {
  return centavos / 100;
}

/**
 * Calculates platform commission on produce subtotal.
 * Rate defaults to 8% (0.08).
 * Half-up rounding to nearest centavo.
 */
export function calculateCommissionCentavos(
  subtotalCentavos: number,
  rate: number = APP_CONFIG.economics.commissionRate
): number {
  if (subtotalCentavos <= 0) return 0;
  return Math.round(subtotalCentavos * rate);
}

/**
 * Pure calculation of line item price in centavos.
 */
export function calculateLineTotalCentavos(qtyKg: number, pricePerKgCentavos: number): number {
  return Math.round(qtyKg * pricePerKgCentavos);
}

export interface OrderItemPricingInput {
  qty: number;
  priceCentavos: number;
}

export interface OrderPricingResult {
  subtotalCentavos: number;
  commissionCentavos: number;
  deliveryFeeCentavos: number;
  discountCentavos: number;
  totalCentavos: number;
  farmerNetCentavos: number;
}

/**
 * Computes complete financial breakdown of an order in integer centavos.
 * Guarantee: sum of parts equals total, and farmerNet = subtotal - commission.
 */
export function calculateOrderPricing(params: {
  items: OrderItemPricingInput[];
  deliveryFeeCentavos?: number;
  applyFirstOrderDiscount?: boolean;
}): OrderPricingResult {
  const {
    items,
    deliveryFeeCentavos = APP_CONFIG.economics.deliveryFeeOneToOneCentavos,
    applyFirstOrderDiscount = false,
  } = params;

  let subtotalCentavos = 0;
  for (const item of items) {
    subtotalCentavos += calculateLineTotalCentavos(item.qty, item.priceCentavos);
  }

  const commissionCentavos = calculateCommissionCentavos(subtotalCentavos);
  const discountCentavos = applyFirstOrderDiscount ? deliveryFeeCentavos : 0;
  const totalCentavos = Math.max(0, subtotalCentavos + deliveryFeeCentavos - discountCentavos);
  const farmerNetCentavos = Math.max(0, subtotalCentavos - commissionCentavos);

  return {
    subtotalCentavos,
    commissionCentavos,
    deliveryFeeCentavos,
    discountCentavos,
    totalCentavos,
    farmerNetCentavos,
  };
}

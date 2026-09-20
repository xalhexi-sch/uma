import { describe, it, expect } from 'vitest';
import {
  formatPeso,
  pesosToCentavos,
  centavosToPesos,
  calculateCommissionCentavos,
  calculateOrderPricing,
} from '@/lib/money';

describe('Money and Centavos arithmetic', () => {
  it('converts pesos to centavos and back accurately', () => {
    expect(pesosToCentavos(150.5)).toBe(15050);
    expect(centavosToPesos(15050)).toBe(150.5);
    expect(pesosToCentavos(0)).toBe(0);
  });

  it('formats centavos into Philippine Pesos (₱)', () => {
    expect(formatPeso(184000)).toBe('₱1,840.00');
    expect(formatPeso(15000)).toBe('₱150.00');
    expect(formatPeso(0)).toBe('₱0.00');
    expect(formatPeso(184000, { showDecimals: false })).toBe('₱1,840');
  });

  it('calculates 8% commission accurately with half-up rounding', () => {
    // ₱2,000.00 (200000 centavos) * 0.08 = 16000 centavos (₱160.00)
    expect(calculateCommissionCentavos(200000)).toBe(16000);

    // ₱125.75 (12575 centavos) * 0.08 = 1006 centavos (₱10.06)
    expect(calculateCommissionCentavos(12575)).toBe(1006);

    // 0 subtotal yields 0 commission
    expect(calculateCommissionCentavos(0)).toBe(0);
  });

  it('guarantees parts sum to total exactly', () => {
    const items = [
      { qty: 10, priceCentavos: 12000 }, // 10 kg @ ₱120 = ₱1,200 (120000)
      { qty: 5, priceCentavos: 8000 },   // 5 kg @ ₱80 = ₱400 (40000)
    ];
    // Subtotal = 160000 (₱1,600)
    // Delivery fee = 15000 (₱150)
    // Commission = 12800 (₱128)
    const result = calculateOrderPricing({
      items,
      deliveryFeeCentavos: 15000,
      applyFirstOrderDiscount: false,
    });

    expect(result.subtotalCentavos).toBe(160000);
    expect(result.deliveryFeeCentavos).toBe(15000);
    expect(result.discountCentavos).toBe(0);
    expect(result.totalCentavos).toBe(175000); // ₱1,750
    expect(result.commissionCentavos).toBe(12800); // ₱128
    expect(result.farmerNetCentavos).toBe(147200); // ₱1,472

    // Sum invariant check: total = subtotal + delivery - discount
    expect(result.totalCentavos).toBe(
      result.subtotalCentavos + result.deliveryFeeCentavos - result.discountCentavos
    );
    // Farmer net invariant: net = subtotal - commission
    expect(result.farmerNetCentavos).toBe(
      result.subtotalCentavos - result.commissionCentavos
    );
  });

  it('correctly applies first-order delivery discount', () => {
    const items = [{ qty: 10, priceCentavos: 10000 }];
    const result = calculateOrderPricing({
      items,
      deliveryFeeCentavos: 15000,
      applyFirstOrderDiscount: true,
    });

    expect(result.subtotalCentavos).toBe(100000);
    expect(result.deliveryFeeCentavos).toBe(15000);
    expect(result.discountCentavos).toBe(15000);
    expect(result.totalCentavos).toBe(100000); // Delivery fee fully credited
  });
});

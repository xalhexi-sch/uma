import { describe, it, expect } from 'vitest';
import { isBeforeCutoff, getEarliestDeliveryDate, getTimeUntilCutoff, formatManilaDate } from '@/lib/dates';

describe('Cutoff and Manila Scheduling Rules', () => {
  it('identifies before vs after 8:00 PM Manila cutoff', () => {
    // 7:59 PM Manila (UTC+8) is 11:59 AM UTC on the same day
    const at759PM = new Date(Date.UTC(2026, 8, 20, 11, 59, 0));
    expect(isBeforeCutoff(at759PM)).toBe(true);

    // 8:00 PM Manila (UTC+8) is 12:00 PM UTC on the same day
    const at800PM = new Date(Date.UTC(2026, 8, 20, 12, 0, 0));
    expect(isBeforeCutoff(at800PM)).toBe(false);

    // 8:01 PM Manila (UTC+8) is 12:01 PM UTC on the same day
    const at801PM = new Date(Date.UTC(2026, 8, 20, 12, 1, 0));
    expect(isBeforeCutoff(at801PM)).toBe(false);
  });

  it('determines earliest delivery date correctly', () => {
    // Placed at 5:00 PM Manila on Sep 20, 2026 -> earliest is Sep 21, 2026
    const beforeCutoffTime = new Date(Date.UTC(2026, 8, 20, 9, 0, 0));
    const earliestBefore = getEarliestDeliveryDate(beforeCutoffTime);
    expect(formatManilaDate(earliestBefore, 'full')).toContain('Sep 21, 2026');

    // Placed at 8:15 PM Manila on Sep 20, 2026 -> earliest is Sep 22, 2026
    const afterCutoffTime = new Date(Date.UTC(2026, 8, 20, 12, 15, 0));
    const earliestAfter = getEarliestDeliveryDate(afterCutoffTime);
    expect(formatManilaDate(earliestAfter, 'full')).toContain('Sep 22, 2026');
  });

  it('computes countdown remaining until cutoff', () => {
    // 6:30 PM Manila -> 1 hour 30 min left
    const at630PM = new Date(Date.UTC(2026, 8, 20, 10, 30, 0));
    const countdown = getTimeUntilCutoff(at630PM);
    expect(countdown.isBeforeCutoff).toBe(true);
    expect(countdown.hours).toBe(1);
    expect(countdown.minutes).toBe(30);
    expect(countdown.countdownText).toContain('1h 30m');
  });
});

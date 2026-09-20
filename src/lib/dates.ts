import { APP_CONFIG, DeliveryWindowId } from './config';

/**
 * Returns current date/time components converted to Asia/Manila.
 */
export function getManilaParts(date: Date = new Date()): {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  second: number;
  dayOfWeek: number; // 0 (Sun) - 6 (Sat)
} {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: APP_CONFIG.timezone,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    weekday: 'short',
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const find = (type: string) => {
    const p = parts.find((part) => part.type === type);
    return p ? parseInt(p.value, 10) : 0;
  };

  const dayOfWeekStr = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dayOfWeek = days.indexOf(dayOfWeekStr);

  return {
    year: find('year'),
    month: find('month'),
    day: find('day'),
    hour: find('hour'),
    minute: find('minute'),
    second: find('second'),
    dayOfWeek: dayOfWeek >= 0 ? dayOfWeek : 0,
  };
}

/**
 * Returns whether current time in Manila is before the 8:00 PM cutoff.
 */
export function isBeforeCutoff(now: Date = new Date()): boolean {
  const { hour, minute } = getManilaParts(now);
  if (hour < APP_CONFIG.cutoff.hour) return true;
  if (hour === APP_CONFIG.cutoff.hour && minute < APP_CONFIG.cutoff.minute) return true;
  return false;
}

/**
 * Calculates time remaining until 8:00 PM Manila cutoff.
 */
export function getTimeUntilCutoff(now: Date = new Date()): {
  isBeforeCutoff: boolean;
  hours: number;
  minutes: number;
  countdownText: string;
} {
  const { hour, minute } = getManilaParts(now);
  const cutoffMinutes = APP_CONFIG.cutoff.hour * 60 + APP_CONFIG.cutoff.minute;
  const currentMinutes = hour * 60 + minute;

  if (currentMinutes < cutoffMinutes) {
    const diff = cutoffMinutes - currentMinutes;
    const h = Math.floor(diff / 60);
    const m = diff % 60;
    const countdownText = h > 0 ? `${h}h ${m}m` : `${m}m`;
    return {
      isBeforeCutoff: true,
      hours: h,
      minutes: m,
      countdownText: `Order in the next ${countdownText} for tomorrow`,
    };
  }

  return {
    isBeforeCutoff: false,
    hours: 0,
    minutes: 0,
    countdownText: `Cutoff passed for tomorrow (${APP_CONFIG.cutoff.readableTime}). Earliest delivery is day after tomorrow.`,
  };
}

/**
 * Computes the earliest delivery date available based on Manila 8:00 PM cutoff.
 * Before 8 PM: tomorrow (Day + 1).
 * At or after 8 PM: day after tomorrow (Day + 2).
 */
export function getEarliestDeliveryDate(now: Date = new Date()): Date {
  const { year, month, day } = getManilaParts(now);
  const beforeCutoff = isBeforeCutoff(now);
  const daysToAdd = beforeCutoff ? 1 : 2;

  // Construct UTC date at 00:00:00 Manila (which is previous day 16:00 UTC)
  // Manila is UTC+8
  const baseUtc = Date.UTC(year, month - 1, day + daysToAdd, 0, 0, 0);
  return new Date(baseUtc);
}

/**
 * Formats a date into a human-friendly string in Manila time.
 * Example: "Tomorrow, Tue 22 Sep" or "Thu 24 Sep 2026"
 */
export function formatManilaDate(
  date: Date | string,
  style: 'friendly' | 'short' | 'full' = 'friendly'
): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(targetDate.getTime())) return '';

  const now = new Date();
  const manilaNow = getManilaParts(now);
  const manilaTarget = getManilaParts(targetDate);

  const isToday =
    manilaNow.year === manilaTarget.year &&
    manilaNow.month === manilaTarget.month &&
    manilaNow.day === manilaTarget.day;

  const isTomorrow =
    manilaNow.year === manilaTarget.year &&
    manilaNow.month === manilaTarget.month &&
    manilaNow.day + 1 === manilaTarget.day;

  if (style === 'friendly') {
    const dayAndMonth = new Intl.DateTimeFormat('en-US', {
      timeZone: APP_CONFIG.timezone,
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    }).format(targetDate);

    if (isToday) return `Today, ${dayAndMonth}`;
    if (isTomorrow) return `Tomorrow, ${dayAndMonth}`;
    return dayAndMonth;
  }

  if (style === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: APP_CONFIG.timezone,
      month: 'short',
      day: 'numeric',
    }).format(targetDate);
  }

  return new Intl.DateTimeFormat('en-US', {
    timeZone: APP_CONFIG.timezone,
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(targetDate);
}

/**
 * Formats a delivery window ID with date in Manila time.
 * Example: "Tomorrow, Tue 22 Sep · 6:00 AM – 9:00 AM"
 */
export function formatDeliveryWindow(
  windowId: DeliveryWindowId | string,
  date: Date | string
): string {
  const windowConfig = APP_CONFIG.deliveryWindows.find((w) => w.id === windowId);
  const dateStr = formatManilaDate(date, 'friendly');
  const windowLabel = windowConfig ? windowConfig.label : windowId;
  return `${dateStr} · ${windowLabel}`;
}

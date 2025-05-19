import { formatDistance, parseISO } from "date-fns";
import { differenceInDays } from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // Set time to local midnight
  today.setHours(0, 0, 0, 0);

  // Get timezone offset in milliseconds
  const tzOffsetMs = today.getTimezoneOffset() * 60 * 1000;

  // Adjust for local timezone to get UTC midnight
  const utcDate = new Date(today.getTime() - tzOffsetMs);

  if (options?.end) {
    utcDate.setUTCHours(23, 59, 59, 999);
  }

  return utcDate.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "PHP" }).format(
    value
  );

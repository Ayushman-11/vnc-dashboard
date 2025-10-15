import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { TIME_FORMAT, DATE_FORMAT, DATETIME_FORMAT } from '../constants';

// Format a date object or string to a specific format
export const formatDate = (date, formatString = DATE_FORMAT) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
};

// Format a date to time only
export const formatTime = (date) => formatDate(date, TIME_FORMAT);

// Format a date to full datetime
export const formatDateTime = (date) => formatDate(date, DATETIME_FORMAT);

// Format a date as relative time (e.g., "2 minutes ago")
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
};

// Get current timestamp
export const getCurrentTimestamp = () => new Date().toISOString();

// Check if date is today
export const isToday = (date) => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  const today = new Date();
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

// Get date range for filters
export const getDateRange = (range) => {
  const now = new Date();
  const start = new Date();
  
  switch (range) {
    case '1h':
      start.setHours(now.getHours() - 1);
      break;
    case '24h':
      start.setHours(now.getHours() - 24);
      break;
    case '7d':
      start.setDate(now.getDate() - 7);
      break;
    case '30d':
      start.setDate(now.getDate() - 30);
      break;
    default:
      start.setHours(now.getHours() - 24);
  }
  
  return { start: start.toISOString(), end: now.toISOString() };
};

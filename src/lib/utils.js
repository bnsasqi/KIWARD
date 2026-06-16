// ============================================
// KiWARD Utility Functions
// ============================================

import { CURRENCY } from './constants';

/**
 * Format currency amount in Peruvian Soles
 */
export function formatCurrency(amount) {
  return `${CURRENCY.symbol} ${Number(amount).toFixed(2)}`;
}

/**
 * Format a date to locale string
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  };
  return new Date(date).toLocaleDateString('es-PE', defaultOptions);
}

/**
 * Format a date to include time
 */
export function formatDateTime(date) {
  return new Date(date).toLocaleString('es-PE', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Get relative time string (e.g., "hace 5 minutos")
 */
export function getRelativeTime(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Justo ahora';
  if (minutes < 60) return `Hace ${minutes} min`;
  if (hours < 24) return `Hace ${hours}h`;
  if (days < 7) return `Hace ${days}d`;
  return formatDate(date);
}

/**
 * Generate a random operation code
 */
export function generateOperationCode() {
  const prefix = String(Math.floor(Math.random() * 900) + 100);
  const suffix = String(Math.floor(Math.random() * 9000000) + 1000000);
  return `${prefix}-${suffix}`;
}

/**
 * Generate a random transaction ID
 */
export function generateTransactionId() {
  return 'TXN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

/**
 * Mask phone number for privacy
 */
export function maskPhone(phone) {
  if (!phone || phone.length < 6) return phone;
  return phone.slice(0, 3) + '***' + phone.slice(-3);
}

/**
 * Calculate fraud score color
 */
export function getFraudScoreColor(score) {
  if (score <= 20) return 'var(--kw-success)';
  if (score <= 50) return 'var(--kw-warning)';
  if (score <= 75) return '#FF6B35';
  return 'var(--kw-danger)';
}

/**
 * Get initials from a name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Delay utility for async operations
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate random number in range
 */
export function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generate sample Peruvian names
 */
export function getRandomPeruvianName() {
  const names = [
    'María García', 'José López', 'Rosa Huamán', 'Carlos Quispe',
    'Ana Flores', 'Pedro Chávez', 'Lucía Mendoza', 'Juan Torres',
    'Carmen Rojas', 'Miguel Sánchez', 'Teresa Díaz', 'Luis Vargas',
    'Elena Ramos', 'Roberto Castillo', 'Isabel Paredes', 'Manuel Cruz',
    'Patricia Morales', 'Fernando Gutiérrez', 'Silvia Espinoza', 'Andrés Vega',
  ];
  return names[Math.floor(Math.random() * names.length)];
}

/**
 * Generate random Peruvian phone number
 */
export function getRandomPhone() {
  const prefixes = ['9'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const number = String(Math.floor(Math.random() * 90000000) + 10000000);
  return prefix + number;
}

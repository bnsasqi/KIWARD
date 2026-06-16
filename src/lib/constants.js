// ============================================
// KiWARD Constants
// ============================================

export const APP_NAME = 'KiWARD';
export const APP_DESCRIPTION = 'Protección antifraude para pagos digitales en Perú';
export const APP_VERSION = '1.0.0';

// Payment Methods
export const PAYMENT_METHODS = {
  YAPE: { id: 'yape', name: 'Yape', icon: '💜', color: '#6B2D8B', provider: 'BCP' },
  PLIN: { id: 'plin', name: 'Plin', icon: '💚', color: '#00BFA6', provider: 'Múltiple' },
  BIPAY: { id: 'bipay', name: 'BiPay', icon: '🧡', color: '#FF6B35', provider: 'BanBif' },
  BCP: { id: 'bcp', name: 'BCP', icon: '🏦', color: '#002A8D', provider: 'BCP' },
  INTERBANK: { id: 'interbank', name: 'Interbank', icon: '🏦', color: '#00A94F', provider: 'Interbank' },
  BBVA: { id: 'bbva', name: 'BBVA', icon: '🏦', color: '#004481', provider: 'BBVA' },
  SCOTIABANK: { id: 'scotiabank', name: 'Scotiabank', icon: '🏦', color: '#EC1C24', provider: 'Scotiabank' },
};

// Transaction Statuses
export const TRANSACTION_STATUS = {
  PENDING: { id: 'PENDING', label: 'Pendiente', color: 'warning', icon: '⏳' },
  VERIFIED: { id: 'VERIFIED', label: 'Verificado', color: 'success', icon: '✅' },
  REJECTED: { id: 'REJECTED', label: 'Rechazado', color: 'danger', icon: '❌' },
  FRAUD: { id: 'FRAUD', label: 'Fraude', color: 'danger', icon: '🚨' },
  REVIEWING: { id: 'REVIEWING', label: 'En Revisión', color: 'info', icon: '🔍' },
};

// Fraud Alert Types
export const FRAUD_TYPES = {
  FAKE_SCREENSHOT: { id: 'FAKE_SCREENSHOT', label: 'Captura Falsa', severity: 'HIGH', icon: '📸' },
  DUPLICATE_CODE: { id: 'DUPLICATE_CODE', label: 'Código Duplicado', severity: 'CRITICAL', icon: '🔄' },
  AMOUNT_MISMATCH: { id: 'AMOUNT_MISMATCH', label: 'Monto Diferente', severity: 'HIGH', icon: '💰' },
  FAKE_APP: { id: 'FAKE_APP', label: 'App Falsa', severity: 'CRITICAL', icon: '📱' },
  SUSPICIOUS_PATTERN: { id: 'SUSPICIOUS_PATTERN', label: 'Patrón Sospechoso', severity: 'MEDIUM', icon: '⚠️' },
  TIME_MISMATCH: { id: 'TIME_MISMATCH', label: 'Horario Inusual', severity: 'LOW', icon: '🕐' },
};

// Severity Levels
export const SEVERITY = {
  LOW: { id: 'LOW', label: 'Bajo', color: '#339AF0' },
  MEDIUM: { id: 'MEDIUM', label: 'Medio', color: '#FFD93D' },
  HIGH: { id: 'HIGH', label: 'Alto', color: '#FF6B35' },
  CRITICAL: { id: 'CRITICAL', label: 'Crítico', color: '#FF4757' },
};

// Business Types
export const BUSINESS_TYPES = {
  BODEGA: { id: 'BODEGA', label: 'Bodega', icon: '🏪' },
  QUIOSCO: { id: 'QUIOSCO', label: 'Quiosco', icon: '🏬' },
  TIENDA: { id: 'TIENDA', label: 'Tienda', icon: '🛍️' },
  RESTAURANTE: { id: 'RESTAURANTE', label: 'Restaurante', icon: '🍽️' },
  FARMACIA: { id: 'FARMACIA', label: 'Farmacia', icon: '💊' },
  MERCADO: { id: 'MERCADO', label: 'Puesto de Mercado', icon: '🧺' },
  OTRO: { id: 'OTRO', label: 'Otro', icon: '📦' },
};

// Subscription Plans
export const PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Bodeguero',
    price: 0,
    period: 'mes',
    description: 'Para bodegas y quioscos pequeños',
    features: [
      'Hasta 50 verificaciones/mes',
      '1 método de pago',
      'Notificaciones web',
      'Historial de 30 días',
      'Soporte por email',
    ],
    limits: { verifications: 50, paymentMethods: 1, historyDays: 30 },
  },
  BASIC: {
    id: 'BASIC',
    name: 'Comerciante',
    price: 29.90,
    period: 'mes',
    description: 'Para negocios en crecimiento',
    features: [
      'Hasta 500 verificaciones/mes',
      '3 métodos de pago',
      'Notificaciones web + push',
      'Historial de 90 días',
      'Alertas de fraude avanzadas',
      'Reportes mensuales',
      'Soporte prioritario',
    ],
    limits: { verifications: 500, paymentMethods: 3, historyDays: 90 },
  },
  PREMIUM: {
    id: 'PREMIUM',
    name: 'Empresarial',
    price: 79.90,
    period: 'mes',
    description: 'Para cadenas y múltiples locales',
    features: [
      'Verificaciones ilimitadas',
      'Todos los métodos de pago',
      'Notificaciones web + push + SMS',
      'Historial ilimitado',
      'IA anti-fraude avanzada',
      'Reportes personalizados',
      'API de integración',
      'Soporte 24/7',
      'Multi-sucursal',
    ],
    limits: { verifications: Infinity, paymentMethods: 7, historyDays: Infinity },
  },
};

// Notification Types
export const NOTIFICATION_TYPES = {
  PAYMENT_VERIFIED: { id: 'PAYMENT_VERIFIED', icon: '✅', color: 'success', sound: 'success' },
  FRAUD_ALERT: { id: 'FRAUD_ALERT', icon: '🚨', color: 'danger', sound: 'alert' },
  PAYMENT_PENDING: { id: 'PAYMENT_PENDING', icon: '⏳', color: 'warning', sound: 'pending' },
  SYSTEM: { id: 'SYSTEM', icon: '🔔', color: 'info', sound: null },
};

// Navigation Items
export const NAV_ITEMS = [
  { path: '/dashboard', label: 'Panel General', icon: '📊' },
  { path: '/dashboard/verify', label: 'Verificar Pago', icon: '🔍' },
  { path: '/dashboard/transactions', label: 'Transacciones', icon: '💳' },
  { path: '/dashboard/alerts', label: 'Alertas', icon: '🚨', badge: true },
  { path: '/dashboard/reports', label: 'Reportes', icon: '📈' },
  { path: '/dashboard/settings', label: 'Configuración', icon: '⚙️' },
];

// Currency
export const CURRENCY = {
  code: 'PEN',
  symbol: 'S/',
  name: 'Sol Peruano',
};

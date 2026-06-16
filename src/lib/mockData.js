// ============================================
// KiWARD Mock Data for MVP Demo
// ============================================

import { 
  generateOperationCode, 
  generateTransactionId, 
  getRandomPeruvianName, 
  getRandomPhone,
  randomInRange 
} from './utils';

/**
 * Generate mock transactions for demo
 */
export function generateMockTransactions(count = 20) {
  const methods = ['YAPE', 'PLIN', 'BIPAY'];
  const statuses = ['VERIFIED', 'VERIFIED', 'VERIFIED', 'PENDING', 'FRAUD', 'REJECTED'];
  
  return Array.from({ length: count }, (_, i) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const method = methods[Math.floor(Math.random() * methods.length)];
    const hoursAgo = i * randomInRange(1, 4);
    const createdAt = new Date(Date.now() - hoursAgo * 3600000);
    
    return {
      id: generateTransactionId(),
      operationCode: generateOperationCode(),
      amount: randomInRange(1, 250) + (Math.random() * 0.99),
      currency: 'PEN',
      senderName: getRandomPeruvianName(),
      senderPhone: getRandomPhone(),
      paymentMethod: method,
      status,
      fraudScore: status === 'FRAUD' ? randomInRange(75, 100) : 
                  status === 'REJECTED' ? randomInRange(50, 80) :
                  status === 'PENDING' ? randomInRange(20, 50) :
                  randomInRange(0, 20),
      createdAt: createdAt.toISOString(),
      verifiedAt: status === 'VERIFIED' ? new Date(createdAt.getTime() + randomInRange(1, 30) * 1000).toISOString() : null,
    };
  });
}

/**
 * Generate mock notifications
 */
export function generateMockNotifications() {
  return [
    {
      id: 'n1',
      type: 'PAYMENT_VERIFIED',
      title: 'Pago verificado',
      message: 'Se verificó un pago de S/ 45.50 vía Yape de María García',
      isRead: false,
      createdAt: new Date(Date.now() - 120000).toISOString(),
    },
    {
      id: 'n2',
      type: 'FRAUD_ALERT',
      title: '⚠️ Alerta de fraude detectada',
      message: 'Se detectó un intento de pago con captura falsa. Código de operación duplicado.',
      isRead: false,
      createdAt: new Date(Date.now() - 300000).toISOString(),
    },
    {
      id: 'n3',
      type: 'PAYMENT_VERIFIED',
      title: 'Pago verificado',
      message: 'Se verificó un pago de S/ 12.00 vía Plin de José López',
      isRead: true,
      createdAt: new Date(Date.now() - 600000).toISOString(),
    },
    {
      id: 'n4',
      type: 'SYSTEM',
      title: 'Bienvenido a KiWARD',
      message: 'Tu cuenta ha sido activada. Configura tus métodos de pago para empezar.',
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: 'n5',
      type: 'PAYMENT_VERIFIED',
      title: 'Pago verificado',
      message: 'Se verificó un pago de S/ 89.90 vía BiPay de Carlos Quispe',
      isRead: true,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 'n6',
      type: 'FRAUD_ALERT',
      title: '⚠️ Monto no coincide',
      message: 'El monto mostrado (S/ 100.00) no coincide con el monto recibido (S/ 10.00)',
      isRead: false,
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
  ];
}

/**
 * Generate mock fraud alerts
 */
export function generateMockAlerts() {
  return [
    {
      id: 'a1',
      type: 'DUPLICATE_CODE',
      severity: 'CRITICAL',
      title: 'Código de operación duplicado',
      description: 'El código 142-8934521 ya fue utilizado hace 2 horas. Posible reutilización de comprobante.',
      transactionAmount: 85.00,
      paymentMethod: 'YAPE',
      senderName: 'Usuario Desconocido',
      createdAt: new Date(Date.now() - 300000).toISOString(),
      resolved: false,
    },
    {
      id: 'a2',
      type: 'AMOUNT_MISMATCH',
      severity: 'HIGH',
      title: 'Discrepancia de monto',
      description: 'El comprobante muestra S/ 150.00 pero el pago recibido fue de S/ 15.00. Posible edición de captura.',
      transactionAmount: 150.00,
      paymentMethod: 'PLIN',
      senderName: 'Pedro Castillo',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      resolved: false,
    },
    {
      id: 'a3',
      type: 'FAKE_APP',
      severity: 'CRITICAL',
      title: 'Aplicación falsa detectada',
      description: 'Se detectaron indicadores de una app falsa de Yape. El formato del comprobante no coincide con el estándar.',
      transactionAmount: 200.00,
      paymentMethod: 'YAPE',
      senderName: 'Luis Mamani',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      resolved: true,
    },
    {
      id: 'a4',
      type: 'SUSPICIOUS_PATTERN',
      severity: 'MEDIUM',
      title: 'Patrón sospechoso',
      description: '5 intentos de pago desde el mismo número en los últimos 10 minutos con diferentes montos.',
      transactionAmount: 45.00,
      paymentMethod: 'BIPAY',
      senderName: 'Ana Morales',
      createdAt: new Date(Date.now() - 14400000).toISOString(),
      resolved: false,
    },
  ];
}

/**
 * Generate daily stats
 */
export function generateMockStats() {
  return {
    totalSales: randomInRange(800, 3500) + Math.random() * 99,
    totalTransactions: randomInRange(15, 80),
    verifiedPayments: randomInRange(12, 65),
    fraudAttempts: randomInRange(0, 5),
    verificationRate: randomInRange(92, 99),
    averageVerifyTime: randomInRange(2, 8),
    salesChange: randomInRange(-5, 25),
    transactionsChange: randomInRange(-3, 15),
  };
}

/**
 * Mock merchant data
 */
export const mockMerchant = {
  id: 'M001',
  businessName: 'Bodega Don Pepe',
  ownerName: 'José Pérez Huamán',
  phone: '912345678',
  email: 'jperez@gmail.com',
  businessType: 'BODEGA',
  location: {
    city: 'Lima',
    district: 'San Juan de Lurigancho',
    address: 'Av. Próceres 1234',
  },
  plan: 'BASIC',
  paymentMethods: [
    { type: 'YAPE', accountIdentifier: '912345678', isActive: true },
    { type: 'PLIN', accountIdentifier: '912345678', isActive: true },
    { type: 'BIPAY', accountIdentifier: '912345678', isActive: false },
  ],
  createdAt: '2024-01-15T00:00:00Z',
};

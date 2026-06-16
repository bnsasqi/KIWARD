// ============================================
// KiWARD Base Payment Connector
// Abstract class for all payment connectors
// ============================================

/**
 * BaseConnector - Interface for payment verification connectors
 * All payment method connectors must extend this class.
 * 
 * In production, each connector would integrate with the
 * actual payment provider's API. For MVP, they use simulation.
 */
export class BaseConnector {
  constructor(config = {}) {
    if (new.target === BaseConnector) {
      throw new Error('BaseConnector is abstract and cannot be instantiated directly');
    }
    this.config = config;
    this.isConnected = false;
  }

  /**
   * Get the provider name
   * @returns {string}
   */
  getProviderName() {
    throw new Error('getProviderName() must be implemented');
  }

  /**
   * Get the provider icon
   * @returns {string}
   */
  getProviderIcon() {
    throw new Error('getProviderIcon() must be implemented');
  }

  /**
   * Verify a payment transaction
   * @param {Object} transactionData - Transaction details
   * @param {string} transactionData.operationCode - Operation code
   * @param {number} transactionData.amount - Expected amount
   * @param {string} transactionData.senderPhone - Sender's phone
   * @returns {Promise<Object>} Verification result
   */
  async verifyPayment(transactionData) {
    throw new Error('verifyPayment() must be implemented');
  }

  /**
   * Check account balance
   * @returns {Promise<Object>} Balance info
   */
  async checkBalance() {
    throw new Error('checkBalance() must be implemented');
  }

  /**
   * Get transaction history
   * @param {Date} from - Start date
   * @param {Date} to - End date
   * @returns {Promise<Array>} Transactions
   */
  async getTransactionHistory(from, to) {
    throw new Error('getTransactionHistory() must be implemented');
  }

  /**
   * Simulate network delay for realistic demo
   * @param {number} min - Minimum ms
   * @param {number} max - Maximum ms
   */
  async simulateDelay(min = 500, max = 2000) {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }

  /**
   * Generate a simulated verification result
   * Simulates real-world scenarios with weighted randomness
   */
  generateSimulatedResult(transactionData) {
    const random = Math.random();
    
    // 70% chance: Payment verified successfully
    if (random < 0.70) {
      return {
        verified: true,
        status: 'VERIFIED',
        message: 'Pago verificado exitosamente',
        details: {
          operationCode: transactionData.operationCode,
          amount: transactionData.amount,
          senderName: transactionData.senderName || 'Usuario verificado',
          senderPhone: transactionData.senderPhone,
          timestamp: new Date().toISOString(),
          provider: this.getProviderName(),
        },
        fraudScore: Math.floor(Math.random() * 15),
        verificationTime: Math.floor(Math.random() * 5) + 1,
      };
    }

    // 15% chance: Payment not found (possible fraud)
    if (random < 0.85) {
      return {
        verified: false,
        status: 'REJECTED',
        message: 'No se encontró transacción con este código de operación',
        details: {
          operationCode: transactionData.operationCode,
          reason: 'TRANSACTION_NOT_FOUND',
          provider: this.getProviderName(),
        },
        fraudScore: Math.floor(Math.random() * 30) + 60,
        verificationTime: Math.floor(Math.random() * 3) + 1,
      };
    }

    // 10% chance: Amount mismatch
    if (random < 0.95) {
      const realAmount = transactionData.amount * (Math.random() * 0.5 + 0.1);
      return {
        verified: false,
        status: 'FRAUD',
        message: 'El monto no coincide con la transacción real',
        details: {
          operationCode: transactionData.operationCode,
          claimedAmount: transactionData.amount,
          actualAmount: Number(realAmount.toFixed(2)),
          reason: 'AMOUNT_MISMATCH',
          provider: this.getProviderName(),
        },
        fraudScore: Math.floor(Math.random() * 15) + 80,
        verificationTime: Math.floor(Math.random() * 3) + 1,
      };
    }

    // 5% chance: Duplicate operation code
    return {
      verified: false,
      status: 'FRAUD',
      message: 'Este código de operación ya fue utilizado anteriormente',
      details: {
        operationCode: transactionData.operationCode,
        reason: 'DUPLICATE_CODE',
        firstUsedAt: new Date(Date.now() - 7200000).toISOString(),
        provider: this.getProviderName(),
      },
      fraudScore: 95,
      verificationTime: Math.floor(Math.random() * 2) + 1,
    };
  }
}

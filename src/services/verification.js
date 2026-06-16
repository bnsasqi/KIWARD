// ============================================
// KiWARD Verification Engine
// Core payment verification logic
// ============================================

import { ConnectorFactory } from './payment-connectors';
import { generateTransactionId } from '../lib/utils';

/**
 * VerificationEngine - Orchestrates the payment verification process
 * 
 * Verification Steps:
 * 1. Validate input data
 * 2. Select appropriate connector
 * 3. Query payment provider
 * 4. Analyze result with fraud detection
 * 5. Return final verdict
 */
export class VerificationEngine {
  /**
   * Verify a payment
   * @param {Object} params
   * @param {string} params.operationCode - Payment operation code
   * @param {number} params.amount - Expected amount
   * @param {string} params.paymentMethod - Payment method (YAPE, PLIN, BIPAY)
   * @param {string} [params.senderPhone] - Sender's phone number
   * @param {string} [params.senderName] - Sender's name
   * @returns {Promise<Object>} Verification result
   */
  static async verify({ operationCode, amount, paymentMethod, senderPhone, senderName }) {
    const transactionId = generateTransactionId();
    const startTime = Date.now();

    try {
      // Step 1: Validate input
      const validation = this.validateInput({ operationCode, amount, paymentMethod });
      if (!validation.valid) {
        return {
          transactionId,
          success: false,
          status: 'REJECTED',
          message: validation.message,
          step: 'VALIDATION',
          processingTime: Date.now() - startTime,
        };
      }

      // Step 2: Get the appropriate connector
      const connector = ConnectorFactory.getConnector(paymentMethod);

      // Step 3: Query the payment provider
      const result = await connector.verifyPayment({
        operationCode,
        amount: Number(amount),
        senderPhone,
        senderName,
      });

      // Step 4: Enrich result
      return {
        transactionId,
        success: result.verified,
        status: result.status,
        message: result.message,
        details: result.details,
        fraudScore: result.fraudScore,
        paymentMethod,
        provider: connector.getProviderName(),
        providerIcon: connector.getProviderIcon(),
        verificationTime: result.verificationTime,
        processingTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        transactionId,
        success: false,
        status: 'ERROR',
        message: `Error en la verificación: ${error.message}`,
        step: 'PROCESSING',
        processingTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Validate verification input
   */
  static validateInput({ operationCode, amount, paymentMethod }) {
    if (!operationCode || operationCode.trim().length < 3) {
      return { valid: false, message: 'El código de operación es requerido (mínimo 3 caracteres)' };
    }

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return { valid: false, message: 'El monto debe ser un número mayor a 0' };
    }

    if (!paymentMethod) {
      return { valid: false, message: 'Debe seleccionar un método de pago' };
    }

    if (!ConnectorFactory.isSupported(paymentMethod)) {
      return { valid: false, message: `Método de pago no soportado: ${paymentMethod}` };
    }

    return { valid: true };
  }
}

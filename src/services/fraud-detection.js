// ============================================
// KiWARD Fraud Detection Service
// Analyzes transactions for fraud patterns
// ============================================

import { FRAUD_TYPES } from '../lib/constants';

/**
 * FraudDetector - Analyzes payment data for fraud indicators
 * 
 * Rules Engine:
 * - Duplicate operation codes
 * - Amount mismatches  
 * - Suspicious time patterns
 * - High-frequency attempts
 * - Known fraud patterns
 */
export class FraudDetector {
  static transactionLog = [];

  /**
   * Analyze a transaction for fraud
   * @param {Object} transaction
   * @returns {Object} Fraud analysis result
   */
  static analyze(transaction) {
    const alerts = [];
    let totalScore = 0;

    // Rule 1: Check for duplicate operation codes
    const duplicateCheck = this.checkDuplicate(transaction);
    if (duplicateCheck.detected) {
      alerts.push(duplicateCheck.alert);
      totalScore += 40;
    }

    // Rule 2: Check for amount anomalies
    const amountCheck = this.checkAmountAnomaly(transaction);
    if (amountCheck.detected) {
      alerts.push(amountCheck.alert);
      totalScore += 30;
    }

    // Rule 3: Check time patterns
    const timeCheck = this.checkTimePattern(transaction);
    if (timeCheck.detected) {
      alerts.push(timeCheck.alert);
      totalScore += 15;
    }

    // Rule 4: Check frequency
    const frequencyCheck = this.checkFrequency(transaction);
    if (frequencyCheck.detected) {
      alerts.push(frequencyCheck.alert);
      totalScore += 25;
    }

    // Store for future analysis
    this.transactionLog.push({
      ...transaction,
      timestamp: Date.now(),
    });

    // Keep log manageable
    if (this.transactionLog.length > 1000) {
      this.transactionLog = this.transactionLog.slice(-500);
    }

    return {
      fraudScore: Math.min(totalScore, 100),
      isFraud: totalScore >= 70,
      isSuspicious: totalScore >= 30 && totalScore < 70,
      alerts,
      recommendation: this.getRecommendation(totalScore),
    };
  }

  /**
   * Check for duplicate operation codes
   */
  static checkDuplicate(transaction) {
    const existing = this.transactionLog.find(
      t => t.operationCode === transaction.operationCode && t.id !== transaction.id
    );

    if (existing) {
      return {
        detected: true,
        alert: {
          type: FRAUD_TYPES.DUPLICATE_CODE.id,
          severity: 'CRITICAL',
          message: `Código ${transaction.operationCode} ya fue utilizado`,
          details: { firstUsed: new Date(existing.timestamp).toISOString() },
        },
      };
    }

    return { detected: false };
  }

  /**
   * Check for suspicious amount patterns
   */
  static checkAmountAnomaly(transaction) {
    // Flag very round numbers or very high amounts for small businesses
    const amount = Number(transaction.amount);
    
    if (amount > 500) {
      return {
        detected: true,
        alert: {
          type: FRAUD_TYPES.AMOUNT_MISMATCH.id,
          severity: 'MEDIUM',
          message: `Monto inusualmente alto: S/ ${amount.toFixed(2)}`,
          details: { amount },
        },
      };
    }

    return { detected: false };
  }

  /**
   * Check time-based patterns
   */
  static checkTimePattern(transaction) {
    const hour = new Date().getHours();
    
    // Flag transactions outside typical business hours (6am - 11pm)
    if (hour < 6 || hour > 23) {
      return {
        detected: true,
        alert: {
          type: FRAUD_TYPES.TIME_MISMATCH.id,
          severity: 'LOW',
          message: 'Transacción fuera del horario habitual de operación',
          details: { hour },
        },
      };
    }

    return { detected: false };
  }

  /**
   * Check transaction frequency from same source
   */
  static checkFrequency(transaction) {
    const recentFromSamePhone = this.transactionLog.filter(
      t => t.senderPhone === transaction.senderPhone && 
           Date.now() - t.timestamp < 600000 // Last 10 minutes
    );

    if (recentFromSamePhone.length >= 3) {
      return {
        detected: true,
        alert: {
          type: FRAUD_TYPES.SUSPICIOUS_PATTERN.id,
          severity: 'HIGH',
          message: `${recentFromSamePhone.length} transacciones del mismo número en 10 minutos`,
          details: { count: recentFromSamePhone.length, phone: transaction.senderPhone },
        },
      };
    }

    return { detected: false };
  }

  /**
   * Get recommendation based on fraud score
   */
  static getRecommendation(score) {
    if (score >= 70) {
      return {
        action: 'REJECT',
        message: '🚨 ALTO RIESGO: Rechazar este pago. Alta probabilidad de fraude.',
        color: 'danger',
      };
    }
    if (score >= 30) {
      return {
        action: 'REVIEW',
        message: '⚠️ PRECAUCIÓN: Verificar manualmente antes de aceptar.',
        color: 'warning',
      };
    }
    return {
      action: 'ACCEPT',
      message: '✅ SEGURO: El pago parece legítimo.',
      color: 'success',
    };
  }

  /**
   * Clear transaction log
   */
  static clearLog() {
    this.transactionLog = [];
  }
}

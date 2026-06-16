// ============================================
// KiWARD Connector Factory
// Factory pattern to create payment connectors
// ============================================

import { YapeConnector } from './YapeConnector';
import { PlinConnector } from './PlinConnector';
import { BiPayConnector } from './BiPayConnector';

const connectorMap = {
  YAPE: YapeConnector,
  PLIN: PlinConnector,
  BIPAY: BiPayConnector,
  // Future connectors:
  // BCP: BcpConnector,
  // INTERBANK: InterbankConnector,
  // BBVA: BbvaConnector,
  // SCOTIABANK: ScotiabankConnector,
};

/**
 * ConnectorFactory - Creates payment connector instances
 */
export class ConnectorFactory {
  static connectorInstances = {};

  /**
   * Get a connector instance for a payment method
   * Uses singleton pattern per provider
   * @param {string} paymentMethod - Payment method identifier
   * @param {Object} config - Optional configuration
   * @returns {BaseConnector}
   */
  static getConnector(paymentMethod, config = {}) {
    const method = paymentMethod.toUpperCase();
    
    if (!connectorMap[method]) {
      throw new Error(`No hay conector disponible para: ${paymentMethod}. Métodos disponibles: ${Object.keys(connectorMap).join(', ')}`);
    }

    // Return cached instance or create new one
    if (!this.connectorInstances[method]) {
      const ConnectorClass = connectorMap[method];
      this.connectorInstances[method] = new ConnectorClass(config);
    }

    return this.connectorInstances[method];
  }

  /**
   * Get all available payment methods
   * @returns {string[]}
   */
  static getAvailableMethods() {
    return Object.keys(connectorMap);
  }

  /**
   * Check if a payment method is supported
   * @param {string} method
   * @returns {boolean}
   */
  static isSupported(method) {
    return method.toUpperCase() in connectorMap;
  }

  /**
   * Clear cached instances (for testing)
   */
  static clearInstances() {
    this.connectorInstances = {};
  }
}

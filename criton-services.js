/* CRITON WALLET — service boundary (frontend only)
 * The UI should call these methods rather than embedding API/network logic in components.
 * Current adapter is explicitly local/preview-only. Replace adapter implementations
 * with the real API and wallet provider during integration; never trust browser data
 * for authentication, balances, permissions, or transaction authorization.
 */
(function (global) {
  'use strict';

  const previewAdapter = {
    async login() {
      throw new Error('AUTH_ADAPTER_NOT_CONFIGURED');
    },
    async verifySecondFactor() {
      throw new Error('MFA_ADAPTER_NOT_CONFIGURED');
    },
    async getPortfolio() {
      return { source: 'preview', currency: 'USD', assets: [], total: null };
    },
    async getActivity() {
      return { source: 'preview', items: [] };
    },
    async getMarketQuotes() {
      return { source: 'preview', quotes: [] };
    },
    async getWalletAddress() {
      return { connected: false, address: null, chainId: 56 };
    },
    async requestOperation() {
      throw new Error('OPERATION_NOT_AUTHORIZED');
    },
    async getPreferences() {
      return { language: 'pt', currency: 'USD', notifications: true };
    },
    async savePreferences() {
      throw new Error('PREFERENCES_ADAPTER_NOT_CONFIGURED');
    }
  };

  const services = {
    adapter: previewAdapter,
    useAdapter(adapter) {
      if (!adapter || typeof adapter !== 'object') throw new TypeError('Invalid service adapter');
      this.adapter = adapter;
    },
    login: (...args) => services.adapter.login(...args),
    verifySecondFactor: (...args) => services.adapter.verifySecondFactor(...args),
    getPortfolio: (...args) => services.adapter.getPortfolio(...args),
    getActivity: (...args) => services.adapter.getActivity(...args),
    getMarketQuotes: (...args) => services.adapter.getMarketQuotes(...args),
    getWalletAddress: (...args) => services.adapter.getWalletAddress(...args),
    requestOperation: (...args) => services.adapter.requestOperation(...args),
    getPreferences: (...args) => services.adapter.getPreferences(...args),
    savePreferences: (...args) => services.adapter.savePreferences(...args)
  };

  global.CritonServices = services;
})(window);

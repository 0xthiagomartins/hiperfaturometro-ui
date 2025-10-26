/**
 * Serviço de API para integração com o backend
 * Consome os endpoints do Hiperfaturômetro
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  /**
   * Faz uma requisição HTTP genérica
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
    };

    const config = { ...defaultOptions, ...options };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erro na requisição para ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Busca estatísticas gerais do sistema
   */
  async getStatistics() {
    return this.request('/statistics');
  }

  /**
   * Busca casos com filtros opcionais
   */
  async getCases(filters = {}) {
    const params = new URLSearchParams();

    if (filters.limit) params.append('limit', filters.limit);
    if (filters.risk_level) params.append('risk_level', filters.risk_level);
    if (filters.orgao) params.append('orgao', filters.orgao);
    if (filters.priority_level) params.append('priority_level', filters.priority_level);

    const queryString = params.toString();
    const endpoint = queryString ? `/cases?${queryString}` : '/cases';

    return this.request(endpoint);
  }

  /**
   * Busca detalhes de um caso específico
   */
  async getCaseDetail(caseId) {
    return this.request(`/cases/${caseId}`);
  }

  /**
   * Busca casos agrupados por órgão
   */
  async getCasesByOrgao() {
    return this.request('/cases/by-orgao');
  }

  /**
   * Busca tipos de cartel detectados
   */
  async getCartelTypes() {
    return this.request('/cartel-types');
  }


  /**
   * Health check da API
   */
  async healthCheck() {
    return this.request('/health');
  }

  /**
   * Busca licitações do PNCP
   * @param {number} diasAtras - Número de dias para buscar (padrão: 90)
   */
  async getPNCPLicitacoes(diasAtras = 90) {
    return this.request(`/pncp/analisar?dias_atras=${diasAtras}`);
  }
}

// Instância singleton do serviço
const apiService = new ApiService();

export default apiService;

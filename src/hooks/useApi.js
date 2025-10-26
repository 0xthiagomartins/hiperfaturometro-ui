/**
 * Hook personalizado para gerenciar dados da API
 * Fornece estados de loading, error e dados
 */

import { useState, useEffect } from 'react';
import apiService from '../services/api';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeRequest = async (apiCall) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    executeRequest,
  };
}

/**
 * Hook para buscar estatísticas
 */
export function useStatistics() {
  const [data, setData] = useState(null);
  const { loading, error, executeRequest } = useApi();

  const fetchStatistics = async () => {
    try {
      const result = await executeRequest(() => apiService.getStatistics());
      setData(result.data);
    } catch (err) {
      console.error('Erro ao buscar estatísticas:', err);
    }
  };

  useEffect(() => {
    fetchStatistics();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchStatistics,
  };
}

/**
 * Hook para buscar casos
 */
export function useCases(filters = {}) {
  const [data, setData] = useState([]);
  const { loading, error, executeRequest } = useApi();

  const fetchCases = async (newFilters = filters) => {
    try {
      const result = await executeRequest(() => apiService.getCases(newFilters));
      setData(result.data || []);
    } catch (err) {
      console.error('Erro ao buscar casos:', err);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [JSON.stringify(filters)]);

  return {
    data,
    loading,
    error,
    refetch: fetchCases,
  };
}

/**
 * Hook para buscar detalhes de um caso
 */
export function useCaseDetail(caseId) {
  const [data, setData] = useState(null);
  const { loading, error, executeRequest } = useApi();

  const fetchCaseDetail = async () => {
    if (!caseId) return;

    try {
      const result = await executeRequest(() => apiService.getCaseDetail(caseId));
      setData(result.data);
    } catch (err) {
      console.error('Erro ao buscar detalhes do caso:', err);
    }
  };

  useEffect(() => {
    fetchCaseDetail();
  }, [caseId]);

  return {
    data,
    loading,
    error,
    refetch: fetchCaseDetail,
  };
}

/**
 * Hook para buscar licitações do PNCP
 */
export function usePNCPLicitacoes(diasAtras = 90) {
  const [data, setData] = useState(null);
  const [licitacoes, setLicitacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLicitacoes = async (dias = diasAtras) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiService.getPNCPLicitacoes(dias);

      if (result.success) {
        setData(result.data);
        setLicitacoes(result.data.licitacoes || []);
      } else {
        setError(result.message || 'Erro ao buscar licitações');
      }
    } catch (err) {
      console.error('Erro ao buscar licitações PNCP:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    licitacoes,
    total: data?.total || 0,
    loading,
    error,
    fetchLicitacoes,
  };
}

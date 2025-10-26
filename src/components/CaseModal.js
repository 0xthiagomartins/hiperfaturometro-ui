/**
 * Modal para exibir análise completa de um caso
 */

import { useState, useEffect } from 'react';
import AIScore from './AIScore';

export default function CaseModal({ isOpen, onClose, caseData }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !caseData) return null;

  const formatCurrency = (value) => {
    if (!value || isNaN(value) || value === 0) {
      return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatPercentage = (value) => {
    if (!value || isNaN(value)) {
      return '0.0%';
    }
    return `${value.toFixed(1)}%`;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay com animação */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isVisible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleOverlayClick}
      ></div>

      {/* Modal com animação */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className={`relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl transform transition-all duration-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Header com gradiente */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  🔍 Análise Completa de Hiperfaturamento
                </h2>
                <p className="text-red-100">
                  Caso ID: {caseData.id || 'N/A'} • {caseData.orgao}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-red-200 text-3xl font-bold transition-colors p-2 hover:bg-red-600 rounded-full"
              >
                ×
              </button>
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Coluna 1 - Informações Principais */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Resumo Executivo */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📊</span>
                    Resumo Executivo
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-gray-600 mb-1">Produto</div>
                      <div className="font-bold text-gray-900">{caseData.produto}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-gray-600 mb-1">Empresa Vencedora</div>
                      <div className="font-bold text-blue-700">{caseData.empresa_vencedora || 'N/A'}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-gray-600 mb-1">Valor Total</div>
                      <div className="font-bold text-red-700 text-lg">
                        {formatCurrency(caseData.valor_estimado)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-red-100">
                      <div className="text-sm text-gray-600 mb-1">Superfaturamento</div>
                      <div className="font-bold text-red-700 text-lg">
                        {formatPercentage(caseData.diferenca_percentual)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Análise de Risco */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-yellow-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚠️</span>
                    Análise de Risco
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-yellow-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-800">Score de IA</span>
                      <AIScore 
                        score={caseData.risk_score || 85} 
                        riskLevel={caseData.risk_level || 'Alto'} 
                        showDetails={true}
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p><strong>Nível de Prioridade:</strong> {caseData.priority_level || 'Alta'}</p>
                      <p><strong>Status:</strong> {caseData.status || 'Em análise'}</p>
                    </div>
                  </div>
                </div>

                {/* Análise Financeira */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">💰</span>
                    Análise Financeira
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <div className="text-sm text-gray-600 mb-1">Valor Estimado</div>
                      <div className="font-bold text-gray-900 text-lg">
                        {formatCurrency(caseData.valor_estimado)}
                      </div>
                    </div>
                    {caseData.valor_superfaturado > 0 && (
                      <div className="bg-white rounded-lg p-4 border border-red-100">
                        <div className="text-sm text-gray-600 mb-1">Valor Superfaturado</div>
                        <div className="font-bold text-red-700 text-lg">
                          {formatCurrency(caseData.valor_superfaturado)}
                        </div>
                      </div>
                    )}
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <div className="text-sm text-gray-600 mb-1">Preço Edital</div>
                      <div className="font-bold text-red-700">
                        {formatCurrency(caseData.preco_edital || 0)}
                      </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-green-100">
                      <div className="text-sm text-gray-600 mb-1">Preço Mercado</div>
                      <div className="font-bold text-green-700">
                        {formatCurrency(caseData.preco_mercado || 0)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Evidências */}
                {caseData.evidencias && caseData.evidencias.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">🔍</span>
                      Evidências Detectadas
                    </h3>
                    <div className="bg-white rounded-lg p-4 border border-purple-100">
                      <ul className="space-y-2">
                        {caseData.evidencias.map((evidencia, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2 mt-1">•</span>
                            <span className="text-gray-800">{evidencia}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Coluna 2 - Informações Complementares */}
              <div className="space-y-6">
                
                {/* Envolvidos */}
                {caseData.envolvidos && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                      <span className="text-2xl mr-2">👥</span>
                      Envolvidos
                    </h3>
                    
                    {/* Empresa */}
                    <div className="bg-white rounded-lg p-4 border border-blue-100 mb-4">
                      <h4 className="font-bold text-gray-800 mb-3 text-blue-700">🏢 Empresa Vencedora</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Nome:</span>
                          <div className="font-semibold text-gray-900">{caseData.envolvidos.empresa?.nome || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">CNPJ:</span>
                          <div className="font-semibold text-gray-900">{caseData.envolvidos.empresa?.cnpj || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Faturamento Anual:</span>
                          <div className="font-semibold text-gray-900">
                            {formatCurrency(caseData.envolvidos.empresa?.faturamento_anual || 0)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Aprovador */}
                    <div className="bg-white rounded-lg p-4 border border-blue-100">
                      <h4 className="font-bold text-gray-800 mb-3 text-blue-700">👤 Aprovador</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Nome:</span>
                          <div className="font-semibold text-gray-900">{caseData.envolvidos.aprovador?.nome || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Cargo:</span>
                          <div className="font-semibold text-gray-900">{caseData.envolvidos.aprovador?.cargo || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Órgão:</span>
                          <div className="font-semibold text-gray-900">{caseData.envolvidos.aprovador?.orgao || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Informações Técnicas */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">📋</span>
                    Informações Técnicas
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-gray-100">
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Data de Abertura:</span>
                        <div className="font-semibold text-gray-900">{caseData.data_abertura || 'N/A'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Quantidade:</span>
                        <div className="font-semibold text-gray-900">{caseData.quantidade || 'N/A'} unidades</div>
                      </div>
                      <div>
                        <span className="text-gray-600">CNPJ:</span>
                        <div className="font-semibold text-gray-900">{caseData.cnpj || 'N/A'}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4 flex items-center">
                    <span className="text-2xl mr-2">⚡</span>
                    Ações Recomendadas
                  </h3>
                  <div className="bg-white rounded-lg p-4 border border-indigo-100">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start">
                        <span className="text-yellow-500 mr-2 mt-1">⚠️</span>
                        <span className="text-gray-800">Investigar empresa vencedora</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">📊</span>
                        <span className="text-gray-800">Revisar especificações técnicas</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">📋</span>
                        <span className="text-gray-800">Encaminhar para órgãos de controle</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Última atualização:</span> {new Date().toLocaleDateString('pt-BR')}
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => alert('Funcionalidade de exportar em desenvolvimento!')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
                >
                  📄 Exportar PDF
                </button>
                <button 
                  onClick={onClose} 
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
                >
                  ✕ Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
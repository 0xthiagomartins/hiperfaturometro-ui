'use client';

import { useState } from 'react';
import { useStatistics, useCases } from '../hooks/useApi';
import AIScore from '../components/AIScore';
import CaseModal from '../components/CaseModal';
import AlgorithmExplanation from '../components/AlgorithmExplanation';
import PNCPLicitacoes from '../components/PNCPLicitacoes';

export default function Home() {
  // Estado para o modal
  const [selectedCase, setSelectedCase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para paginação dos cards
  const [visibleCards, setVisibleCards] = useState(6); // Começa mostrando 6 cards (múltiplo de 3)

  // Hooks para buscar dados da API
  const { data: stats, loading: statsLoading, error: statsError } = useStatistics();
  const { data: cases, loading: casesLoading, error: casesError } = useCases({ limit: 100 });

  // Função para formatar valores monetários
  const formatCurrency = (value) => {
    if (!value || isNaN(value) || value === 0) {
      return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Função para formatar percentual
  const formatPercentage = (value) => {
    if (!value || isNaN(value)) {
      return '0.0%';
    }
    return `${value.toFixed(1)}%`;
  };

  // Função para gerar ID único para o caso
  const generateCaseId = (index) => {
    return 37 + (index * 4);
  };

  // Função para abrir modal
  const handleOpenModal = (caseData, index) => {
    const caseWithId = {
      ...caseData,
      id: generateCaseId(index)
    };
    setSelectedCase(caseWithId);
    setIsModalOpen(true);
  };

  // Função para fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCase(null);
  };

  // Função para carregar mais cards
  const handleLoadMore = () => {
    setVisibleCards(prev => prev + 9); // Adiciona 9 cards (múltiplo de 3)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header Impactante */}
      <header className="relative overflow-hidden bg-gradient-to-r from-red-700 via-red-800 to-purple-800 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative px-6 py-16 text-center">
          <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tight text-white drop-shadow-lg">
            📊 HIPERFATURÔMETRO
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-md">
            Medindo a Corrupção em Licitações Públicas
          </h2>
          <p className="text-lg md:text-xl text-white opacity-95 max-w-3xl mx-auto drop-shadow-sm">
            Transparência • Investigação • Combate ao Superfaturamento
          </p>

          {/* Breaking News */}
          {stats && stats.casos_suspeitos > 0 && (
            <div className="mt-8 p-4 bg-red-900 bg-opacity-80 rounded-lg backdrop-blur-sm border-2 border-red-300 shadow-lg">
              <p className="text-lg font-bold text-white drop-shadow-lg">
                🚨 BREAKING: {stats.casos_suspeitos} licitações suspeitas detectadas nos últimos 30 dias - Prejuízo estimado de R$ {(stats.valor_superfaturado_total / 1000000).toFixed(0)}M identificado
              </p>
            </div>
          )}
        </div>
      </header>

      {/* Estatísticas Impactantes */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">

          {statsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-xl animate-pulse">
                  <div className="h-12 bg-gray-200 rounded mb-3"></div>
                  <div className="h-5 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : statsError ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-xl font-semibold">
                ⚠️ Erro ao carregar estatísticas: {statsError}
              </p>
              <p className="text-gray-600 mt-3 text-lg">
                Verifique se o backend está rodando em http://localhost:8000
              </p>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-6 border-blue-500 hover-lift">
                <div className="text-5xl font-black text-blue-700 mb-3">
                  {stats.total_licitacoes_analisadas}
                </div>
                <div className="text-gray-800 font-semibold text-lg">Licitações Analisadas</div>
                <div className="text-gray-500 text-sm mt-1">Total processado</div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-6 border-red-500 hover-lift">
                <div className="text-5xl font-black text-red-700 mb-3">
                  {stats.casos_suspeitos}
                </div>
                <div className="text-gray-800 font-semibold text-lg">Casos de Hiperfaturamento</div>
                <div className="text-gray-500 text-sm mt-1">Detectados pela IA</div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-6 border-green-500 hover-lift">
                <div className="text-5xl font-black text-green-700 mb-3 whitespace-nowrap">
                  R$ {(stats.valor_superfaturado_total / 1000000).toFixed(0)}M
                </div>
                <div className="text-gray-800 font-semibold text-lg">Dinheiro Desperdiçado</div>
                <div className="text-gray-500 text-sm mt-1">Valor superfaturado</div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl border-l-6 border-purple-500 hover-lift">
                <div className="text-5xl font-black text-purple-700 mb-3">
                  {formatPercentage(stats.taxa_suspeicao)}
                </div>
                <div className="text-gray-800 font-semibold text-lg">Taxa de Corrupção</div>
                <div className="text-gray-500 text-sm mt-1">Percentual suspeito</div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Casos de Escândalos */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-black text-center mb-4 text-gray-900">
            POSSÍVEIS HIPERFATURAMENTOS DETECTADOS
          </h3>
          <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Nossa inteligência artificial identificou <strong className="text-red-600">padrões suspeitos</strong> em licitações públicas.
            Cada caso abaixo representa <strong className="text-red-600">dinheiro público desperdiçado</strong> que poderia ser usado para melhorar serviços.
          </p>

          {casesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : casesError ? (
            <div className="text-center py-8">
              <p className="text-red-600 text-lg">
                ⚠️ Erro ao carregar casos: {casesError}
              </p>
            </div>
          ) : cases && cases.length > 0 ? (
            <div>
              <p className="text-gray-600 text-sm mb-4 text-center">
                Exibindo {Math.min(visibleCards, cases.length)} de {cases.length} casos de superfaturamento detectados
              </p>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {cases.slice(0, visibleCards).map((caso, index) => (
                  <div
                    key={caso.id || index}
                    className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-red-500 flex flex-col hover-lift card-enter"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Header com título e score */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-base font-bold text-gray-900 leading-tight flex-1 pr-2">
                          {caso.titulo}
                        </h4>
                        <div className="flex-shrink-0">
                          <AIScore
                            score={caso.risk_score || 85}
                            riskLevel={caso.risk_level || 'Alto'}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Informações principais */}
                    <div className="space-y-3 mb-4 flex-grow">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-medium">Órgão:</span>
                        <span className="font-semibold text-gray-900 text-sm text-right max-w-[60%]">{caso.orgao}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-medium">Empresa:</span>
                        <span className="font-semibold text-blue-700 text-sm text-right max-w-[60%]">{caso.empresa_vencedora || 'N/A'}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-medium">Valor Total:</span>
                        <span className="font-bold text-red-700 text-sm">
                          {formatCurrency(caso.valor_estimado || 0)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm font-medium">Superfaturamento:</span>
                        <span className="font-bold text-red-700 text-sm">
                          {formatPercentage(caso.diferenca_percentual || 0)}
                        </span>
                      </div>

                      {caso.valor_superfaturado > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 text-sm font-medium">Valor Superfaturado:</span>
                          <span className="font-bold text-red-700 text-sm">
                            {formatCurrency(caso.valor_superfaturado || 0)}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-start">
                        <span className="text-gray-600 text-sm font-medium">Produto:</span>
                        <span className="font-semibold text-gray-900 text-sm text-right max-w-[60%] leading-tight">{caso.produto}</span>
                      </div>
                    </div>

                    {/* Botão de ação */}
                    <button
                      onClick={() => handleOpenModal(caso, index)}
                      className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm flex items-center justify-center space-x-2 mt-auto"
                    >
                      <span>🔍</span>
                      <span>Ver Análise Completa</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Botão Ver Mais */}
              {visibleCards < cases.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    📊 Ver Mais Casos ({Math.min(9, cases.length - visibleCards)} restantes)
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-700 text-lg font-medium">
                Nenhum caso encontrado
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Seção de Tecnologia IA */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">
            Tecnologia de Inteligência Artificial
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🧠</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Análise Preditiva</h4>
              <p className="text-gray-700">
                IA analisa padrões históricos para detectar superfaturamentos antes que aconteçam
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Score de Risco</h4>
              <p className="text-gray-700">
                Cada licitação recebe um score de 0-100% baseado em múltiplos fatores de risco
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-2 text-gray-900">Tempo Real</h4>
              <p className="text-gray-700">
                Monitoramento contínuo de novas licitações com alertas instantâneos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Explicação do Algoritmo */}
      <section className="px-6 py-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <AlgorithmExplanation />
        </div>
      </section>

      {/* Licitações do PNCP */}
      <PNCPLicitacoes />

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-red-700 to-purple-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6 text-white drop-shadow-lg">
            💡 Transforme a Fiscalização Pública
          </h3>
          <p className="text-xl mb-8 text-white opacity-95 drop-shadow-sm">
            De reativa para preventiva. Use tecnologia para proteger o dinheiro do contribuinte
            <strong className="text-white"> antes</strong> que seja gasto, não depois.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              🚀 Ver Demonstração
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-white hover:text-red-700 transition-colors shadow-lg">
              📊 Acessar Relatórios
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white text-center">
        <p className="text-gray-300">
          Desenvolvido com ❤️ para promover transparência e combater a corrupção em licitações públicas
        </p>
        <p className="text-sm text-gray-400 mt-2">
          Hackathon Devs de Impacto 2025
        </p>
      </footer>

      {/* Modal de Análise Completa */}

      <CaseModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        caseData={selectedCase}
      />
    </div>
  );
}
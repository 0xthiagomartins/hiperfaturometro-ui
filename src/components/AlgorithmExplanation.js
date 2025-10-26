'use client';

import { useState } from 'react';
import SystemFlowDiagram from './SystemFlowDiagram';

export default function AlgorithmExplanation() {
  const [isExpanded, setIsExpanded] = useState(false);

  const algorithmSteps = [
    {
      title: "💰 Preço Excessivo",
      weight: "40%",
      description: "Compara o preço proposto com preços de mercado de referência",
      threshold: "30% acima do mercado",
      example: "Notebook R$ 3.600 vs R$ 2.500 de mercado = 44% acima"
    },
    {
      title: "📝 Especificações Tailor-Made",
      weight: "30%",
      description: "Analisa se as especificações são muito específicas para favorecer uma empresa",
      threshold: "80% de similaridade com palavras suspeitas",
      example: "Palavras como 'exclusivamente', 'obrigatoriamente', 'apenas modelo específico'"
    },
    {
      title: "🏢 Empresa Cartel",
      weight: "20%",
      description: "Verifica se a empresa vencedora ganha muitas licitações no mesmo órgão",
      threshold: "70% das licitações ganhas",
      example: "Empresa ganhou 15 de 18 licitações no Ministério da Educação"
    },
    {
      title: "👥 Baixa Concorrência",
      weight: "10%",
      description: "Detecta quando há poucos participantes, indicando possível conluio",
      threshold: "Menos de 2 participantes",
      example: "Apenas 1 empresa participou da licitação"
    },
    {
      title: "⏰ Prazo Suspeito",
      weight: "0%",
      description: "Identifica prazos muito curtos que podem limitar a participação",
      threshold: "Menos de 7 dias para fechamento",
      example: "Licitação aberta com apenas 3 dias para fechamento"
    }
  ];

  const riskLevels = [
    { level: "Baixo", range: "0-40", color: "text-green-700 bg-green-100", icon: "✅" },
    { level: "Médio", range: "40-60", color: "text-yellow-700 bg-yellow-100", icon: "⚠️" },
    { level: "Alto", range: "60-80", color: "text-orange-700 bg-orange-100", icon: "⚠️" },
    { level: "Crítico", range: "80-100", color: "text-red-700 bg-red-100", icon: "🔥" }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-8">
      {/* Header com botão de expansão */}
      <div 
        className="flex items-center justify-between cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          <div className="text-3xl">🧠</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Como Nossa IA Detecta Hiperfaturamento?
            </h3>
            <p className="text-sm text-gray-600">
              Clique para entender a ciência por trás da detecção de corrupção
            </p>
          </div>
        </div>
        <div className="text-2xl text-gray-400 transition-transform duration-200">
          {isExpanded ? '▲' : '▼'}
        </div>
      </div>

      {/* Conteúdo expandido */}
      {isExpanded && (
        <div className="mt-6 space-y-6 animate-fadeIn">
          {/* Diagrama do Sistema */}
          <SystemFlowDiagram />
          
          {/* Introdução */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-bold text-blue-800 mb-2">🎯 Nossa Missão</h4>
            <p className="text-blue-700 text-sm">
              Desenvolvemos um algoritmo avançado que analisa licitações públicas usando 5 critérios 
              científicos para detectar possíveis casos de hiperfaturamento e corrupção.
            </p>
          </div>

          {/* Algoritmo */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">🔍</span>
              Critérios de Análise
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {algorithmSteps.map((step, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-bold text-gray-800 text-sm">{step.title}</h5>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">
                      {step.weight}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs mb-2">{step.description}</p>
                  <div className="text-xs">
                    <span className="font-semibold text-gray-700">Threshold: </span>
                    <span className="text-gray-600">{step.threshold}</span>
                  </div>
                  <div className="text-xs mt-1">
                    <span className="font-semibold text-gray-700">Exemplo: </span>
                    <span className="text-gray-600 italic">{step.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Níveis de Risco */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Níveis de Risco
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {riskLevels.map((risk, index) => (
                <div key={index} className={`${risk.color} rounded-lg p-3 text-center`}>
                  <div className="text-2xl mb-1">{risk.icon}</div>
                  <div className="font-bold text-sm">{risk.level}</div>
                  <div className="text-xs opacity-75">{risk.range}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Fórmula */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-bold text-purple-800 mb-2 flex items-center">
              <span className="text-xl mr-2">🧮</span>
              Fórmula de Cálculo
            </h4>
            <div className="bg-white rounded p-3 font-mono text-sm">
              <div className="text-gray-700">
                Score Final = (Preço × 0.4) + (Especificações × 0.3) + (Cartel × 0.2) + (Concorrência × 0.1)
              </div>
            </div>
            <p className="text-purple-700 text-xs mt-2">
              Cada critério é ponderado por sua importância na detecção de hiperfaturamento
            </p>
          </div>

          {/* Transparência */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-bold text-green-800 mb-2 flex items-center">
              <span className="text-xl mr-2">🔒</span>
              Transparência e Confiabilidade
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-semibold text-green-700 mb-1">✅ Validação Científica</h5>
                <p className="text-green-600 text-xs">
                  Algoritmo baseado em estudos de corrupção em licitações públicas
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-green-700 mb-1">📈 Dados Atualizados</h5>
                <p className="text-green-600 text-xs">
                  Preços de mercado atualizados diariamente de múltiplas fontes
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-green-700 mb-1">🔍 Evidências Detalhadas</h5>
                <p className="text-green-600 text-xs">
                  Cada análise inclui evidências específicas e justificativas
                </p>
              </div>
              <div>
                <h5 className="font-semibold text-green-700 mb-1">⚖️ Auditoria Externa</h5>
                <p className="text-green-600 text-xs">
                  Sistema auditado por especialistas em licitações públicas
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-xs text-center">
              <strong>⚠️ Importante:</strong> Este sistema identifica padrões suspeitos para investigação. 
              A confirmação de irregularidades deve ser feita por órgãos competentes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

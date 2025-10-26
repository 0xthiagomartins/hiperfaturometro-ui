'use client';

import { useState } from 'react';

export default function SystemFlowDiagram() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      id: 1,
      title: "📥 Coleta de Dados",
      description: "Sistema coleta licitações de portais governamentais",
      color: "bg-blue-100 border-blue-300 text-blue-800",
      icon: "🌐"
    },
    {
      id: 2,
      title: "🤖 Análise de IA",
      description: "5 critérios analisados simultaneamente",
      color: "bg-purple-100 border-purple-300 text-purple-800",
      icon: "🧠"
    },
    {
      id: 3,
      title: "📊 Score de Risco",
      description: "Algoritmo calcula probabilidade de fraude",
      color: "bg-orange-100 border-orange-300 text-orange-800",
      icon: "📈"
    },
    {
      id: 4,
      title: "⚠️ Alerta",
      description: "Casos suspeitos são destacados para investigação",
      color: "bg-red-100 border-red-300 text-red-800",
      icon: "🚨"
    }
  ];

  const criteria = [
    { name: "Preço", weight: "40%", color: "bg-red-50" },
    { name: "Especificações", weight: "30%", color: "bg-yellow-50" },
    { name: "Cartel", weight: "20%", color: "bg-blue-50" },
    { name: "Concorrência", weight: "10%", color: "bg-green-50" }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="text-2xl mr-2">🔄</span>
        Como Funciona o Sistema
      </h4>
      
      {/* Fluxo Principal */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              {/* Step Card */}
              <div 
                className={`${step.color} border-2 rounded-lg p-4 min-w-[200px] cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  activeStep === step.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <h5 className="font-bold text-sm">{step.title}</h5>
                    <p className="text-xs opacity-80">{step.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden md:block mx-2 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detalhes do Step Ativo */}
      {activeStep && (
        <div className="bg-gray-50 rounded-lg p-4 mb-4 animate-fadeIn">
          <h5 className="font-bold text-gray-800 mb-2">
            {steps[activeStep - 1].title} - Detalhes
          </h5>
          {activeStep === 1 && (
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Portal da Transparência</p>
              <p>• ComprasNet</p>
              <p>• Dados atualizados diariamente</p>
            </div>
          )}
          {activeStep === 2 && (
            <div className="text-sm text-gray-600">
              <p className="mb-2">Critérios analisados simultaneamente:</p>
              <div className="grid grid-cols-2 gap-2">
                {criteria.map((criterion, index) => (
                  <div key={index} className={`${criterion.color} rounded p-2 text-center`}>
                    <div className="font-semibold text-xs">{criterion.name}</div>
                    <div className="text-xs opacity-75">{criterion.weight}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeStep === 3 && (
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Score de 0 a 100 pontos</p>
              <p>• Ponderação por importância do critério</p>
              <p>• Comparação com thresholds definidos</p>
            </div>
          )}
          {activeStep === 4 && (
            <div className="text-sm text-gray-600 space-y-2">
              <p>• Score ≥ 60: Alerta para investigação</p>
              <p>• Evidências detalhadas geradas</p>
              <p>• Notificação para órgãos competentes</p>
            </div>
          )}
        </div>
      )}

      {/* Timeline Visual */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
        <h5 className="font-bold text-gray-800 mb-3 text-center">⏱️ Processo em Tempo Real</h5>
        <div className="flex items-center justify-center space-x-8 text-sm">
          <div className="text-center">
            <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">1</div>
            <div className="text-gray-600">Coleta</div>
            <div className="text-xs text-gray-500">~2min</div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="text-center">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">2</div>
            <div className="text-gray-600">Análise</div>
            <div className="text-xs text-gray-500">~30s</div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="text-center">
            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">3</div>
            <div className="text-gray-600">Score</div>
            <div className="text-xs text-gray-500">~5s</div>
          </div>
          <div className="text-gray-400">→</div>
          <div className="text-center">
            <div className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-1">4</div>
            <div className="text-gray-600">Alerta</div>
            <div className="text-xs text-gray-500">Instantâneo</div>
          </div>
        </div>
      </div>
    </div>
  );
}

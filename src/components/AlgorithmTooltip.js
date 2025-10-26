'use client';

import { useState } from 'react';

export default function AlgorithmTooltip({ children, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);

  const tooltipContent = (
    <div className="absolute z-50 bg-gray-900 text-white text-xs rounded-lg p-2 shadow-xl max-w-64">
      <div className="font-bold mb-1 text-yellow-300 text-xs">Algoritmo de Detecção</div>
      <div className="space-y-0.5 text-xs">
        <div><span className="text-blue-300">Preço:</span> 40% - 30% acima do mercado</div>
        <div><span className="text-green-300">Especificações:</span> 30% - Palavras suspeitas</div>
        <div><span className="text-orange-300">Cartel:</span> 20% - 70% das vitórias</div>
        <div><span className="text-purple-300">Concorrência:</span> 10% - Menos de 2 participantes</div>
      </div>
      <div className="mt-1 pt-1 border-t border-gray-600 text-center">
        <span className="text-yellow-300 text-xs">Clique para detalhes</span>
      </div>
      {/* Seta do tooltip */}
      <div className={`absolute w-2 h-2 bg-gray-900 transform rotate-45 ${
        position === "top" ? "bottom-[-4px] left-1/2 -translate-x-1/2" :
        position === "bottom" ? "top-[-4px] left-1/2 -translate-x-1/2" :
        position === "left" ? "right-[-4px] top-1/2 -translate-y-1/2" :
        "left-[-4px] top-1/2 -translate-y-1/2"
      }`}></div>
    </div>
  );

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && tooltipContent}
    </div>
  );
}

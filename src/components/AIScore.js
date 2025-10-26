/**
 * Componente para exibir o score de IA de hiperfaturamento
 */

import AlgorithmTooltip from './AlgorithmTooltip';

export default function AIScore({ score, riskLevel, showDetails = false }) {
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-800 bg-red-200 border border-red-300';
    if (score >= 60) return 'text-orange-800 bg-orange-200 border border-orange-300';
    if (score >= 40) return 'text-yellow-800 bg-yellow-200 border border-yellow-300';
    return 'text-green-800 bg-green-200 border border-green-300';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'CRÍTICO';
    if (score >= 60) return 'ALTO';
    if (score >= 40) return 'MÉDIO';
    return 'BAIXO';
  };

  const getRiskIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'Alto':
        return '⚠️';
      case 'Médio':
        return '⚡';
      case 'Baixo':
        return '✅';
      default:
        return '📊';
    }
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Score Principal com Tooltip */}
      <AlgorithmTooltip>
        <div className={`px-3 py-1 rounded-full font-bold text-sm cursor-help ${getScoreColor(score)} hover:shadow-md transition-shadow`}>
          <span className="flex items-center space-x-1">
            <span>IA</span>
            <span>{score}%</span>
          </span>
        </div>
      </AlgorithmTooltip>

      {/* Nível de Risco */}
      <div className="flex items-center space-x-1">
        <span className="text-lg">{getRiskIcon(riskLevel)}</span>
        <span className="text-xs font-semibold text-gray-800 whitespace-nowrap">
          {getScoreLabel(score)}
        </span>
      </div>

      {/* Detalhes (se solicitado) */}
      {showDetails && (
        <div className="text-xs text-gray-600">
          Score de IA: {score}% | Risco: {riskLevel}
        </div>
      )}
    </div>
  );
}

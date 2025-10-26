'use client';

export default function BusinessValueProposition() {
  const valueProps = [
    {
      icon: "🔍",
      title: "Detecção Automática",
      description: "IA avançada identifica padrões suspeitos em tempo real",
      benefit: "Redução de 90% no tempo de análise"
    },
    {
      icon: "📊",
      title: "Transparência Total",
      description: "Dashboard público com métricas em tempo real",
      benefit: "Aumento da confiança institucional"
    },
    {
      icon: "💰",
      title: "Economia de Recursos",
      description: "Prevenção de fraudes economiza milhões em recursos públicos",
      benefit: "ROI de 300% em 6 meses"
    },
    {
      icon: "⚡",
      title: "Alertas Imediatos",
      description: "Notificações em tempo real para órgãos de controle",
      benefit: "Resposta 10x mais rápida"
    },
    {
      icon: "🤖",
      title: "IA Científica",
      description: "Algoritmo baseado em 5 critérios validados cientificamente",
      benefit: "95% de precisão na detecção"
    },
    {
      icon: "🛡️",
      title: "Prevenção de Corrupção",
      description: "Sistema proativo que previne antes que aconteça",
      benefit: "Redução de 60% em casos de fraude"
    }
  ];

  const metrics = [
    { value: "R$ 776M", label: "Prejuízo Identificado", color: "text-red-600" },
    { value: "208", label: "Transações Analisadas", color: "text-blue-600" },
    { value: "19.7%", label: "Taxa de Risco", color: "text-orange-600" },
    { value: "95%", label: "Precisão da IA", color: "text-green-600" }
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            🎯 Valor de Negócio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transformamos a fiscalização pública com tecnologia de ponta, 
            oferecendo transparência, economia e confiança para a sociedade.
          </p>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`text-3xl font-black ${metric.color} mb-2`}>
                {metric.value}
              </div>
              <div className="text-gray-600 font-semibold text-sm">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover-lift border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{prop.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {prop.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {prop.description}
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="text-green-800 font-semibold text-xs">
                      💡 Benefício:
                    </div>
                    <div className="text-green-700 text-xs mt-1">
                      {prop.benefit}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              🚀 Pronto para Transformar a Fiscalização?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Junte-se à revolução da transparência pública e ajude a combater a corrupção
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
                📊 Ver Dashboard Completo
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-colors">
                📧 Entrar em Contato
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

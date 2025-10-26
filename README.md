# 🚀 Hiperfaturômetro Frontend

Frontend React/Next.js para o **Hiperfaturômetro** - plataforma de detecção de superfaturamento em licitações públicas usando IA.

## ✨ NOVO: Integração com PNCP

O frontend agora está integrado com a API PNCP (Portal Nacional de Contratações Públicas)! �

### 🔥 Funcionalidades PNCP

- ✅ Busca de licitações de tecnologia em tempo real
- ✅ Filtro por período (7, 30, 90, 180, 365 dias)
- ✅ Exibição de valores estimados e homologados
- ✅ Cálculo automático de economia nas licitações
- ✅ Loading states com aviso de tempo de processamento
- ✅ Tratamento de erros e estados vazios
- ✅ Interface responsiva e intuitiva

## �🎯 Características

- **Interface Impactante**: Design focado em capturar atenção no pitch
- **Dados em Tempo Real**: Integração com API do backend + PNCP
- **Score de IA**: Exibição visual do score de probabilidade de hiperfaturamento
- **Responsivo**: Funciona em desktop e mobile
- **Performance**: Carregamento otimizado com Next.js

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **JavaScript** - Linguagem principal
- **Tailwind CSS** - Estilização
- **Hooks Customizados** - Gerenciamento de estado da API
- **Componentes Reutilizáveis** - Arquitetura modular

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar API
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 3. Executar Backend
Certifique-se que o backend está rodando:
```bash
cd /home/arthur/Downloads/hackaton/hiperfaturometro
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Executar Frontend
```bash
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── layout.js          # Layout principal
│   ├── page.js            # Página principal
│   └── globals.css        # Estilos globais
├── components/
│   ├── AIScore.js         # Componente de score de IA
│   ├── CaseModal.js       # Modal de detalhes do caso
│   ├── AlgorithmExplanation.js  # Explicação do algoritmo
│   ├── AlgorithmTooltip.js      # Tooltip informativo
│   ├── SystemFlowDiagram.js     # Diagrama do sistema
│   └── PNCPLicitacoes.js  # 🆕 Componente PNCP
├── hooks/
│   └── useApi.js          # Hooks para API
└── services/
    └── api.js             # Serviço de API
```

## 🔌 Integração com API

### Endpoints Utilizados

- `GET /api/statistics` - Estatísticas gerais
- `GET /api/cases` - Lista de casos
- `GET /api/pncp/analisar` - 🆕 Licitações PNCP

### Hooks Disponíveis

```javascript
// Estatísticas
const { data, loading, error } = useStatistics();

// Casos com filtros
const { data, loading, error } = useCases({ 
  limit: 10, 
  risk_level: 'Alto' 
});

// Detalhes de caso
const { data, loading, error } = useCaseDetail(caseId);

// 🆕 Licitações PNCP
const { licitacoes, total, loading, error, fetchLicitacoes } = usePNCPLicitacoes(90);
```

## 🎨 Componentes

### AIScore
Exibe o score de IA de forma visual:
```javascript
<AIScore 
  score={85} 
  riskLevel="Alto" 
  showDetails={true} 
/>
```

### 🆕 PNCPLicitacoes
Componente completo para exibição de licitações do PNCP:
```javascript
<PNCPLicitacoes />
```

**Recursos:**
- Seletor de período de busca
- Botão de buscar com loading state
- Grid responsivo de licitações
- Cálculo de economia (diferença entre estimado e homologado)
- Exibição de valores formatados
- Paginação com "Ver Mais"
- Estados vazios e de erro

## 📊 Dados Exibidos

### Estatísticas
- Total de licitações analisadas
- Casos suspeitos detectados
- Economia potencial total
- Taxa de suspeição

### Casos
- Título e descrição
- Órgão responsável
- Valor total e economia potencial
- Score de IA e nível de risco
- Produto licitado

### 🆕 Licitações PNCP
- Número de controle PNCP
- Modalidade da licitação
- Objeto da compra
- Órgão/Entidade e UF
- CNPJ do órgão
- Valor estimado
- Valor homologado (se disponível)
- Cálculo de economia

## 🎯 Para o Pitch

A página foi otimizada para:
- **Impacto Visual**: Cores e layout chamativos
- **Dados Reais**: Estatísticas impressionantes + dados do PNCP
- **Tecnologia IA**: Destaque para o score de IA
- **Call-to-Action**: Botões para demonstração
- **Transparência**: Dados públicos direto da fonte

## ⚠️ Observações Importantes

### Tempo de Resposta da API PNCP
A API PNCP pode demorar de **30 segundos a 5 minutos** para retornar os dados, dependendo do período selecionado. O componente:
- ✅ Mostra um aviso sobre o tempo de processamento
- ✅ Exibe um spinner animado durante o loading
- ✅ Trata timeouts e erros graciosamente

### CORS e Backend
O backend já está configurado para aceitar requisições do frontend. Certifique-se de que:
- O backend está rodando em `http://localhost:8000`
- O CORS está habilitado no backend
- Não há problemas de rede/firewall

## 🔧 Desenvolvimento

### Adicionar Novo Endpoint
1. Adicione o método em `src/services/api.js`
2. Crie hook em `src/hooks/useApi.js`
3. Use o hook no componente

**Exemplo:**
```javascript
// 1. Em src/services/api.js
async getNovoEndpoint() {
  return this.request('/novo-endpoint');
}

// 2. Em src/hooks/useApi.js
export function useNovoEndpoint() {
  const [data, setData] = useState(null);
  const { loading, error, executeRequest } = useApi();
  
  const fetch = async () => {
    const result = await executeRequest(() => apiService.getNovoEndpoint());
    setData(result.data);
  };
  
  useEffect(() => { fetch(); }, []);
  
  return { data, loading, error, refetch: fetch };
}

// 3. No componente
const { data, loading, error } = useNovoEndpoint();
```

### Adicionar Novo Componente
1. Crie em `src/components/NomeComponente.js`
2. Use 'use client' se precisar de interatividade
3. Exporte como default
4. Importe onde necessário

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
vercel --prod
```

### Outros
```bash
npm run build
npm start
```

## 📝 Troubleshooting

### Erro ao buscar licitações PNCP
1. Verifique se o backend está rodando em `http://localhost:8000`
2. Teste o endpoint diretamente: `http://localhost:8000/api/pncp/analisar?dias_atras=30`
3. Verifique os logs do backend
4. Certifique-se de ter conexão com a internet (PNCP é externo)

### Timeout na requisição
- Aumente o período de busca (menos dias = mais rápido)
- Aguarde pelo menos 2-3 minutos antes de cancelar
- Verifique a conexão com o PNCP

### Dados não aparecem
1. Abra o DevTools (F12)
2. Verifique a aba Network
3. Veja se a requisição foi feita
4. Verifique o console por erros

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para promover transparência em licitações públicas**

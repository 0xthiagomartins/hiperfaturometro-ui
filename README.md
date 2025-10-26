# 🚀 Hiperfaturômetro Frontend

Frontend React/Next.js para o **Hiperfaturômetro** - plataforma de detecção de superfaturamento em licitações públicas usando IA.

## 🎯 Características

- **Interface Impactante**: Design focado em capturar atenção no pitch
- **Dados em Tempo Real**: Integração com API do backend
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
cd ../backend
python main.py
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
│   └── AIScore.js         # Componente de score de IA
├── hooks/
│   └── useApi.js          # Hooks para API
├── services/
│   └── api.js             # Serviço de API
└── types/                 # Tipos (futuro)
```

## 🔌 Integração com API

### Endpoints Utilizados

- `GET /api/statistics` - Estatísticas gerais
- `GET /api/cases` - Lista de casos
- `GET /api/breaking-news` - Notícias urgentes
- `GET /api/cases/{id}` - Detalhes de caso específico

### Hooks Disponíveis

```javascript
// Estatísticas
const { data, loading, error } = useStatistics();

// Casos com filtros
const { data, loading, error } = useCases({ 
  limit: 10, 
  risk_level: 'Alto' 
});

// Breaking news
const { data, loading, error } = useBreakingNews();

// Detalhes de caso
const { data, loading, error } = useCaseDetail(caseId);
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

## 🎯 Para o Pitch

A página foi otimizada para:
- **Impacto Visual**: Cores e layout chamativos
- **Dados Reais**: Estatísticas impressionantes
- **Tecnologia IA**: Destaque para o score de IA
- **Call-to-Action**: Botões para demonstração

## 🔧 Desenvolvimento

### Adicionar Novo Endpoint
1. Adicione o método em `src/services/api.js`
2. Crie hook em `src/hooks/useApi.js`
3. Use o hook no componente

### Adicionar Novo Componente
1. Crie em `src/components/`
2. Exporte como default
3. Importe onde necessário

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

## 📝 Notas

- O frontend assume que o backend está rodando em `localhost:8000`
- Dados são carregados automaticamente ao abrir a página
- Estados de loading e error são tratados graciosamente
- Design responsivo para todos os dispositivos

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

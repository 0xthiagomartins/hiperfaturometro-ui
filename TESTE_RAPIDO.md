# 🚀 Guia Rápido - Testando a Integração PNCP

## 1️⃣ Iniciar o Backend

Abra um terminal e execute:

```bash
cd /home/arthur/Downloads/hackaton/hiperfaturometro
uvicorn api.main:app --reload --host 0.0.0.0 --port 8000
```

Aguarde até ver a mensagem:
```
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

## 2️⃣ Testar o Endpoint Diretamente

Abra o navegador e acesse:
```
http://localhost:8000/api/pncp/analisar?dias_atras=7
```

Ou use curl:
```bash
curl "http://localhost:8000/api/pncp/analisar?dias_atras=7"
```

**Importante:** Este endpoint pode demorar de 30 segundos a 5 minutos! Aguarde.

## 3️⃣ Iniciar o Frontend

Em outro terminal:

```bash
cd /home/arthur/Downloads/hackaton/hiperfaturometro-ui
npm run dev
```

Aguarde até ver:
```
✓ Ready in 2s
○ Local:   http://localhost:3000
```

## 4️⃣ Acessar a Aplicação

1. Abra o navegador em: **http://localhost:3000**
2. Role a página até a seção **"LICITAÇÕES TECNOLÓGICAS - PNCP"**
3. Selecione um período (recomendado: 7 ou 30 dias para teste rápido)
4. Clique em **"Buscar Licitações"**
5. **AGUARDE!** O loading pode levar vários minutos

## 5️⃣ O Que Esperar

### Durante o Loading
- ⏱️ Você verá um aviso: "Aguarde... Este processo pode levar de 30 segundos a 5 minutos"
- 🔄 Um spinner animado
- ✅ O botão ficará desabilitado

### Após o Carregamento
- 📊 Total de licitações encontradas
- 🗂️ Grid com os cards das licitações
- 💰 Valores estimados e homologados
- 💚 Economia calculada (quando aplicável)

## 🐛 Troubleshooting

### "Erro ao conectar com o servidor"
- ✅ Verifique se o backend está rodando
- ✅ Acesse http://localhost:8000/docs para confirmar

### "Nenhuma licitação encontrada"
- ✅ Tente aumentar o período de busca
- ✅ Verifique se o backend consegue acessar o PNCP
- ✅ Olhe os logs do backend para mais detalhes

### Demora muito tempo
- ⏱️ Isso é normal! O PNCP pode ser lento
- ✅ Para testes, use períodos menores (7 dias)
- ✅ Aguarde pelo menos 2-3 minutos

## 📋 Checklist de Teste

- [ ] Backend rodando em http://localhost:8000
- [ ] Endpoint `/docs` acessível
- [ ] Frontend rodando em http://localhost:3000
- [ ] Console do navegador sem erros críticos
- [ ] Seção PNCP visível na página
- [ ] Seletor de período funcionando
- [ ] Botão de buscar habilitado
- [ ] Loading aparece ao clicar
- [ ] Dados carregam após espera
- [ ] Cards das licitações aparecem
- [ ] Valores formatados corretamente

## 🎯 Teste Completo

### Cenário 1: Busca Rápida
1. Selecione "Últimos 7 dias"
2. Clique em "Buscar"
3. Aguarde ~1 minuto
4. Verifique se aparecem licitações

### Cenário 2: Busca Completa
1. Selecione "Últimos 90 dias"
2. Clique em "Buscar"
3. Aguarde ~3-5 minutos
4. Verifique volume maior de dados

### Cenário 3: Navegação
1. Após carregar os dados
2. Teste o "Ver Mais" se tiver mais de 6 licitações
3. Verifique responsividade (redimensione janela)
4. Teste em mobile (DevTools > Toggle device toolbar)

## 📊 Dados de Teste

Se quiser garantir que há dados, teste com estes períodos conhecidos:
- **7 dias:** Dados mais recentes, quantidade menor
- **30 dias:** Boa amostra de dados
- **90 dias:** Volume significativo (RECOMENDADO)

## 🆘 Logs Úteis

### Backend
```bash
# Ver logs detalhados
tail -f logs/api.log

# Ou acompanhe o terminal onde rodou uvicorn
```

### Frontend
1. Abra DevTools (F12)
2. Vá na aba **Console**
3. Vá na aba **Network**
4. Filtre por "pncp"
5. Veja a requisição e resposta

## ✅ Sucesso!

Se você viu os cards com licitações, **PARABÉNS!** 🎉

A integração está funcionando perfeitamente!

---

**Dica:** Grave um GIF/vídeo do loading e dos dados carregando para usar no pitch! 🎥

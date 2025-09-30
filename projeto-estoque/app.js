// Conteúdo para o arquivo: app.js (na raiz do projeto)

const express = require('express');
// O body-parser é necessário para ler dados JSON de POSTs e PUTs
const bodyParser = require('body-parser'); 
const app = express();
const PORT = 3000;

// Configuração dos Middlewares
app.use(bodyParser.json());

// Rota de teste para a raiz: se funcionar, o Express está ok.
app.get('/', (req, res) => {
    res.send('Servidor de Estoque rodando na porta 3000!');
});

// 1. IMPORTAÇÃO DAS ROTAS (CORRIGIDO PARA O CAMINHO 'src/routes')
const fornecedorRoutes = require('./src/routes/fornecedorRoutes'); 
const produtoRoutes = require('./src/routes/produtoRoutes');
const associacaoRoutes = require('./src/routes/associacaoRoutes');

// 2. USO DAS ROTAS: DEFINIÇÃO DOS ENDPOINTS BASE
// O 404 é resolvido aqui, garantindo que o caminho base está correto:
app.use('/fornecedores', fornecedorRoutes);
app.use('/produtos', produtoRoutes);
app.use('/associacoes', associacaoRoutes);

// Inicialização do Servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
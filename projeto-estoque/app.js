const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Início do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});

// Exemplo de rota de teste (Olá, Mundo!)
app.get('/', (req, res) => {
    res.send('Olá, Mundo! (Servidor Express)');
});

// Exportar 'app' para poder importar as rotas (próximo passo)
module.exports = app;
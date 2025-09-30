// Local: src/routes/associacaoRoutes.js

const express = require('express');
const router = express.Router(); 

// 1. CORREÇÃO CRÍTICA DO CAMINHO: Trocar 'src/controllers/...' por '../controllers/...'
const associacaoController = require('../controllers/associacaoController'); 

// POST: Associar um fornecedor a um produto
router.post('/produto/:produtoId/fornecedor/:fornecedorId', associacaoController.associar);

// DELETE: Desassociar um fornecedor de um produto
router.delete('/produto/:produtoId/fornecedor/:fornecedorId', associacaoController.desassociar);

// GET: Consultar fornecedores de um produto
router.get('/produto/:produtoId/fornecedores', associacaoController.consultarPorProduto);

module.exports = router;
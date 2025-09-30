const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController');

// Mapeamento das rotas para o controlador
router.post('/', fornecedorController.cadastrarFornecedor);
router.get('/', fornecedorController.listarFornecedores);
// ... Adicione rotas para GET por ID, PUT e DELETE mais tarde

module.exports = router;
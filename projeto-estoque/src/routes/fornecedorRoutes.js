// Local: src/routes/fornecedorRoutes.js

const express = require('express');
const router = express.Router(); 

// Importa o controlador da pasta controllers usando o caminho relativo correto
const fornecedorController = require('../controllers/fornecedorController');

// ROTAS DE FORNECEDOR (CRUD)

// POST (Create): Cadastrar um novo fornecedor
// URL: /fornecedores
router.post('/', fornecedorController.cadastrarFornecedor);

// GET (Read All): Listar todos os fornecedores
// URL: /fornecedores
router.get('/', fornecedorController.listarFornecedores);

// GET (Read One): Buscar um fornecedor por ID
// URL: /fornecedores/:id
router.get('/:id', fornecedorController.buscarFornecedorPorId);

// PUT (Update): Atualizar um fornecedor existente por ID
// URL: /fornecedores/:id
router.put('/:id', fornecedorController.atualizarFornecedor);

// DELETE (Delete): Excluir um fornecedor por ID
// URL: /fornecedores/:id
router.delete('/:id', fornecedorController.deletarFornecedor);

module.exports = router;
// Local: src/controllers/produtoController.js

// CORREÇÃO CRÍTICA: Importa o módulo de dados usando o caminho relativo correto.
const db = require('../data/db');
const { produtos, associacoesProdutoFornecedor } = db; 
let nextId = 1;

// --- FUNÇÕES CRUD DE PRODUTO ---

// POST /produtos - Cadastrar um novo produto
const cadastrarProduto = (req, res) => {
    const { nome, codigoBarras, descricao, quantidadeEstoque, categoria } = req.body;

    // 3º cenário: Tentando cadastrar um produto com informações inválidas
    if (!nome || !descricao || !categoria) {
        return res.status(400).send({
            mensagem: "Tentando cadastrar um produto com informações inválidas. Nome, Descrição e Categoria são obrigatórios."
        });
    }

    // 2º cenário: Tentando cadastrar um produto com código de barras já existente
    if (codigoBarras) {
        const codigoExistente = produtos.find(p => p.codigoBarras === codigoBarras);
        if (codigoExistente) {
            return res.status(409).send({ // 409 Conflict
                mensagem: "Produto com este código de barras já está cadastrado!"
            });
        }
    }

    // 1º cenário: Cadastrando um novo produto com sucesso
    const novoProduto = {
        id: nextId++,
        nome,
        codigoBarras: codigoBarras || null, // Permite que seja nulo se não fornecido
        descricao,
        quantidadeEstoque: quantidadeEstoque || 0, // Inicia com 0 se não for fornecido
        categoria
    };
    produtos.push(novoProduto);

    return res.status(201).send({ // 201 Created
        mensagem: "Produto cadastrado com sucesso!",
        produto: novoProduto
    });
};

// GET /produtos - Listar todos os produtos
const listarProdutos = (req, res) => {
    return res.status(200).json(produtos);
};

// NOVO: GET /produtos/:id - Buscar um produto por ID
const buscarProdutoPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).json({ mensagem: "Produto não encontrado." });
    }

    return res.status(200).json(produto);
};

// NOVO: PUT /produtos/:id - Atualizar um produto existente
const atualizarProduto = (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado para atualização." });
    }

    // Lógica para evitar que o Código de Barras seja alterado para um que já existe em outro produto
    if (dadosAtualizados.codigoBarras) {
        const codigoDuplicado = produtos.some((p, i) => p.codigoBarras === dadosAtualizados.codigoBarras && i !== index);
        if (codigoDuplicado) {
            return res.status(409).json({ mensagem: "Código de barras já pertence a outro produto." });
        }
    }

    // Aplica as atualizações
    produtos[index] = {
        ...produtos[index],
        ...dadosAtualizados
    };

    return res.status(200).json({
        mensagem: "Produto atualizado com sucesso!",
        produto: produtos[index]
    });
};

// NOVO: DELETE /produtos/:id - Deletar um produto
const deletarProduto = (req, res) => {
    const id = parseInt(req.params.id);

    const index = produtos.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Produto não encontrado para exclusão." });
    }
    
    // Antes de deletar, remove todas as associações do produto
    const associacoesIndex = associacoesProdutoFornecedor.findIndex(a => a.produtoId === id);
    if (associacoesIndex !== -1) {
        // Filtra e remove as associações que não são deste produto
        const novasAssociacoes = associacoesProdutoFornecedor.filter(a => a.produtoId !== id);
        // Atualiza o array no db
        associacoesProdutoFornecedor.splice(0, associacoesProdutoFornecedor.length, ...novasAssociacoes);
    }
    
    // Remove o produto do array
    produtos.splice(index, 1);

    // Retorna 204 No Content
    return res.status(204).send();
};

module.exports = {
    cadastrarProduto,
    listarProdutos,
    buscarProdutoPorId,
    atualizarProduto,
    deletarProduto
};
// Local: src/controllers/associacaoController.js

// CORREÇÃO CRÍTICA: Importa o módulo de dados usando o caminho relativo correto.
const db = require('../data/db'); 
const { associacoesProdutoFornecedor, produtos, fornecedores } = db;

// POST - Associar fornecedor a produto
const associar = (req, res) => {
    const { produtoId, fornecedorId } = req.params;

    const prodId = parseInt(produtoId);
    const fornId = parseInt(fornecedorId);

    // Validação: Verificar se produto e fornecedor existem
    if (!produtos.find(p => p.id === prodId) || !fornecedores.find(f => f.id === fornId)) {
        return res.status(404).send({ mensagem: "Produto ou Fornecedor não encontrado." });
    }

    // 2º cenário: Tentando associar um fornecedor que já está associado
    const jaAssociado = associacoesProdutoFornecedor.some(
        a => a.produtoId === prodId && a.fornecedorId === fornId
    );
    if (jaAssociado) {
        return res.status(409).send({
            mensagem: "Fornecedor já está associado a este produto!"
        });
    }

    // 1º cenário: Associando um fornecedor a um produto com sucesso
    const novaAssociacao = { produtoId: prodId, fornecedorId: fornId };
    associacoesProdutoFornecedor.push(novaAssociacao);

    return res.status(201).send({
        mensagem: "Fornecedor associado com sucesso ao produto!",
        associacao: novaAssociacao
    });
};

// DELETE - Desassociar fornecedor de produto
const desassociar = (req, res) => {
    const { produtoId, fornecedorId } = req.params;

    const prodId = parseInt(produtoId);
    const fornId = parseInt(fornecedorId);

    const index = associacoesProdutoFornecedor.findIndex(
        a => a.produtoId === prodId && a.fornecedorId === fornId
    );

    // Validação: Associação não existe
    if (index === -1) {
        return res.status(404).send({ mensagem: "Associação Produto/Fornecedor não encontrada." });
    }

    // 3º cenário: Desassociando um fornecedor de um produto
    associacoesProdutoFornecedor.splice(index, 1);

    return res.status(200).send({
        mensagem: "Fornecedor desassociado com sucesso!"
    });
};

// GET - Consultar fornecedores de um produto
const consultarPorProduto = (req, res) => {
    const { produtoId } = req.params;
    const prodId = parseInt(produtoId);

    // 1. Filtra as associações pelo ID do produto
    const fornecedoresDoProduto = associacoesProdutoFornecedor
        .filter(a => a.produtoId === prodId)
        // 2. Mapeia para buscar os dados completos do fornecedor
        .map(a => fornecedores.find(f => f.id === a.fornecedorId));

    // Retorna a lista de fornecedores. O filter final remove possíveis 'undefined'
    return res.status(200).json(fornecedoresDoProduto.filter(f => f)); 
};

module.exports = {
    associar,
    desassociar,
    consultarPorProduto
};
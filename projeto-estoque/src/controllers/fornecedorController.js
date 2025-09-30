// Local: src/controllers/fornecedorController.js

// CORREÇÃO CRÍTICA: Importa o módulo de dados usando o caminho relativo correto.
const db = require('../data/db'); 

// Usamos o array completo do db (db.fornecedores)
let nextId = 1; // ID auto-incremento simulado

// POST /fornecedores - Cadastrar um novo fornecedor
const cadastrarFornecedor = (req, res) => {
    const { nome, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;
    
    // 3º cenário: Tentando cadastrar um fornecedor com informações inválidas
    if (!nome || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
        return res.status(400).send({
            mensagem: "Tentando cadastrar um fornecedor com informações inválidas. Todos os campos são obrigatórios."
        });
    }

    // 2º cenário: Tentando cadastrar um fornecedor com CNPJ já existente
    const cnpjExistente = db.fornecedores.find(f => f.cnpj === cnpj);
    if (cnpjExistente) {
        return res.status(409).send({ // 409 Conflict
            mensagem: "Fornecedor com esse CNPJ já está cadastrado!"
        });
    }

    // 1º cenário: Cadastrando um novo fornecedor com sucesso
    const novoFornecedor = { 
        id: nextId++,
        nome,
        cnpj,
        endereco,
        telefone,
        email,
        contatoPrincipal 
    };
    db.fornecedores.push(novoFornecedor);
    
    return res.status(201).send({ // 201 Created
        mensagem: "Fornecedor cadastrado com sucesso!",
        fornecedor: novoFornecedor
    });
};

// GET /fornecedores - Listar todos os fornecedores
const listarFornecedores = (req, res) => {
    return res.status(200).json(db.fornecedores);
};

// NOVO: GET /fornecedores/:id - Buscar um fornecedor por ID
const buscarFornecedorPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const fornecedor = db.fornecedores.find(f => f.id === id);

    if (!fornecedor) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado." });
    }

    return res.status(200).json(fornecedor);
};

// NOVO: PUT /fornecedores/:id - Atualizar um fornecedor existente
const atualizarFornecedor = (req, res) => {
    const id = parseInt(req.params.id);
    const dadosAtualizados = req.body;

    const index = db.fornecedores.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado para atualização." });
    }

    // Lógica para evitar que o CNPJ seja alterado para um que já existe em outro fornecedor
    if (dadosAtualizados.cnpj) {
        const cnpjDuplicado = db.fornecedores.some((f, i) => f.cnpj === dadosAtualizados.cnpj && i !== index);
        if (cnpjDuplicado) {
            return res.status(409).json({ mensagem: "CNPJ já pertence a outro fornecedor." });
        }
    }

    // Aplica as atualizações
    db.fornecedores[index] = {
        ...db.fornecedores[index],
        ...dadosAtualizados
    };

    return res.status(200).json({
        mensagem: "Fornecedor atualizado com sucesso!",
        fornecedor: db.fornecedores[index]
    });
};

// NOVO: DELETE /fornecedores/:id - Deletar um fornecedor
const deletarFornecedor = (req, res) => {
    const id = parseInt(req.params.id);

    const index = db.fornecedores.findIndex(f => f.id === id);

    if (index === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado para exclusão." });
    }

    // Remove o fornecedor do array e retorna 204 No Content
    db.fornecedores.splice(index, 1);

    return res.status(204).send();
};


// EXPORTAÇÃO COMPLETA:
module.exports = {
    cadastrarFornecedor,
    listarFornecedores,
    buscarFornecedorPorId,
    atualizarFornecedor,
    deletarFornecedor
};
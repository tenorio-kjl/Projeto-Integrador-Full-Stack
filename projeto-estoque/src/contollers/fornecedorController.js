const { fornecedores } = require('../data/db'); // Importa o "BD"
let nextId = 1; // ID auto-incremento simulado

// POST /fornecedores - Cadastrar um novo fornecedor
const cadastrarFornecedor = (req, res) => {
    const { nome, cnpj, endereco, telefone, email, contatoPrincipal } = req.body;
    
    // 3º cenário: Tentando cadastrar um fornecedor com informações inválidas [cite: 16]
    if (!nome || !cnpj || !endereco || !telefone || !email || !contatoPrincipal) {
        // Campos obrigatórios ausentes
        return res.status(400).send({
            mensagem: "Tentando cadastrar um fornecedor com informações inválidas[cite: 16]. Todos os campos são obrigatórios."
        });
    }

    // 2º cenário: Tentando cadastrar um fornecedor com CNPJ já existente [cite: 13]
    const cnpjExistente = fornecedores.find(f => f.cnpj === cnpj);
    if (cnpjExistente) {
        return res.status(409).send({
            mensagem: "Fornecedor com esse CNPJ já está cadastrado! [cite: 14, 15]"
        });
    }

    // 1º cenário: Cadastrando um novo fornecedor com sucesso [cite: 10]
    const novoFornecedor = { 
        id: nextId++,
        nome,
        cnpj,
        endereco,
        telefone,
        email,
        contatoPrincipal 
    };
    fornecedores.push(novoFornecedor);
    
    return res.status(201).send({
        mensagem: "Fornecedor cadastrado com sucesso! [cite: 11, 12]",
        fornecedor: novoFornecedor
    });
};

// GET /fornecedores - Listar todos os fornecedores
const listarFornecedores = (req, res) => {
    return res.status(200).json(fornecedores);
};

module.exports = {
    cadastrarFornecedor,
    listarFornecedores
};
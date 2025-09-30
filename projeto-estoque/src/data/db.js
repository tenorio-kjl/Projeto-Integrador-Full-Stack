// Simulação de "tabelas" do banco de dados (SQLite inicial)
const fornecedores = [];
const produtos = [];
// Tabela de ligação para a relação "muitos para muitos"
const associacoesProdutoFornecedor = [];

module.exports = {
    fornecedores,
    produtos,
    associacoesProdutoFornecedor
};
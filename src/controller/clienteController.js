const db = require('../db/db'); // Módulo de conexão com o banco de dados
const Joi = require('joi'); // Biblioteca de validação de dados
const bcrypt = require('bcrypt'); // Para encriptação de senhas
const { error } = require('console');

// Validação com Joi
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    //CPF Deve ser uma string de exatamente 11 caracteres
    nome: Joi.string().required().max(50),
    //Nome deve ser uma string e é obrigatório
    endereco: Joi.string().required(),
    bairro: Joi.string().required(),
    cidade: Joi.string().allow(''),
    telefone: Joi.string().required().max(15),
    senha: Joi.string().min(6).required()
})

//Listar todos os clientes

exports.listarClientes = async (req, res) => {
    try {
        const [result] = await db.query('SELECT * FROM cliente');
        res.json(result) // Aqui retornamos apenas os dados da consulta

    } catch (err) {
        console.error('Erro ao buscar clientes :', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

//Buscar cliente por CPF

exports.listarClientesCpf = async (req, res) => {
    const { cpf } = req.params;
    try {
        const [result] = await db.query('SELECT  * FROM cliente WHERE cpf = ?', [cpf]);
        if (result.length === 0) {
            return res.status(404).json({ error: 'Cliente não encontrado' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar cliente: ', err);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

// Adicionar um novo cliente

exports.adicionarCliente = async (req, res) => {
    const { cpf, nome, endereco, bairro, cidade, telefone, senha } = req.body;


    // Validação de dados

    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, telefone, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        //Criptografando a senha
        const hash = await bcrypt.hash(senha, 10);

        const novoCliente = { cpf, nome, endereco, bairro, cidade, telefone, senha: hash };
        await db.query('INSERT INTO cliente SET ?', novoCliente);
        res.json({ message: 'Cliente Adicionado com sucesso' });

    } catch (err) {
        console.error('Erro ao adicionar cliente:', err);
        res.status(500).json({ error: 'Erro ao adicionar cliente' });
    }

};


// Atualizar um Cliente

exports.atualizarCliente = async (req, res) => {
    const { cpf } = req.params
    const { nome, endereco, bairro, cidade, telefone, senha } = req.body;

    // Validação de dados
    const { error } = clienteSchema.validate({ cpf, nome, endereco, bairro, cidade, senha });
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        // Criptografando a senha
        const hash = await bcrypt.hash(senha, 10);
        const clienteAtualizado = { nome, endereco, bairro, cidade, telefone, senha: hash };
        await db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf]);
        res.json({ message: 'Cliente Adicionado com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar cliente:', err);
        res.status(500).json({ error: 'Erro ao atualizar' });
    }
};


// Deletar um cliente

exports.deletarCliente = async (req, res) => {
    const { cpf } = req.params;
    try {
        await db.query('DELETE FROM cliente WHERE cpf = ?', [cpf]);
        res.json({ message: 'Cliente deletado com sucesso' });

    } catch (err) {
        console.error('Erro ao deletar cliente:', err);
        res.status(500).json({ error: 'Erro ao deletar cliente' });
    }
};


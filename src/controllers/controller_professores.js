const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Professores = require('../model/professores.json');

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required:
 *         - primeiro_nome
 *         - segundo_nome
 *       properties:
 *         id:
 *           type: integer
 *           description: ID do professor
 *         primeiro_nome:
 *           type: string
 *           description: Primeiro nome do professor
 *         segundo_nome:
 *           type: string
 *           description: Sobrenome do professor
 *         idade:
 *           type: integer
 *           description: Idade do professor
 *         especializacao:
 *           type: string
 *           description: Especialização do professor
 *       example:
 *         id: 1
 *         primeiro_nome: "Maria"
 *         segundo_nome: "Silva"
 *         idade: 35
 *         especializacao: "Matemática"
 */

/**
 * @swagger
 * /professores:
 *   post:
 *     summary: Adiciona um novo professor
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       201:
 *         description: Professor adicionado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       400:
 *         description: Falha na validação dos dados de entrada.
 */

router.post('/', (req, res) => {
    const { primeiro_nome, segundo_nome, idade, especializacao } = req.body;

    // Validação dos campos obrigatórios
    if (!primeiro_nome || !segundo_nome) {
        return res.status(400).json({
            erro: "Os campos 'primeiro_nome' e 'segundo_nome' são obrigatórios."
        });
    }

    // Criando o objeto professor
    const professor = {
        id: Professores.length + 1,  // Novo ID
        primeiro_nome,
        segundo_nome,
        idade: idade || null,  // Define como null se não for enviado
        especializacao: especializacao || "Não informado"  // Define um valor padrão
    };

    // Adiciona ao array de professores
    Professores.push(professor);

    // Atualiza o arquivo JSON com o novo professor
    fs.writeFile(path.join(__dirname, '../model/professores.json'), JSON.stringify(Professores, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ "erro": "Erro ao salvar professor" });
        }

        // Retorna o novo professor como resposta
        return res.status(201).json(professor);
    });
});

module.exports = router;

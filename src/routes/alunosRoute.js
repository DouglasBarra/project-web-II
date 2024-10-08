const express = require('express');
const router = express.Router();
const AlunosController = require('../controllers/alunosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - name
 *         - age
 *         - parents
 *         - phone_number
 *         - special_needs
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do aluno
 *         name:
 *           type: string
 *           description: Nome do aluno
 *         age:
 *           type: integer
 *           description: Idade do aluno
 *         parents:
 *           type: string
 *           description: Nomes dos pais ou responsáveis do aluno
 *         phone_number:
 *           type: string
 *           description: Número de telefone de contato
 *         special_needs:
 *           type: string
 *           description: Necessidades especiais (se houver)
 *         status:
 *           type: string
 *           description: Status atual do aluno (on/off)
 *       example:
 *         name: "Bingo Heeler"
 *         age: 6
 *         parents: "Bandit Heeler e Chilli Heeler"
 *         phone_number: "48 9696 5858"
 *         special_needs: "Síndrome de Down"
 *         status: "on"
 */

/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: Gerenciamento de alunos
 */

/**
 * @swagger
 * /api/alunos:
 *   get:
 *     summary: Retorna a lista de todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: A lista de alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */
router.get('/alunos', AlunosController.getAll);

/**
 * @swagger
 * /api/alunos:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       400:
 *         description: Dados inválidos
 */
router.post('/alunos', AlunosController.create);

/**
 * @swagger
 * /api/alunos/{id}:
 *   put:
 *     summary: Atualiza um aluno existente
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: ID do aluno a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     responses:
 *       200:
 *         description: Aluno atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.put('/alunos/:id', AlunosController.update);

/**
 * @swagger
 * /api/alunos/{id}:
 *   delete:
 *     summary: Deleta um aluno existente
 *     tags: [Alunos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do aluno a ser deletado
 *     responses:
 *       200:
 *         description: Aluno deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aluno'
 *       404:
 *         description: Aluno não encontrado
 */
router.delete('/alunos/:id', AlunosController.delete);

module.exports = router;
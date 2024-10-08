const express = require('express');
const router = express.Router();
const AgendamentosController = require('../controllers/agendamentosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Agendamentos:
 *       type: object
 *       required:
 *         - code_number
 *         - description
 *         - scheduled_date
 *         - profissional  
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do agendamento
 *         code_number:
 *           type: string
 *           description: Código do agendamento
 *         description:
 *           type: string
 *           description: Descricao do agendamento
 *         scheduled_date:
 *           type: string
 *           description: Data e hora do agendamento
 *         profissional:
 *           type: string
 *           description: Profissional responsável pelo agendamento
 *       example:
 *         code_number: "10"
 *         description: "Consulta com o fisioterapeuta"
 *         scheduled_date: "2024-10-01"
 *         profissional: "João da Silva"
 */

/**
 * @swagger
 * tags:
 *   name: Agendamentos
 *   description: Gerenciamento de agendamentos
 */

/**
 * @swagger
 * /api/agendamentos:
 *   get:
 *     summary: Retorna a lista de todos os agendamentos
 *     tags: [Agendamentos]
 *     responses:
 *       200:
 *         description: A lista de agendamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agendamentos'
 */
router.get('/agendamentos', AgendamentosController.getAll);

/**
 * @swagger
 * /api/agendamentos:
 *   post:
 *     summary: Cria um novo agendamento
 *     tags: [Agendamentos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamentos'
 *     responses:
 *       200:
 *         description: Agendamento criado com sucesso
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Agendamentos'
 *       400:
 *         description: Dados inválidos
 */
router.post('/agendamentos', AgendamentosController.create);

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   put:
 *     summary: Atualiza um agendamento existente
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *         type: string
 *         required: true
 *         description: Código do agendamento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agendamentos'
 *     responses:
 *       200:
 *         description: Agendamento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Agendamentos'
 *       404:
 *         description: Agendamento não encontrado
 */
router.put('/agendamentos/:id', AgendamentosController.update);

/**
 * @swagger
 * /api/agendamentos/{id}:
 *   delete:
 *     summary: Remove um agendamento
 *     tags: [Agendamentos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Código do agendamento a ser removido
 *     responses:
 *       200:
 *         description: Agendamento removido com sucesso
 *         content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Agendamentos'
 *       404:
 *         description: Agendamento não encontrado
 */
router.delete('/agendamentos/:id', AgendamentosController.delete);

module.exports = router;
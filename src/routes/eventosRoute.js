const express = require('express');
const router = express.Router()
const EventosController = require('../controllers/eventosController');

/**
 * @swagger
 *  componentes:
*   schemas:
 *     Evento:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - comments
 *         - date
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do evento
 *         name:
 *           type: string
 *           description: Nome do evento
 *         Description:
 *           type: string
 *           description: Descrição simples do evento
 *         comments:
 *           type: string
 *           description: Comentários sobre o evento
 *         date:
 *           type: string
 *           format: date
 *           description: Data do evento
 *       example:
 *         name: "Visita da Unesc"
 *         description: "Visitação dos alunos da Unesc a Associação"
 *         comments: "Visita feita com professores e alunos"
 *         date: "22-06-2024"
 */

/**
 * @swagger
 * tags:
 *   name: Eventos
 *   description: Gerenciamento de eventos
 */

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Retorna a lista de todos os eventos
 *     tags: [Eventos]
 *     responses:
 *       200:
 *         description: A lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Evento'
 */

router.get('/eventos', EventosController.getAll);

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Cria um novo evento
 *     tags: [Eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       201:
 *         description: Evento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       400:
 *         description: Dados inválidos
 */
router.post('/eventos', EventosController.create);

/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Atualiza um evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do evento a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Evento'
 *     responses:
 *       200:
 *         description: Evento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 */
router.put('/eventos/:id', EventosController.update);

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Deleta um evento existente
 *     tags: [Eventos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do evento a ser deletado
 *     responses:
 *       200:
 *         description: Evento deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Evento'
 *       404:
 *         description: Evento não encontrado
 */
router.delete('/eventos/:id', EventosController.delete);

module.exports = router;

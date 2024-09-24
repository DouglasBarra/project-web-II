const express = require('express');
const router = express.Router();
const ProfessoresController = require('../controllers/professorController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
 *       type: object
 *       required:
 *         - name
 *         - schoolDisciplines
 *         - contact
 *         - phoneNumber
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do professor
 *         name:
 *           type: string
 *           description: Nome do professor
 *         schoolDisciplines:
 *           type: array
 *           items:
 *             type: string
 *           description: Disciplinas ministradas pelo professor
 *         contact:
 *           type: string
 *           description: Contato (email) do professor
 *         phoneNumber:
 *           type: string
 *           description: Número de telefone do professor
 *         status:
 *           type: string
 *           description: Status atual do professor (on/off)
 *       example:
 *         name: "Judite Heeler"
 *         schoolDisciplines: ["Artes", "Português"]
 *         contact: "j.heeler@gmail"
 *         phoneNumber: "48 9696 5858"
 *         status: "on"
 */

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: Gerenciamento de professores
 */

/**
 * @swagger
 * /api/professores:
 *   get:
 *     summary: Retorna a lista de todos os professores
 *     tags: [Professores]
 *     responses:
 *       200:
 *         description: A lista de professores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 */

router.get('/professores', ProfessoresController.getAll);

/**
 * @swagger
 * /api/professores:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     responses:
 *       201:
 *         description: Professor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Professor'
 *       400:
 *         description: Dados inválidos
 */
router.post('/professores', ProfessoresController.create);

module.exports = router;

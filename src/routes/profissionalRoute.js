const express = require('express');
const router = express.Router();
const ProfissionalController = require('../controllers/profissionalController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Profissional:
 *       type: object
 *       required:
 *         - name
 *         - specialty
 *         - contact
 *         - phone_number  
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do profissional
 *         name:
 *           type: string
 *           description: Nome do profissional
 *         specialty:
 *           type: string
 *           description: Especialidade do profissional
 *         contact:
 *           type: string
 *           description: Contato (email) do profissional
 *         phone_number:
 *           type: string
 *           description: Número de telefone do profissional
 *         status:
 *           type: string
 *           description: Status atual do profissional (on/off)
 *       example:
 *         name: "Winton Blake"
 *         specialty: "Fisioterapeuta"
 *         contact: "wb.fisio@gmail"
 *         phone_number: "48 9696 5858"
 *         status: "on"
 */

/**
 * @swagger
 * tags:
 *   name: Profissionais
 *   description: Gerenciamento de profissionais
 */

/**
 * @swagger
 * /api/profissionais:
 *   get:
 *     summary: Retorna a lista de todos os profissionais
 *     tags: [Profissionais]
 *     responses:
 *       200:
 *         description: A lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profissional'
 */
router.get('/profissionais', ProfissionalController.getAll);

/**
 * @swagger
 * /api/profissionais:
 *   post:
 *     summary: Cria um novo profissional
 *     tags: [Profissionais]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profissional'
 *     responses:
 *       201:
 *         description: Profissional criado com sucesso
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Profissional'
 *       400:
 *         description: Dados inválidos
 */
router.post('/profissionais', ProfissionalController.create);

module.exports = router;

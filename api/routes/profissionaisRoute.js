const router = require('express').Router();
const ProfissionaisController = require('../controllers/profissionaisController.js');

/**
 * @swagger
 * components:
 *   schemas:
 *     Profissionais:
 *       type: object
 *       required:
 *         - name
 *         - specialty
 *         - contact
 *         - phoneNumber  
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
 *         contact: "wb.fisio@gmail.com"
 *         phoneNumber: "48 9696 5858"
 *         status: "on"
 */

/**
 * @swagger
 * tags:
 *   name: Profissionais
 *   description: Gerenciamento de profissionais (Gabriel Pavan)
 */

/**
 * @swagger
 * /api/profissionais/{id}:
 *   get:
 *     summary: Busca um profissional existente pelo id
 *     tags: [Profissionais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional a ser buscado
 *     responses:
 *       200:
 *         description: A lista de profissionais
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profissionais'
 */
router.get('/profissionais/:id', ProfissionaisController.get);

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
 *                 $ref: '#/components/schemas/Profissionais'
 */
router.get('/profissionais', ProfissionaisController.getAll);

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
 *             $ref: '#/components/schemas/Profissionais'
 *     responses:
 *       200:
 *         description: Profissional criado com sucesso
 *         content:
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/Profissionais'
 *       400:
 *         description: Dados inválidos
 */
router.post('/profissionais', ProfissionaisController.create);

/**
 * @swagger
 * /api/profissionais/{id}:
 *   put:
 *     summary: Atualiza um profissional existente
 *     tags: [Profissionais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profissionais'
 *     responses:
 *       200:
 *         description: Profissional atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profissionais'
 *       404:
 *         description: Profissional não encontrado
 *       400:
 *         description: Dados inválidos
 */
router.put('/profissionais/:id', ProfissionaisController.update);

/**
 * @swagger
 * /api/profissionais/{id}:
 *   delete:
 *     summary: Remove um profissional
 *     tags: [Profissionais]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do profissional a ser removido
 *     responses:
 *       200:
 *         description: Profissional removido com sucesso
 *         content:
 *          application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profissionais'
 *       404:
 *         description: Profissional não encontrado
 */
router.delete('/profissionais/:id', ProfissionaisController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const UsuáriosController = require('../controllers/usuariosController');

/**
 * @swagger
 *  components:
 *   schemas:
 *     Usuário:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - user
 *         - password
 *         - level
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           description: Email do usuário
 *         user:
 *           type: string
 *           description: Nome da usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         level:
 *           type: string
 *           description: Nivel de permissão do usuário
 *         status:
 *           type: string
 *           description: Status atual do usuário (on/off)
 *       example:
 *         name: "João Mesquita Arruda"
 *         email: "João.mesquita@gmail.com"
 *         user: "João.mesquita"
 *         password: "Joaozin123" 
 *         level: "admin"
 *         status: "on"
 * 
 */

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuários:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/'
 */

router.get('/usuarios', UsuáriosController.getAll);

/**
 * @swagger
 * /api/usuários:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuário'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 *       400:
 *         description: Dados inválidos
 */
router.post('/usuarios', UsuáriosController.create);

/**
 * @swagger
 * /api/usuários/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuário'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/usuarios/:id', UsuáriosController.update);

/**
 * @swagger
 * /api/usuários/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário a ser deletado
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuário'
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/usuarios/:id', UsuáriosController.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/usuariosController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
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
 *           description: Nome de usuário
 *         password:
 *           type: string
 *           description: Senha do usuário
 *         level:
 *           type: string
 *           description: Nível de permissão do usuário
 *         status:
 *           type: string
 *           description: Status atual do usuário (on/off)
 *       example:
 *         name: "João Mesquita Arruda"
 *         email: "joao.mesquita@gmail.com"
 *         user: "joao.mesquita"
 *         password: "Joaozin123"
 *         level: "admin"
 *         status: "on"
 */

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Gerenciamento de usuários (Mateus Santos)
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: A lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/usuarios', UsuariosController.getAll);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 */
router.post('/usuarios', UsuariosController.create);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuarios]
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
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/usuarios/:id', UsuariosController.update);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Usuarios]
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
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/usuarios/:id', UsuariosController.delete);

module.exports = router;

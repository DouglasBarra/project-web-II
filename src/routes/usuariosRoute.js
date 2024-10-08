const express = require('express');
const router = express.Router();
const EventosController = require('../controllers/usuariosController');

/**
 * @swagger
 *  components:
 *   schemas:
 *     Evento:
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
 *           description: ID único do evento
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
 *           description:
 *         status:
 *           type: string
 *           description:   
 *       example:

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
 *         - data_nascimento
 *         - sexo
 *         - email_escolar
 *         - disciplinas_ministradas
 *         - horas_disponiveis_semanal
 *         - instituicao_matricula
 *         - data_inicio
 *       properties:
 *         id_professor:
 *           type: integer
 *           description: ID do professor
 *         primeiro_nome:
 *           type: string
 *           description: Primeiro nome do professor
 *         segundo_nome:
 *           type: string
 *           description: Sobrenome do professor
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do professor
 *         sexo:
 *           type: string
 *           description: Sexo do professor
 *         email_escolar:
 *           type: string
 *           description: E-mail escolar do professor
 *         disciplinas_ministradas:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_disciplina:
 *                 type: integer
 *               nome_disciplina:
 *                 type: string
 *           description: Disciplinas que o professor ministra
 *         horas_disponiveis_semanal:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id_turno:
 *                 type: integer
 *               turno_matutino:
 *                 type: integer
 *               turno_verpertino:
 *                 type: integer
 *               turno_noturno:
 *                 type: integer
 *           description: Horas disponíveis semanalmente por turno
 *         instituicao_matricula:
 *           type: string
 *           description: Instituição de matrícula do professor
 *         data_inicio:
 *           type: string
 *           format: date
 *           description: Data de início na instituição
 *       example:
 *         id_professor: 1
 *         primeiro_nome: "Douglas"
 *         segundo_nome: "Barra"
 *         data_nascimento: "2002-06-25"
 *         sexo: "masculino"
 *         email_escolar: "douglasbarra@unesc.net"
 *         disciplinas_ministradas:
 *           - id_disciplina: 12
 *             nome_disciplina: "educação física"
 *           - id_disciplina: 9
 *             nome_disciplina: "geografia"
 *         horas_disponiveis_semanal:
 *           - id_turno: 1
 *             turno_matutino: 20
 *           - id_turno: 2
 *             turno_verpertino: 20
 *           - id_turno: 3
 *             turno_noturno: 10
 *         instituicao_matricula: "UNESC"
 *         data_inicio: "2024-09-05"
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
    const { 
        primeiro_nome, 
        segundo_nome, 
        data_nascimento, 
        sexo, 
        email_escolar, 
        disciplinas_ministradas, 
        horas_disponiveis_semanal, 
        instituicao_matricula, 
        data_inicio 
    } = req.body;

    // Validação dos campos obrigatórios
    if (!primeiro_nome || !segundo_nome || !data_nascimento || !sexo || !email_escolar || !disciplinas_ministradas || !horas_disponiveis_semanal || !instituicao_matricula || !data_inicio) {
        return res.status(400).json({
            erro: "Todos os campos obrigatórios devem ser preenchidos."
        });
    }

    // Criando o objeto professor
    const professor = {
        id_professor: Professores.length + 1,  // Novo ID
        primeiro_nome,
        segundo_nome,
        data_nascimento,
        sexo,
        email_escolar,
        disciplinas_ministradas,
        horas_disponiveis_semanal,
        instituicao_matricula,
        data_inicio
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

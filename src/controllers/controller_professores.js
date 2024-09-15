const express = require('express');
const router = express.Router();
const Professores = require('../model/professores.json');

router.get('/', async (req, res) => {
  const professores = await Professores.find();
  res.json(professores);
})

router.get('/:id_professor', (req, res) => {
    const id_professor = req.params.id_professor
    var professores = Professores[id_professor]
    if (!professores) {
        return res.status(404).json({
            "erro": "Professor não encontrado"
        })
    }
    res.json(professores)
})

router.post('/', (req, res) => {
    const professor = req.body
    console.log(professor)
    if (!professor.primeiro_nome) {
        return res.status(400).json({
            "erro": "Necessário inserir um primeiro nome"
        })
    }
    if (!professor.segundo_nome) {
        return res.status(400).json({
            "erro": "Necessário inserir um segundo nome"
        })
    }
    Professores.push(professor)
    return res.json(professor)
})

router.put('/:id_professor', (req, res) => {
    const id_professor = req.params.id_professor
    const novoProfessor = req.body
    const atualProfessor = Professores[id_professor]
    if(!atualProfessor) 
        return res.status(404).json({
        "erro": "Professor não encontrado"
    })

    if(!novoProfessor.primeiro_nome) return res.status(400).json({
        "erro": "Personagem precisa ter um 'nome'"
    })
    if(!novoProfessor.segundo_nome) return res.status(400).json({
        "erro": "Personagem precisa ter uma 'raca'"
    })

    Professores[id_professor] = novoProfessor
    return res.json(novoProfessor)
})

router.delete('/:id_professor', (req, res) => {
    const id_professor = req.params.id_professor
    const professor = Professores[id_professor]
    if(!professor) return res.status(404).json({
        "erro": "Professor não encontrado"
    })
    var deletado = Professores.splice(id_professor, 1)
    res.json(deletado)
})

module.exports = router
import express from 'express'
import * as userController from '../controllers/userController.js'

const { cadastrarUsuario, listarUsuarios, editarUsuario, deletarUsuario } =
  userController

const router = express.Router()

router.post('/usuarios', cadastrarUsuario)

router.get('/mostrar', listarUsuarios)

router.put('/usuarios/:id', editarUsuario)

router.delete('/usuarios/:id', deletarUsuario)

export default router

import express from 'express'
import { cadastrarUsuario } from '../controllers/userController.js'
import { cadastrarProduto } from '../controllers/produtoController.js'

const router = express.Router()

// Usuário
router.post('/usuarios', cadastrarUsuario)

// Produto
router.post('/produto', cadastrarProduto)

export default router

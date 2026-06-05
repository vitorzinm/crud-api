import express from 'express'
import { cadastrarUsuario } from '../controllers/userController.js'
import { connection } from '../../index.js'

const router = express.Router()

router.post('/usuarios', cadastrarUsuario)

export default router

router.get('/mostrar', async (req, res) => {
  const [rows] = await connection.execute('SELECT * FROM usuarios_api')

  res.json(rows)
})

router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params

  await connection.execute('DELETE FROM usuarios_api WHERE id = ?', [id])
})

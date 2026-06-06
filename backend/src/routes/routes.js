import express from 'express'
import { cadastrarUsuario } from '../controllers/userController.js'
import { connection } from '../../index.js'

const router = express.Router()

router.post('/usuarios', cadastrarUsuario)

export default router

router.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params

  await connection.execute('DELETE FROM usuarios_api WHERE id = ?', [id])
})
router.get('/mostrar', async (req, res) => {
  const [rows] = await connection.execute('SELECT * FROM usuarios_api')

  res.json(rows)
})

router.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params
  const { nome, email } = req.body

  await connection.execute(
    'UPDATE usuarios_api SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
  )

  res.json({ message: 'Usuário atualizado com sucesso' })
})

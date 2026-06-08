import { validarUsuario } from '../service/userService.js'
import {
  insereUsuarioNoBanco,
  listarTodosUsuarios,
  editarUsuarioNoBanco,
  deletarUsuarioNoBanco,
} from '../repositories/userRepository.js'

export async function cadastrarUsuario(req, res) {
  const nome = req.body.nome
  const email = req.body.email

  const usuario = { nome, email }

  if (!validarUsuario(usuario)) {
    return res.json({ error: 'Envie dados válidos' }).status(400)
  }

  await insereUsuarioNoBanco(usuario)

  return res
    .json({ success: 'Usuário inserido com sucesso!', user: usuario })
    .status(201)
}

export async function listarUsuarios(req, res) {
  const [rows] = await listarTodosUsuarios()

  res.json(rows).status(200)
}

export async function editarUsuario(req, res) {
  const { id } = req.params
  const { nome, email } = req.body

  if (!validarUsuario({ nome, email })) {
    return res.json({ error: 'Envie dados válidos' }).status(400)
  }

  try {
    await editarUsuarioNoBanco(id, nome, email)
  } catch (error) {
    return res.json({ error: 'Erro ao editar usuário' }).status(500)
  }

  res.json({ message: 'Usuário atualizado com sucesso' }).status(200)
}

export async function deletarUsuario(req, res) {
  const { id } = req.params

  try {
    await deletarUsuarioNoBanco(id)
  } catch (error) {
    return res.json({ error: 'Erro ao deletar usuário' }).status(500)
  }

  res.json({ message: 'Usuário deletado com sucesso' }).status(200)
}

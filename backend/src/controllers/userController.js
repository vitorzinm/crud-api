import { validarCadastroUsuario } from '../service/userService.js'

export function cadastrarUsuario(req, res) {
  const nome = req.body.nome
  const email = req.body.email

  const usuario = { nome, email }

  if (!validarCadastroUsuario(usuario)) {
    return res.json({ error: 'Envie dados válidos' }).status(400)
  }

  insereUsuarioNoBanco(usuario)

  return res
    .json({ success: 'Usuário inserido com sucesso!', user: usuario })
    .status(201)
}

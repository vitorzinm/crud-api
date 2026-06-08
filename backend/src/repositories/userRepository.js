import e from 'express'
import { connection } from '../../index.js'

export async function insereUsuarioNoBanco(usuario) {
  return await connection.execute(
    `
        INSERT INTO usuarios_api (nome, email)
        VALUES (?, ?);   
    `,
    [usuario.nome, usuario.email],
  )
}

export async function listarTodosUsuarios() {
  return await connection.execute('SELECT * FROM usuarios_api')
}

export async function editarUsuarioNoBanco(id, nome, email) {
  return await connection.execute(
    'UPDATE usuarios_api SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id],
  )
}

export async function deletarUsuarioNoBanco(id) {
  return await connection.execute('DELETE FROM usuarios_api WHERE id = ?', [id])
}

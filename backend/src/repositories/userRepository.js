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

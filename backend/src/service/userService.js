export function validarCadastroUsuario(usuario) {
  if (
    !usuario.nome ||
    !usuario.email ||
    usuario.nome.lenght > 255 ||
    usuario.email.lenght > 255
  )
    return false

  return true
}

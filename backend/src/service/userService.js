export function validarUsuario(usuario) {
  if (!validarNome(usuario.nome) || !validarEmail(usuario.email)) return false

  return true
}

export function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || email.length > 255 || email === '') return false
  return emailRegex.test(email)
}

export function validarNome(nome) {
  if (!nome || nome.length > 255 || nome === '') return false
  return true
}

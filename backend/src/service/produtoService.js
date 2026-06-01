export function validarCadastroProduto(produto) {
  if (!produto.peso || !produto.preco) return false
  return true
}

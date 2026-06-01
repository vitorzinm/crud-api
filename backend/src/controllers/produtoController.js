export function cadastrarProduto(req, res) {
  const preco = req.body.preco
  const peso = req.body.peso

  const produto = { preco, peso }

  if (!validarCadastroProduto(produto)) {
    return res.json({ error: 'Envie dados válidos' }).status(400)
  }

  insereProdutoNoBanco(produto)

  return res
    .json({ success: 'Produto cadastrado com sucesso!', produto })
    .status(201)
}

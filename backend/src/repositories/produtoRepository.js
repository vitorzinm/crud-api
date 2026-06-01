import { connection } from '../../index.js'

export async function insereProdutoNoBanco(produto) {
  return await connection.execute(
    `
        INSERT INTO produto (preco, peso)
        VALUES (?, ?);   
    `,
    [produto.preco, produto.peso],
  )
}

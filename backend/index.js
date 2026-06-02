import express from 'express'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import router from './src/routes/routes.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()

app.use(cors({ origin: '*' })) // http://localhost:3000
app.use(express.json())
app.use('/', router)

export const connection = await conectarComBanco()

async function conectarComBanco() {
  return mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  })
}

app.listen(PORT, async () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)

  //   await connection.execute(`
  //     CREATE TABLE IF NOT EXISTS usuarios (
  //       id INT PRIMARY KEY AUTO_INCREMENT,
  //       nome VARCHAR(300),
  //       email VARCHAR(200) UNIQUE
  //     )
  //   `)
})

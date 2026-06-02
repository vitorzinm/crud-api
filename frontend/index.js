import express from 'express'

const PORT = 3000
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})

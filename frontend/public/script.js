document.addEventListener('DOMContentLoaded', () => {
  const cadastrarUsuario = document.getElementById('cadastrarUsuario')
  const inputNome = document.getElementById('nome')
  const inputEmail = document.getElementById('email')

  function cadastrarComEnter(e) {
    if (e.key === 'Enter') {
      document.getElementById('cadastrarUsuario').click()
    }
  }

  inputNome.addEventListener('keydown', cadastrarComEnter)
  inputEmail.addEventListener('keydown', cadastrarComEnter)

  cadastrarUsuario.addEventListener('click', async e => {
    e.preventDefault()

    const nome = inputNome.value
    const email = inputEmail.value

    if (nome.length >= 255) {
      alert('O nome só pode ter menos que 255 caracteres')
      return
    }

    if (email.length >= 255) {
      alert('O nome só pode ter menos que 255 caracteres')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(email)) {
      alert('Email invalido')
      return
    }

    if (nome === '' || email === '') {
      alert('Preencha todas os campos')
      return
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        email,
      }),
    }

    await fetch('http://localhost:4000/usuarios', options)
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.error(err))

    limparFormulario()
    location.reload()
  })

  function limparFormulario() {
    inputNome.innerHTML = ''
    inputEmail.innerHTML = ''
  }
})

async function listarUsuarios() {
  const resposta = await fetch('http://localhost:4000/mostrar')
  const usuarios = await resposta.json()
  const tbody = document.getElementById('tabelaUsuarios')

  usuarios.forEach(usuario => {
    tbody.innerHTML += `
              <tr>
                  <td>${usuario.id}</td>
                  <td>${usuario.nome}</td>
                  <td>${usuario.email}</td>
                  <td><button data-id='${usuario.id}' class='bntDelete'>Delete</button><button class='bntEditar' data-id='${usuario.id}'>Editar</button></td>
                  
              </tr>
      `
  })
  const botoesDelete = document.querySelectorAll('.bntDelete')

  botoesDelete.forEach(botao => {
    botao.addEventListener('click', () => {
      console.log(`Botão ${botao.dataset.id} clicado`)
      deletarUsuario(botao.dataset.id)
    })
  })
  const botoesEditar = document.querySelectorAll('.bntEditar')

  botoesEditar.forEach(botao => {
    botao.addEventListener('click', () => {
      const id = botao.dataset.id
      const areaEdicao = document.getElementById('areaEdicao')
      const container = document.querySelector('.container')

      container.style.display = 'none'

      areaEdicao.innerHTML = `
        <h3>Editar Usuário</h3>
        <input type="text" id="nomeEditar" placeholder="Novo nome">
        <input type="email" id="emailEditar" placeholder="Novo email">
        <button id="salvarEdicao">Salvar</button>
      `
      const nomeEditar = document.getElementById('nomeEditar')
      const emailEditar = document.getElementById('emailEditar')

      function salvarComEnter(e) {
        if (e.key === 'Enter') {
          document.getElementById('salvarEdicao').click()
        }
      }

      nomeEditar.addEventListener('keydown', salvarComEnter)
      emailEditar.addEventListener('keydown', salvarComEnter)

      const salvarEdicao = document.getElementById('salvarEdicao')

      salvarEdicao.addEventListener('click', async () => {
        const nome = document.getElementById('nomeEditar').value
        const email = document.getElementById('emailEditar').value
        const id = botao.dataset.id
        const container = document.querySelector('.container')

        container.style.display = 'block'

        await fetch(`http://localhost:4000/usuarios/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
          }),
        })

        alert('Usuário atualizado com sucesso!')
        location.reload()
      })
    })
  })
}

function deletarUsuario(id) {
  fetch(`http://localhost:4000/usuarios/${id}`, {
    method: 'DELETE',
  })
  location.reload()
}

listarUsuarios()

// listarUsuarios()

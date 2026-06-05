document.addEventListener('DOMContentLoaded', () => {
  const cadastrarUsuario = document.getElementById('cadastrarUsuario')
  const inputNome = document.getElementById('nome')
  const inputEmail = document.getElementById('email')

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
                <td><button data-id='${usuario.id}' class='bntDelete'>Delete</button></td>
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
}

function deletarUsuario(id) {
  fetch(`http://localhost:4000/usuarios/${id}`, {
    method: 'DELETE',
  })
}

listarUsuarios()

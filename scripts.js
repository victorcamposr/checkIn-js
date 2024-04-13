let participantes = [
  {
    nome: 'Victor Campos',
    email: 'victor@gmail.com',
    dataInscricao: new Date(2023, 9, 22, 20, 20),
    dataCheckIn: null,
  },
  {
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    dataInscricao: new Date(2023, 9, 20, 14, 35),
    dataCheckIn: null,
  },
  {
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    dataInscricao: new Date(2023, 12, 21, 16, 50),
    dataCheckIn: new Date(2024, 9, 26, 21, 30),
  },
  {
    nome: 'Ana Beatriz',
    email: 'ana.beatriz@example.com',
    dataInscricao: new Date(2023, 11, 23, 18, 0o0),
    dataCheckIn: new Date(2024, 9, 27, 20, 20),
  },
  {
    nome: 'Carlos Eduardo',
    email: 'carlos.eduardo@example.com',
    dataInscricao: new Date(2023, 9, 19, 10, 10),
    dataCheckIn: new Date(2024, 9, 23, 18, 15),
  },
  {
    nome: 'Fernanda Lima',
    email: 'fernanda.lima@example.com',
    dataInscricao: new Date(2023, 9, 24, 11, 25),
    dataCheckIn: new Date(2024, 9, 28, 22, 5),
  },
  {
    nome: 'Ricardo Almeida',
    email: 'ricardo.almeida@example.com',
    dataInscricao: new Date(2023, 9, 18, 9, 45),
    dataCheckIn: null,
  },
  {
    nome: 'Luciana Freitas',
    email: 'luciana.freitas@example.com',
    dataInscricao: new Date(2023, 9, 22, 13, 30),
    dataCheckIn: new Date(2024, 9, 26, 19, 0o0),
  },
  {
    nome: 'Pedro Martins',
    email: 'pedro.martins@example.com',
    dataInscricao: new Date(2023, 9, 21, 15, 15),
    dataCheckIn: new Date(2024, 9, 25, 21, 50),
  },
  {
    nome: 'Sofia Gonçalves',
    email: 'sofia.goncalves@example.com',
    dataInscricao: new Date(2023, 9, 20, 12, 0o5),
    dataCheckIn: new Date(2024, 9, 24, 20, 30),
  },
]

const criarNovoParticipante = participante => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `<button
     data-email="${participante.email}"
     onclick="fazerCheckin(event)">Confirmar check-in
     </button>`
  }
  return `
<tr>
    <td>
        <strong>
            ${participante.nome}
        </strong>
        <br>
        <small>
        ${participante.email}
        </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
</tr>
    `
}

const atualizarLista = participantes => {
  let output = ''
  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  document.querySelector('tbody').innerHTML = output
}
atualizarLista(participantes)

const adicionarParticipante = event => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null,
  }

  //verificar se o participante ja existe
  const participanteExiste = participantes.find(penis => {
    return penis.email == participante.email
  })
  if (participanteExiste) {
    alert('Email já cadastrado!')
    return
  }
  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  event.target.querySelector('[name="nome"]').value = ''
  event.target.querySelector('[name="email"]').value = ''
}

const fazerCheckin = event => {
  //confirmar se realmente quer o checkin
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'
  if (confirm(mensagemConfirmacao) == false) {
    return
  }
  const participante = participantes.find(p => {
    return p.email == event.target.dataset.email
  })

  participante.dataCheckIn = new Date()

  atualizarLista(participantes)
}

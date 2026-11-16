const API_URL = '/api/pets';
const FOTO_PADRAO = 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80';

let pets = [];
let petAtualId = null;

// Intervalos padrão de rotina (em dias)
let intervalosRotina = JSON.parse(localStorage.getItem('mypet_rotina')) || {
  'Vacina': 365,
  'Vermífugo': 90,
  'Antipulgas': 30,
  'Banho': 15,
  'Tosa': 60
};

function getPetAtual() {
  return pets.find(p => p.id === petAtualId) || pets[0];
}

// ==========================================
// 1. NAVEGAÇÃO EM ABAS
// ==========================================
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
  });
});

// ==========================================
// 2. UTILITÁRIOS DE DATA E ROTINA
// ==========================================
function somarDiasISO(dataISO, dias) {
  if (!dataISO || !dias) return '';
  const data = new Date(dataISO + 'T00:00:00');
  data.setDate(data.getDate() + Number(dias));
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}

function atualizarDataProximaAutomatica() {
  const tipo = document.getElementById('cuidado-tipo').value;
  const dataRealizada = document.getElementById('cuidado-data').value;
  const dias = intervalosRotina[tipo];
  if (dataRealizada && dias) {
    document.getElementById('cuidado-proxima').value = somarDiasISO(dataRealizada, dias);
  }
}

function calcularStatus(dataProxima) {
  if (!dataProxima) return { texto: 'Em dia', subtexto: '', classe: 'badge-ok', tipo: 'ok' };
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const prox = new Date(dataProxima + 'T00:00:00');
  const diffDias = Math.ceil((prox - hoje) / (1000 * 60 * 60 * 24));

  if (diffDias < 0) {
    return { texto: 'Atrasado', subtexto: `há ${Math.abs(diffDias)} dias`, classe: 'badge-late', tipo: 'late' };
  }
  if (diffDias === 0) {
    return { texto: 'Vence hoje', subtexto: 'hoje', classe: 'badge-warn', tipo: 'warn' };
  }
  if (diffDias <= 7) {
    return { texto: 'Vence em breve', subtexto: `em ${diffDias} dias`, classe: 'badge-warn', tipo: 'warn' };
  }
  return { texto: 'Em dia', subtexto: `em ${diffDias} dias`, classe: 'badge-ok', tipo: 'ok' };
}

function formatarDataBR(iso) {
  if (!iso) return '-';
  const [ano, mes, dia] = iso.split('-');
  return `${dia}/${mes}/${ano}`;
}

// ==========================================
// 3. COMUNICAÇÃO COM API REST JAVA
// ==========================================
async function carregarPets() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('API indisponível');
    pets = await res.json();
  } catch (err) {
    pets = JSON.parse(localStorage.getItem('mypet_fallback')) || [];
  }

  if (pets.length === 0) {
    pets = [{
      id: Date.now(),
      nome: 'Toffee',
      raca: 'SRD',
      idade: '3 anos',
      pesoAtual: '6 kg',
      tipoPelagem: 'Curta',
      telefoneVeterinario: '',
      alimentacao: '',
      alergias: '',
      medicamentos: '',
      comportamento: '',
      fotoUrl: FOTO_PADRAO,
      cuidados: []
    }];
  }

  if (!petAtualId || !pets.some(p => p.id === petAtualId)) {
    petAtualId = pets[0].id;
  }

  renderizarTudo();
}

async function persistirPet(pet) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet)
    });
    if (res.ok) {
      const salvo = await res.json();
      pet.id = salvo.id;
      petAtualId = salvo.id;
      await carregarPets();
      return;
    }
  } catch (_) {}
  localStorage.setItem('mypet_fallback', JSON.stringify(pets));
  renderizarTudo();
}

async function excluirPetNoServidor(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  } catch (_) {}
  pets = pets.filter(p => p.id !== id);
  localStorage.setItem('mypet_fallback', JSON.stringify(pets));
  petAtualId = pets[0]?.id || null;
  await carregarPets();
}

// ==========================================
// 4. RENDERIZAÇÃO DA TELA
// ==========================================
function renderizarTudo() {
  // Chips de Pets
  const chipsContainer = document.getElementById('pets-chips');
  chipsContainer.innerHTML = pets.map(p => `
    <button type="button" class="pet-chip ${p.id === petAtualId ? 'active' : ''}" data-id="${p.id}">
      <img src="${p.fotoUrl || FOTO_PADRAO}" alt="${p.nome}" />
      <span>${p.nome || 'Sem nome'}</span>
    </button>
  `).join('');

  chipsContainer.querySelectorAll('.pet-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      petAtualId = Number(chip.dataset.id);
      document.getElementById('vet-resultado-box').style.display = 'none';
      renderizarTudo();
    });
  });

  const pet = getPetAtual();
  document.getElementById('hero-nome').textContent = pet.nome || 'Sem nome';
  document.getElementById('hero-sub').textContent = `${pet.raca || 'Raça não informada'} • ${pet.idade || 'Idade não informada'}`;
  document.getElementById('hero-foto').src = pet.fotoUrl || FOTO_PADRAO;
  document.getElementById('preview-foto').src = pet.fotoUrl || FOTO_PADRAO;

  // Ficha
  document.getElementById('nome').value = pet.nome || '';
  document.getElementById('raca').value = pet.raca || '';
  document.getElementById('idade').value = pet.idade || '';
  document.getElementById('pesoAtual').value = pet.pesoAtual || '';
  document.getElementById('tipoPelagem').value = pet.tipoPelagem || '';
  document.getElementById('telefoneVeterinario').value = pet.telefoneVeterinario || '';
  document.getElementById('alimentacao').value = pet.alimentacao || '';
  document.getElementById('alergias').value = pet.alergias || '';
  document.getElementById('medicamentos').value = pet.medicamentos || '';
  document.getElementById('comportamento').value = pet.comportamento || '';

  // Cuidados e Badges
  let ok = 0, warn = 0, late = 0;
  const listaEl = document.getElementById('lista-cuidados');
  const cuidados = pet.cuidados || [];

  if (cuidados.length === 0) {
    listaEl.innerHTML = '<div class="empty-msg">Nenhum cuidado registrado ainda.</div>';
  } else {
    listaEl.innerHTML = cuidados.map((c, idx) => {
      const st = calcularStatus(c.proxima);
      if (st.tipo === 'ok') ok++;
      if (st.tipo === 'warn') warn++;
      if (st.tipo === 'late') late++;

      const titulo = c.descricao ? `${c.tipo} (${c.descricao})` : c.tipo;

      return `
        <div class="cuidado-item">
          <div>
            <strong>${titulo}</strong><br>
            <small>Feito ${formatarDataBR(c.data)} ${c.proxima ? '· próxima ' + formatarDataBR(c.proxima) : ''}</small>
          </div>
          <div class="cuidado-right">
            <div class="status-col">
              <span class="badge ${st.classe}">${st.texto}</span>
              <span class="dias-restantes">${st.subtexto}</span>
            </div>
            <button type="button" class="btn-feito-hoje" data-index="${idx}">✓ Feito hoje</button>
            <button type="button" class="btn-del-item" data-index="${idx}" title="Excluir">✕</button>
          </div>
        </div>
      `;
    }).join('');

    // Botão "✓ Feito hoje" renova a data para hoje e recalcula a próxima
    listaEl.querySelectorAll('.btn-feito-hoje').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = Number(btn.dataset.index);
        const item = pet.cuidados[idx];
        const hojeISO = new Date().toISOString().split('T')[0];
        item.data = hojeISO;
        const dias = intervalosRotina[item.tipo];
        if (dias) {
          item.proxima = somarDiasISO(hojeISO, dias);
        }
        await persistirPet(pet);
      });
    });

    // Excluir cuidado
    listaEl.querySelectorAll('.btn-del-item').forEach(btn => {
      btn.addEventListener('click', async () => {
        const idx = Number(btn.dataset.index);
        pet.cuidados.splice(idx, 1);
        await persistirPet(pet);
      });
    });
  }

  document.getElementById('badge-ok').textContent = `${ok} Em dia`;
  document.getElementById('badge-warn').textContent = `${warn} Vence em breve`;
  document.getElementById('badge-late').textContent = `${late} Atrasado`;

  // Resumo
  document.getElementById('resumo-conteudo').textContent =
`🐾 *${pet.nome || 'Pet'}*
Raça: ${pet.raca || 'não informada'}
Idade: ${pet.idade || 'não informada'}
Peso: ${pet.pesoAtual || 'não informado'}
Pelagem: ${pet.tipoPelagem || 'não informada'}
Alimentação: ${pet.alimentacao || 'não informada'}
Alergias: ${pet.alergias || 'nenhuma'}
Medicamentos: ${pet.medicamentos || 'nenhum'}
Veterinário: ${pet.telefoneVeterinario || 'não informado'}
Observações: ${pet.comportamento || 'nenhuma'}`;
}

// ==========================================
// 5. EVENTOS DE INTERAÇÃO
// ==========================================

// Toggle Rotina de Cuidados
document.getElementById('btn-toggle-rotina').addEventListener('click', () => {
  const grid = document.getElementById('rotina-conteudo');
  const seta = document.getElementById('rotina-seta');
  grid.classList.toggle('oculto');
  seta.textContent = grid.classList.contains('oculto') ? '▼' : '▲';
});

// Inputs de Intervalo (365, 90, 30, 15, 60 dias)
Object.keys(intervalosRotina).forEach(tipo => {
  const input = document.getElementById(`int-${tipo}`);
  if (input) {
    input.value = intervalosRotina[tipo];
    input.addEventListener('change', () => {
      intervalosRotina[tipo] = Number(input.value) || 30;
      localStorage.setItem('mypet_rotina', JSON.stringify(intervalosRotina));
      atualizarDataProximaAutomatica();
    });
  }
});

document.getElementById('cuidado-tipo').addEventListener('change', atualizarDataProximaAutomatica);
document.getElementById('cuidado-data').addEventListener('change', atualizarDataProximaAutomatica);

// Modal Novo Pet
const modalNovoPet = document.getElementById('modal-novo-pet');

document.getElementById('btn-abrir-modal').addEventListener('click', () => {
  document.getElementById('form-novo-pet').reset();
  modalNovoPet.showModal();
});

document.getElementById('btn-fechar-modal').addEventListener('click', () => {
  modalNovoPet.close();
});

document.getElementById('form-novo-pet').addEventListener('submit', async (e) => {
  e.preventDefault();
  const fileInput = document.getElementById('novo-foto');

  const criarPet = async (fotoBase64) => {
    const novo = {
      id: Date.now(),
      nome: document.getElementById('novo-nome').value,
      raca: document.getElementById('novo-raca').value,
      idade: document.getElementById('novo-idade').value,
      pesoAtual: '',
      tipoPelagem: '',
      telefoneVeterinario: '',
      alimentacao: '',
      alergias: '',
      medicamentos: '',
      comportamento: '',
      fotoUrl: fotoBase64 || FOTO_PADRAO,
      cuidados: []
    };
    pets.push(novo);
    petAtualId = novo.id;
    modalNovoPet.close();
    await persistirPet(novo);
  };

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (ev) => criarPet(ev.target.result);
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    await criarPet(null);
  }
});

document.getElementById('btn-excluir-pet').addEventListener('click', async () => {
  if (pets.length === 1) {
    alert('Você precisa manter pelo menos 1 pet cadastrado!');
    return;
  }
  const atual = getPetAtual();
  if (confirm(`Deseja excluir ${atual.nome}?`)) {
    await excluirPetNoServidor(atual.id);
  }
});

document.getElementById('input-foto').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async (ev) => {
    const pet = getPetAtual();
    pet.fotoUrl = ev.target.result;
    await persistirPet(pet);
  };
  reader.readAsDataURL(file);
});

document.getElementById('form-ficha').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pet = getPetAtual();
  pet.nome = document.getElementById('nome').value;
  pet.raca = document.getElementById('raca').value;
  pet.idade = document.getElementById('idade').value;
  pet.pesoAtual = document.getElementById('pesoAtual').value;
  pet.tipoPelagem = document.getElementById('tipoPelagem').value;
  pet.telefoneVeterinario = document.getElementById('telefoneVeterinario').value;
  pet.alimentacao = document.getElementById('alimentacao').value;
  pet.alergias = document.getElementById('alergias').value;
  pet.medicamentos = document.getElementById('medicamentos').value;
  pet.comportamento = document.getElementById('comportamento').value;
  await persistirPet(pet);
  alert('Ficha salva com sucesso!');
});

document.getElementById('form-cuidado').addEventListener('submit', async (e) => {
  e.preventDefault();
  const pet = getPetAtual();
  if (!pet.cuidados) pet.cuidados = [];
  pet.cuidados.push({
    tipo: document.getElementById('cuidado-tipo').value,
    descricao: document.getElementById('cuidado-desc').value,
    data: document.getElementById('cuidado-data').value,
    proxima: document.getElementById('cuidado-proxima').value
  });
  document.getElementById('cuidado-desc').value = '';
  atualizarDataProximaAutomatica();
  await persistirPet(pet);
});

document.getElementById('btn-copiar').addEventListener('click', () => {
  const texto = document.getElementById('resumo-conteudo').textContent;
  navigator.clipboard.writeText(texto);
  alert('Resumo copiado!');
});

// Aba 4: Gerar Resumo Clínico para o Veterinário
document.getElementById('btn-gerar-ia').addEventListener('click', () => {
  const pet = getPetAtual();
  const obsVet = document.getElementById('vet-observacoes').value.trim();

  if (!obsVet) {
    alert('Escreva primeiro as observações sobre o cão para gerar o resumo!');
    return;
  }

  const historicoCuidados = (pet.cuidados && pet.cuidados.length > 0)
    ? pet.cuidados.map(c => `- ${c.tipo} (${c.descricao || 'geral'}): realizado em ${formatarDataBR(c.data)}`).join('\n')
    : '- Nenhum cuidado preventivo registrado recentemente.';

  const relatorio =
`🩺 *RELATÓRIO PRÉ-CONSULTA — ${pet.nome.toUpperCase()}*

📋 *Identificação:*
• Raça: ${pet.raca || 'Não informada'} | Idade: ${pet.idade || 'Não informada'} | Peso: ${pet.pesoAtual || 'Não informado'}
• Alimentação habitual: ${pet.alimentacao || 'Não informada'}
• Alergias conhecidas: ${pet.alergias || 'Nenhuma relatada'}
• Medicações contínuas: ${pet.medicamentos || 'Nenhuma'}

⚠️ *Motivo da consulta / Sintomas relatados pelo tutor:*
"${obsVet}"

💉 *Histórico recente de cuidados:*
${historicoCuidados}`;

  document.getElementById('vet-resultado-texto').textContent = relatorio;
  document.getElementById('vet-resultado-box').style.display = 'block';
});

document.getElementById('btn-copiar-vet').addEventListener('click', () => {
  const texto = document.getElementById('vet-resultado-texto').textContent;
  navigator.clipboard.writeText(texto);
  alert('Relatório clínico copiado!');
});

// Inicialização
document.getElementById('cuidado-data').valueAsDate = new Date();
atualizarDataProximaAutomatica();
carregarPets();
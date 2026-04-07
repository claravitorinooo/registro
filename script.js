// Seleção de elementos
const form = document.getElementById('form-medidas');
const historicoLista = document.getElementById('historico');

// Função para mudar de tela (Simulando rotas)
function showSection(id) {
    document.getElementById('dashboard').classList.add('hidden');
    document.getElementById('registro').classList.add('hidden');
    document.getElementById(id).classList.remove('hidden');
}

// Lógica de Cálculo e Armazenamento
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    
    // O cálculo que antes era no Java:
    const imc = (peso / (altura * altura)).toFixed(2);

    const novoRegistro = {
        peso: peso,
        imc: imc,
        data: new Date().toLocaleDateString()
    };

    salvarRegistro(novoRegistro);
    atualizarDashboard(novoRegistro);
    form.reset();
    showSection('dashboard');
});

function salvarRegistro(item) {
    let registros = JSON.parse(localStorage.getItem('medidas')) || [];
    registros.push(item);
    localStorage.setItem('medidas', JSON.stringify(registros));
    renderizarHistorico();
}

function atualizarDashboard(item) {
    document.getElementById('display-imc').innerText = item.imc;
    document.getElementById('display-peso').innerText = item.peso + " kg";
}

function renderizarHistorico() {
    let registros = JSON.parse(localStorage.getItem('medidas')) || [];
    historicoLista.innerHTML = registros.map(r => `
        <li class="history-item">Data: ${r.data} | Peso: ${r.peso}kg | <strong>IMC: ${r.imc}</strong></li>
    `).join('');
}

// Iniciar carregando dados antigos
renderizarHistorico();
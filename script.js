// 1. Garantir que o DOM carregou antes de buscar os elementos
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-medidas');
    const displayImc = document.getElementById('display-imc');
    const displayPeso = document.getElementById('display-peso');
    const historicoLista = document.getElementById('historico');

    // Função para mudar de tela
    window.showSection = function(id) {
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('registro').classList.add('hidden');
        const target = document.getElementById(id);
        if (target) target.classList.remove('hidden');
    }

    // Lógica do Formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Pegando os valores e convertendo para número explicitamente
            const peso = parseFloat(document.getElementById('peso').value);
            const altura = parseFloat(document.getElementById('altura').value);

            // Validação de segurança (Aspecto Ético e de Qualidade)
            if (isNaN(peso) || isNaN(altura) || altura <= 0) {
                alert("Por favor, insira valores válidos para peso e altura.");
                return;
            }

            // O CÁLCULO: IMC = peso / altura²
            const imcCalculado = (peso / (altura * altura)).toFixed(2);

            const novoRegistro = {
                peso: peso,
                imc: imcCalculado,
                data: new Date().toLocaleTimeString() + " - " + new Date().toLocaleDateString()
            };

            // Salvar e atualizar a tela
            salvarNoLocalStorage(novoRegistro);
            renderizarTela(novoRegistro);
            
            form.reset();
            showSection('dashboard');
        });
    }

    function salvarNoLocalStorage(item) {
        let dados = JSON.parse(localStorage.getItem('minhasMedidas')) || [];
        dados.unshift(item); // Adiciona no início da lista
        localStorage.setItem('minhasMedidas', JSON.stringify(dados));
    }

    function renderizarTela(ultimo = null) {
        let dados = JSON.parse(localStorage.getItem('minhasMedidas')) || [];
        
        // Atualiza os cards principais com o último dado inserido
        if (dados.length > 0) {
            const topo = ultimo || dados[0];
            displayImc.innerText = topo.imc;
            displayPeso.innerText = topo.peso + " kg";
        }

        // Atualiza a lista de histórico
        historicoLista.innerHTML = dados.map(r => `
            <li class="history-item" style="border-bottom: 1px solid #ddd; padding: 10px;">
                <strong>IMC: ${r.imc}</strong> | Peso: ${r.peso}kg <br>
                <small>${r.data}</small>
            </li>
        `).join('');
    }

    // Inicialização
    renderizarTela();
});
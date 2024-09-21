function consultaPalavra() {
    let nome = document.querySelector('#nome').value.trim().toLowerCase();
    let botao = document.querySelector('#pesquisar');
    let resultado = document.querySelector('#resultado');

    if (!nome) {
        resultado.innerHTML = "Por favor, insira uma palavra.";
        return;
    }

    botao.disabled = true;
    resultado.innerHTML = "<p>Carregando...</p>";

    let url = `https://script.google.com/macros/s/AKfycbwse7G1iBnakUG7RZSMbI9TOVSxxfVLIX_f6_CAwp6BO902J3Q_fni3fB50oU77AeY/exec?palavra=${nome}`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro ao buscar a palavra.");
            }
            return response.json();
        })
        .then(function(data) {
            console.log("Dados recebidos:", data);
            mostrarPalavra(data.retornoDaSaida, nome);
        })
        .catch(function(error) {
            resultado.innerHTML = "<p>Não foi possível encontrar a palavra!</p>";
            console.error("Erro:", error);
        })
        .finally(function() {
            botao.disabled = false;
        });
}

function mostrarPalavra(dados, nomePesquisado) {
    let resultado = document.querySelector('#resultado');
    let encontrou = false;

    dados.forEach(function(item) {
        if (item.Nome.toLowerCase() === nomePesquisado) {
            resultado.innerHTML = `<p>${item.Definicao}</p>`;
            encontrou = true;
        }
    });

    if (!encontrou) {
        resultado.innerHTML = "<p>Não foi possível encontrar a palavra!</p>";
    }
}

// Adiciona um listener de evento para o campo de entrada
document.querySelector('#nome').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        consultaPalavra();
    }
});
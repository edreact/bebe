function consultaPalavra() {
    let nome = document.querySelector('#nome').value.trim().toLowerCase();
    let botao = document.querySelector('#pesquisar');
    let resultado = document.querySelector('#resultado');
    let imagemResultado = document.querySelector('#imagemResultado');
    let card3 = document.querySelector('#card3');

    if (!nome) {
        resultado.innerHTML = "Por favor, insira uma palavra.";
        return;
    }

    botao.disabled = true;
    resultado.innerHTML = "Carregando...";
    imagemResultado.innerHTML = ""; // Limpa a imagem
    card3.style.display = "none"; // Oculta o card da imagem

    let url = `https://script.google.com/macros/s/AKfycbzVL-Aztzhli8aEGL-XXg6lhWBXoMxicXO6TQ2cB9JfZU2HzcJqcaiZNOlgMBSD1P0/exec?palavra=${nome}`;

    fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erro ao buscar a palavra.");
            }
            return response.json();
        })
        .then(function(data) {
            console.log("Dados recebidos:", data);
            mostrarPalavra(data.retornoDaSaida, nome); // Altere para acessar 'retornoDaSaida'
        })
        .catch(function(error) {
            resultado.innerHTML = "Ocorreu um erro ao buscar a palavra.";
            console.error("Erro:", error);
        })
        .finally(function() {
            botao.disabled = false;
        });
}

function mostrarPalavra(dados, nomePesquisado) {
    let resultado = document.querySelector('#resultado');
    let imagemResultado = document.querySelector('#imagemResultado');
    let card3 = document.querySelector('#card3');
    let encontrou = false;

    // Limpar o resultado anterior
    resultado.innerHTML = "";

    // Percorrer o array de palavras para encontrar a correspondência
    dados.forEach(function(item) {
        if (item.Nome.toLowerCase() === nomePesquisado) {
            resultado.innerHTML = `<p><strong>Definição:</strong> ${item.Definicao}</p>`;
            // Se houver uma imagem disponível, mostre-a
            if (item.Imagem && item.Imagem.trim() !== "") {
                imagemResultado.innerHTML = `<img src="${item.Imagem}" alt="Imagem de ${item.Nome}" />`;
                card3.style.display = "block"; // Exibe o card da imagem
            }
            encontrou = true;
        }
    });

    if (!encontrou) {
        resultado.innerHTML = "Não foi possível encontrar a palavra!";
    }
}

// Função para alternar entre modo claro e modo noturno
function toggleMode() {
    let body = document.body;
    body.classList.toggle('dark-mode');

    let toggleButton = document.querySelector('#toggleTheme');
    if (body.classList.contains('dark-mode')) {
        toggleButton.innerHTML = "Modo Claro";
    } else {
        toggleButton.innerHTML = "Modo Noturno";
    }
}
// Adiciona um listener de evento para o campo de entrada
document.querySelector('#nome').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        consultaPalavra();
    }
});

function consultaPalavra() {
    let nome = document.querySelector('#nome').value.trim().toLowerCase();
    let botao = document.querySelector('#pesquisar');
    let resultado = document.querySelector('#resultado');

    if (!nome) {
        resultado.innerHTML = "Por favor, insira uma palavra.";
        return;
    }

    botao.disabled = true;
    resultado.innerHTML = "Carregando...";

    let url = `https://script.google.com/macros/s/AKfycbzIzA9mBph8vHxiSsk71gE_Rl-YCzsPxESgMzIC4m4qf3UwE-LNhp28FSebN8FKdKqM/exec?palavra=${nome}`;

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
    let encontrou = false;

    // Limpar o resultado anterior
    resultado.innerHTML = "";

    // Percorrer o array de palavras para encontrar a correspondência
    dados.forEach(function(item) {
        if (item.Nome.toLowerCase() === nomePesquisado) {
            resultado.innerHTML = `<p>Definição: ${item.Definicao}</p>`;
            // Se houver uma imagem disponível, mostre-a
            if (item.Imagem && item.Imagem.trim() !== "") {
                resultado.innerHTML += `<img src="${item.Imagem}" alt="Imagem de ${item.Nome}" />`;
            }
            encontrou = true;
        }
    });

    if (!encontrou) {
        resultado.innerHTML = "Não foi possível encontrar a palavra!";
    }
}

// Adiciona um listener de evento para o campo de entrada
document.querySelector('#nome').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        consultaPalavra();
    }
});
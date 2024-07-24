document.addEventListener('DOMContentLoaded', () => {
    const gameDetailsContainer = document.getElementById('game-details');
    const relatedGamesContainer = document.getElementById('related-games');

    // Obtém o ID do jogo da URL
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('id');

    // Função para carregar os detalhes do jogo
    function loadGameDetails() {
        fetch('http://localhost:8080/games/1')
            .then(response => response.json())
            .then(data => {
                gameDetailsContainer.innerHTML = `
                    <h2>${data.nameGame}</h2>
                    <img src="${data.gameImage}" alt="${data.nameGame}" class="img-fluid" style="max-width: 600px;">
                    <p><strong>Descrição:</strong> ${data.description}</p>
                    <p><strong>Desenvolvedor:</strong> ${data.developer}</p>
                    <p><strong>Editora:</strong> ${data.publisher}</p>
                    <p><strong>Gênero:</strong> ${data.genre}</p>
                    <p><strong>Preço:</strong> R$ ${data.price.toFixed(2)}</p>
                    <p><strong>Data de Lançamento:</strong> ${new Date(data.releaseDate).toLocaleDateString()}</p>
                    <button class="btn btn-success mt-3">Adicionar ao Carrinho</button>
                `;
                loadRelatedGames(data.genre);
            })
            .catch(error => console.error('Erro ao carregar detalhes do jogo:', error));
    }

    // Função para carregar jogos relacionados
    function loadRelatedGames(genre) {
        fetch(`http://localhost:8080/games/genre/${encodeURIComponent(genre)}`)
            .then(response => response.json())
            .then(games => {
                relatedGamesContainer.innerHTML = '';
                games.forEach(game => {
                    relatedGamesContainer.innerHTML += `
                        <a href="detalhes.html?id=${game.id}" class="list-group-item">
                            <img src="${game.gameImage}" alt="${game.nameGame}">
                            <p>${game.nameGame}</p>
                        </a>
                    `;
                });
            })
            .catch(error => console.error('Erro ao carregar jogos relacionados:', error));
    }

    // Carregar os detalhes do jogo ao carregar a página
    loadGameDetails();
});

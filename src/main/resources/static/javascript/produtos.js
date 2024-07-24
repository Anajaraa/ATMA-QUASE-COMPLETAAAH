document.addEventListener('DOMContentLoaded', function () {
    function loadCategories() {
        return fetch('http://localhost:8080/api/categories')
            .then(response => response.json())
            .then(categories => {
                console.log('Categorias carregadas:', categories);
                return categories;
            })
            .catch(error => console.error('Erro ao carregar categorias:', error));
    }

    function loadGames() {
        return fetch('http://localhost:8080/games')
            .then(response => response.json())
            .then(games => {
                console.log('Jogos carregados:', games);
                return games;
            })
            .catch(error => console.error('Erro ao carregar jogos:', error));
    }

    function organizeGamesByCategory(games, categories) {
        if (!games || !categories) {
            console.error('Jogos ou categorias não estão definidos.');
            return [];
        }
        const categorizedGames = categories.map(category => {
            return {
                ...category,
                jogos: games.filter(game => game.categoryId === category.id)
            };
        });
        console.log('Jogos organizados por categoria:', categorizedGames);
        return categorizedGames;
    }

    function initializePage() {
        Promise.all([loadCategories(), loadGames()])
            .then(([categories, games]) => {
                const categorizedGames = organizeGamesByCategory(games, categories);
                const carouselsContainer = document.getElementById('carousels-container');

                if (!carouselsContainer) {
                    console.error('Elemento carousels-container não encontrado');
                    return;
                }

                categorizedGames.forEach(category => {
                    const carouselId = `carousel-${category.name.toLowerCase()}`;
                    let itemsHtml = '';

                    for (let i = 0; i < category.jogos.length; i += 6) {
                        const activeClass = i === 0 ? 'active' : '';
                        itemsHtml += `<div class="carousel-item ${activeClass}">
                                        <div class="d-flex">`;

                        for (let j = i; j < i + 6 && j < category.jogos.length; j++) {
                            const jogo = category.jogos[j];
                            itemsHtml += `<div class="card mx-2">
                                            <img src="${jogo.gameImage}" class="card-img-top" alt="${jogo.nameGame}">
                                            <div class="card-body">
                                                <h5 class="card-title">${jogo.nameGame}</h5>
                                                <div class="card-price-container">
                                                    <p class="card-text">${jogo.price}</p>
                                                    <a href="#" class="btn btn-primary">Comprar</a>
                                                </div>
                                            </div>
                                        </div>`;
                        }

                        itemsHtml += `  </div>
                                    </div>`;
                    }

                    const carousel = `
                        <h2>${category.name}</h2>
                        <div class="my-4">
                                <div class="carousel-navigation">
                                    <div id="${carouselId}" class="carousel slide">
                                    <div class="carousel-inner">
                                        ${itemsHtml}
                                    </div>
                                    <a class="carousel-control-prev" href="#${carouselId}" role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Anterior</span>
                                    </a>
                                    <a class="carousel-control-next" href="#${carouselId}" role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Próximo</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
                    carouselsContainer.innerHTML += carousel;
                });
            })
            .catch(error => console.error('Erro ao inicializar a página:', error));
    }

    initializePage();
});

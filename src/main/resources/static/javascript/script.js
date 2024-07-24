document.addEventListener('DOMContentLoaded', () => {
    const carrosselLancamentos = document.getElementById('carrossel-lancamentos');
    const carrosselDestaques = document.getElementById('carrossel-destaques');
    const formPesquisa = document.getElementById('form-pesquisa');
    const resultadosPesquisa = document.getElementById('resultados-pesquisa');

    // Função para carregar lançamentos
    function carregarLancamentos() {
        fetch('http://localhost:8080/games')
            .then(response => response.json())
            .then(data => {
                carrosselLancamentos.innerHTML = ''; // Limpa o carrossel existente
                data.slice(0, 3).forEach((jogo, index) => {
                    const div = document.createElement('div');
                    div.className = `carousel-item${index === 0 ? ' active' : ''}`;
                    div.innerHTML = `
                        <img src="${jogo.gameImage}" class="d-block w-100" alt="${jogo.nameGame}" style="height: 500px; object-fit: cover;">
                    `;
                    carrosselLancamentos.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao carregar lançamentos:', error));
    }

    // Função para carregar destaques
    function carregarDestaques() {
        fetch('http://localhost:8080/games')
            .then(response => response.json())
            .then(data => {
                carrosselDestaques.innerHTML = '';
                data.forEach(jogo => {
                    const div = document.createElement('div');
                    div.className = 'col-md-3';
                    div.innerHTML = `
                        <div class="card mb-4">
                            <img src="${jogo.gameImage}" class="card-img-top" alt="${jogo.nameGame}" style="height: 200px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${jogo.nameGame}</h5>
                                <p class="card-text">${jogo.description}</p>
                                <p class="preco">R$ ${jogo.price.toFixed(2)}</p>
                                <a href="#" class="btn btn-success">Comprar</a>
                            </div>
                        </div>
                    `;
                    carrosselDestaques.appendChild(div);
                });
            })
            .catch(error => console.error('Erro ao carregar destaques:', error));
    }

    // Função para carregar resultados da pesquisa e redirecionar para a página de detalhes
    function carregarResultadosPesquisa(query) {
        fetch(`http://localhost:8080/games/pesquisa?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Redireciona para a página de detalhes do primeiro jogo encontrado
                    window.location.href = `http://localhost:8080/detalhes?id=${data[0].id}`;
                } else {
                    alert('Nenhum jogo encontrado.');
                }
            })
            .catch(error => console.error('Erro ao carregar resultados da pesquisa:', error));
    }
    // Carregar lançamentos e destaques ao carregar a página
    carregarLancamentos();
    carregarDestaques();

    // Adicionar evento para pesquisa
    formPesquisa.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = formPesquisa.querySelector('input[name="search"]').value;
        carregarResultadosPesquisa(query);
    });
});

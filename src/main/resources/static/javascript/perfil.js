document.addEventListener('DOMContentLoaded', function () {
    const userIcon = document.getElementById('userIcon');
    const profileLink = document.getElementById('profileLink');
    const logoutLink = document.getElementById('logoutLink');

    // Simule o estado de login - substitua isso pela lógica real
    const isLoggedIn = true; // Mude isso para verificar se o usuário está realmente logado

    if (isLoggedIn) {
        // Se o usuário estiver logado
        userIcon.style.display = 'block'; // Mostrar ícone do usuário
        profileLink.style.display = 'block'; // Mostrar link de perfil
        logoutLink.style.display = 'block'; // Mostrar link de logout

        // Adicionar comportamento de logout
        logoutLink.addEventListener('click', function (event) {
            event.preventDefault();
            // Simule a lógica de logout
            // Aqui, você deve remover o token de autenticação ou redefinir o estado de login
            alert('Logout realizado com sucesso!');
            window.location.href = 'http://localhost:8080'; // Redirecionar para a página inicial ou de login
        });
    } else {
        // Se o usuário não estiver logado
        userIcon.style.display = 'none'; // Ocultar ícone do usuário
        profileLink.style.display = 'none'; // Ocultar link de perfil
        logoutLink.style.display = 'none'; // Ocultar link de logout
    }

    // Adicionar comportamento de redirecionamento para a página de perfil
    profileLink.addEventListener('click', function () {
        window.location.href = 'perfil.html'; // Redirecionar para a página de perfil
    });

    // Configuração dos modais e formulários de edição e favoritos
    const profileImage = document.getElementById('profileImage');
    const uploadImage = document.getElementById('uploadImage');
    const editProfileBtn = document.getElementById('editProfile');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeBtn = document.querySelector('.close-btn');
    const editProfileForm = document.getElementById('editProfileForm');
    const addFavoriteGameBtn = document.getElementById('addFavoriteGame');
    const addFavoriteGameModal = document.getElementById('addFavoriteGameModal');
    const closeFavoriteGameBtn = document.querySelectorAll('.close-btn')[1];
    const addFavoriteGameForm = document.getElementById('addFavoriteGameForm');

    // Exibir modal de edição de perfil
    editProfileBtn.addEventListener('click', function () {
        editProfileModal.style.display = 'block';
    });

    // Fechar modal de edição de perfil
    closeBtn.addEventListener('click', function () {
        editProfileModal.style.display = 'none';
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', function (event) {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = 'none';
        }
        if (event.target == addFavoriteGameModal) {
            addFavoriteGameModal.style.display = 'none';
        }
    });

    // Atualizar informações do perfil
    editProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nome = document.getElementById('nome-edicao').value;
        const email = document.getElementById('email-edicao').value;
        document.getElementById('welcomeMessage').innerText = `Bem-vindo, ${nome}`;
        document.getElementById('userEmail').innerText = email;
        editProfileModal.style.display = 'none';
    });

    // Exibir modal de adicionar jogo favorito
    addFavoriteGameBtn.addEventListener('click', function () {
        addFavoriteGameModal.style.display = 'block';
    });

    // Fechar modal de adicionar jogo favorito
    closeFavoriteGameBtn.addEventListener('click', function () {
        addFavoriteGameModal.style.display = 'none';
    });

    // Adicionar jogo favorito
    addFavoriteGameForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const gameName = document.getElementById('game-name').value;
        const favoriteGamesList = document.getElementById('favoriteGames');
        const listItem = document.createElement('li');
        listItem.innerText = gameName;
        favoriteGamesList.appendChild(listItem);
        addFavoriteGameModal.style.display = 'none';
    });

    // Upload de nova imagem de perfil ao clicar na imagem
    profileImage.addEventListener('click', function () {
        uploadImage.click();
    });

    uploadImage.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

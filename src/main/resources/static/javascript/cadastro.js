document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const apiUrl = 'https://seu-backend-url.com/api'; // Substitua pelo URL do seu backend

    // Função para verificar e redirecionar o usuário
    function checkUserRole(email) {
        const domain = email.split('@')[1];
        if (domain === 'atma.com' || domain === 'atma.com.br') {
            // Redirecionar para a página do administrador
            window.location.href = 'admin.html';
        } else {
            // Redirecionar para a página do usuário final
            window.location.href = 'profile.html';
        }
    }

    // Função para criar novo usuário
    async function registerUser(name, email, password) {
        try {
            const response = await fetch(`${apiUrl}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });

            if (response.ok) {
                alert('Usuário registrado com sucesso!');
                registerForm.reset(); // Limpa o formulário de registro
            } else {
                const error = await response.json();
                alert(`Erro ao registrar: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao registrar usuário:', error);
            alert('Erro ao registrar usuário.');
        }
    }

    // Função para autenticar o usuário
    async function authenticateUser(email, password) {
        try {
            const response = await fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                checkUserRole(email);
                // Opcional: Armazenar o token de autenticação
                // localStorage.setItem('authToken', data.token);
            } else {
                const error = await response.json();
                alert(`E-mail ou senha incorretos: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro ao autenticar usuário:', error);
            alert('Erro ao autenticar usuário.');
        }
    }

    // Manipulador de envio do formulário de registro
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        registerUser(name, email, password);
    });

    // Manipulador de envio do formulário de login
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        authenticateUser(email, password);
    });
});


// EXPLICAÇÃO:

// Explicação das Alterações
// Endpoints da API:

// apiUrl: Substitua https://seu-backend-url.com/api pelo URL do seu backend.
// Função registerUser(name, email, password):

// Faz uma solicitação POST para o endpoint /register para registrar um novo usuário.
// Envia os dados no formato JSON e trata a resposta, exibindo mensagens de sucesso ou erro.
// Função authenticateUser(email, password):

// Faz uma solicitação POST para o endpoint /login para autenticar um usuário.
// Se a autenticação for bem-sucedida, chama checkUserRole(email) para redirecionar o usuário com base no domínio do e-mail.
// Armazenamento de Token (Opcional):

// Após a autenticação, você pode armazenar um token de autenticação (comentado no exemplo) se o backend fornecer um.
// Tratamento de Erros:

// Adiciona tratamento básico de erros para as solicitações de rede.
// Backend Endpoints Esperados
// Certifique-se de que o backend tenha os seguintes endpoints:

// POST /register: Para registrar um novo usuário. Espera um corpo JSON com name, email, e password.
// POST /login: Para autenticar um usuário. Espera um corpo JSON com email e password.
// Esses endpoints devem retornar uma resposta apropriada, incluindo mensagens de erro se necessário.
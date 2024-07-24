document.addEventListener('DOMContentLoaded', () => {
      const gamesTable = document.getElementById('gamesTable').getElementsByTagName('tbody')[0];
      const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
      const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
      const gameForm = document.getElementById('gameForm');
      const userForm = document.getElementById('userForm');
      const orderDetails = document.getElementById('orderDetails');
      const orderForm = document.getElementById('orderForm');
      const orderItemsTable = document.getElementById('orderItemsTable');
      const orderItemsForm = document.getElementById('orderItemsForm');
      
      let selectedGame = null;
      let selectedOrder = null;
      let selectedUser = null;
      let orderItemId = 0;
      let gameId = 0;
      let userId = 0;
      let isEditingOrder = false;
      let isEditingOrderItem = false;
      let isEditingGame = false;
      let isEditingUser = false;
  
      // Carregar dados iniciais
      fetchGames();
      fetchOrders();
      fetchUsers();
  
      // Função para carregar jogos
      async function fetchGames() {
          try {
              const response = await fetch('http://localhost:8080/api/games');
              const data = await response.json();
              gamesTable.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados
              data.forEach(game => {
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${game.id}</td><td>${game.name}</td><td>${game.description}</td><td>${game.price}</td><td>${game.developer}</td><td>${game.releaseDate}</td><td><a href="#" onclick="editGame(${game.id})">Editar</a></td>`;
                  gamesTable.appendChild(row);
              });
          } catch (error) {
              console.error('Erro ao carregar jogos:', error);
          }
      }
  
      // Função para carregar pedidos
      async function fetchOrders() {
          try {
              const response = await fetch('http://localhost:8080/api/orders');
              const data = await response.json();
              ordersTable.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados
              data.forEach(order => {
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${order.id}</td><td>${order.userId}</td><td>${order.gameId}</td><td>${order.status}</td><td>${order.totalPrice}</td><td><a href="#" onclick="editOrder(${order.id})">Editar</a></td>`;
                  ordersTable.appendChild(row);
              });
          } catch (error) {
              console.error('Erro ao carregar pedidos:', error);
          }
      }
  
      // Função para carregar usuários
      async function fetchUsers() {
          try {
              const response = await fetch('http://localhost:8080/api/users');
              const data = await response.json();
              usersTable.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados
              data.forEach(user => {
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${user.id}</td><td>${user.name}</td><td>${user.email}</td><td>${user.createdAt}</td><td><a href="#" onclick="editUser(${user.id})">Editar</a></td>`;
                  usersTable.appendChild(row);
              });
          } catch (error) {
              console.error('Erro ao carregar usuários:', error);
          }
      }
  
      // Função para carregar itens de pedidos
      async function fetchOrderItems() {
          try {
              const response = await fetch('http://localhost:8080/api/orderItems');
              const data = await response.json();
              orderItemsTable.innerHTML = ''; // Limpar a tabela antes de adicionar os novos dados
              data.forEach(orderItem => {
                  const row = document.createElement('tr');
                  row.innerHTML = `<td>${orderItem.id}</td><td>${orderItem.orderId}</td><td>${orderItem.gameId}</td><td>${orderItem.quantity}</td><td>${orderItem.totalPrice}</td><td><a href="#" onclick="editOrderItem(${orderItem.id})">Editar</a></td>`;
                  orderItemsTable.appendChild(row);
              });
          } catch (error) {
              console.error('Erro ao carregar itens de pedidos:', error);
          }
      }
  
      // Funções para editar jogos, pedidos, usuários e itens de pedidos
      function editGame(id) {
          if (isEditingGame) return;
          isEditingGame = true;
          fetchGame(id);
      }
  
      function editOrder(id) {
          if (isEditingOrder) return;
          isEditingOrder = true;
          fetchOrder(id);
      }
  
      function editOrderItem(id) {
          if (isEditingOrderItem) return;
          isEditingOrderItem = true;
          fetchOrderItem(id);
      }
  
      function editUser(id) {
          if (isEditingUser) return;
          isEditingUser = true;
          fetchUser(id);
      }
  
      // Função para carregar um jogo
      async function fetchGame(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/games/${id}`);
              const data = await response.json();
              gameForm.reset();
              gameForm.gameName.value = data.name;
              gameForm.gameDescription.value = data.description;
              gameForm.gamePrice.value = data.price;
              gameForm.gameDeveloper.value = data.developer;
              gameForm.gameReleaseDate.value = data.releaseDate;
              gameForm.gameImageUrl.value = data.imageUrl;
              isEditingGame = true;
          } catch (error) {
              console.error('Erro ao carregar jogo:', error);
          }
      }
  
      // Função para carregar um usuário
      async function fetchUser(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/users/${id}`);
              const data = await response.json();
              userForm.reset();
              userForm.userName.value = data.name;
              userForm.userEmail.value = data.email;
              userForm.userPassword.value = data.password;
              isEditingUser = true;
          } catch (error) {
              console.error('Erro ao carregar usuário:', error);
          }
      }
  
      // Função para carregar um item de pedido
      async function fetchOrderItem(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/orderItems/${id}`);
              const data = await response.json();
              orderItemsForm.reset();
              orderItemsForm.orderItemQuantity.value = data.quantity;
              orderItemsForm.orderItemPrice.value = data.price;
              isEditingOrderItem = true;
          } catch (error) {
              console.error('Erro ao carregar item de pedido:', error);
          }
      }
  
      // Função para editar pedidos
      async function editOrder() {
          if (!isEditingOrder) return;
          try {
              const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      gameId: selectedGame.id,
                      userId: selectedUser.id,
                      status: orderForm.orderStatus.value,
                      totalPrice: orderForm.orderTotalPrice.value
                  })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Pedido editado com sucesso!');
                  fetchOrders();
                  isEditingOrder = false;
              } else {
                  alert('Erro ao editar pedido.');
              }
          } catch (error) {
              console.error('Erro ao editar pedido:', error);
          }
      }
  
      // Função para editar itens de pedidos
      async function editOrderItem() {
          if (!isEditingOrderItem) return;
          try {
              const response = await fetch(`http://localhost:8080/api/orderItems/${orderItemId}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      gameId: selectedGame.id,
                      quantity: orderItemsForm.orderItemQuantity.value,
                      price: orderItemsForm.orderItemPrice.value
                  })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Item de pedido editado com sucesso!');
                  fetchOrderItems();
                  isEditingOrderItem = false;
              } else {
                  alert('Erro ao editar item de pedido.');
              }
          } catch (error) {
              console.error('Erro ao editar item de pedido:', error);
          }
      }
  
      // Função para editar jogo
      async function editGame() {
          if (!isEditingGame) return;
          try {
              const response = await fetch(`http://localhost:8080/api/games/${gameId}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      name: gameForm.gameName.value,
                      description: gameForm.gameDescription.value,
                      price: gameForm.gamePrice.value,
                      developer: gameForm.gameDeveloper.value,
                      releaseDate: gameForm.gameReleaseDate.value,
                      imageUrl: gameForm.gameImageUrl.value
                  })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Jogo editado com sucesso!');
                  fetchGames();
                  isEditingGame = false;
              } else {
                  alert('Erro ao editar jogo.');
              }
          } catch (error) {
              console.error('Erro ao editar jogo:', error);
          }
      }
  
      // Função para editar usuário
      async function editUser() {
          if (!isEditingUser) return;
          try {
              const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                      name: userForm.userName.value,
                      email: userForm.userEmail.value,
                      password: userForm.userPassword.value
                  })
              });
              const data = await response.json();
              if (data.success) {
                  alert('Usuário editado com sucesso!');
                  fetchUsers();
                  isEditingUser = false;
              } else {
                  alert('Erro ao editar usuário.');
              }
          } catch (error) {
              console.error('Erro ao editar usuário:', error);
          }
      }
  
      // Função para excluir jogo
      async function deleteGame(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/games/${id}`, {
                  method: 'DELETE'
              });
              if (response.ok) {
                  alert('Jogo excluído com sucesso!');
                  fetchGames();
              } else {
                  alert('Erro ao excluir jogo.');
              }
          } catch (error) {
              console.error('Erro ao excluir jogo:', error);
          }
      }
  
      // Função para excluir pedido
      async function deleteOrder(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/orders/${id}`, {
                  method: 'DELETE'
              });
              if (response.ok) {
                  alert('Pedido excluído com sucesso!');
                  fetchOrders();
              } else {
                  alert('Erro ao excluir pedido.');
              }
          } catch (error) {
              console.error('Erro ao excluir pedido:', error);
          }
      }
  
      // Função para excluir usuário
      async function deleteUser(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                  method: 'DELETE'
              });
              if (response.ok) {
                  alert('Usuário excluído com sucesso!');
                  fetchUsers();
              } else {
                  alert('Erro ao excluir usuário.');
              }
          } catch (error) {
              console.error('Erro ao excluir usuário:', error);
          }
      }
  
      // Função para excluir item de pedido
      async function deleteOrderItem(id) {
          try {
              const response = await fetch(`http://localhost:8080/api/orderItems/${id}`, {
                  method: 'DELETE'
              });
              if (response.ok) {
                  alert('Item de pedido excluído com sucesso!');
                  fetchOrderItems();
              } else {
                  alert('Erro ao excluir item de pedido.');
              }
          } catch (error) {
              console.error('Erro ao excluir item de pedido:', error);
          }
      }
  });

  
  //EXPLICAÇÃO DO CÓDIGO

//   O que o Código Faz:

// Esse código JavaScript é responsável por gerenciar a interface administrativa do seu aplicativo, permitindo que você visualize, edite e exclua dados de jogos, pedidos e usuários.
// O código usa fetch para se comunicar com uma API backend e atualizar as informações exibidas na página.
// Eventos Iniciais:

// document.addEventListener('DOMContentLoaded', () => { ... });
// Este evento garante que o código só execute após o carregamento completo da página.
// Elementos da Página:

// O código usa document.getElementById para acessar as tabelas e formulários da página, como as tabelas para jogos, pedidos e usuários, e os formulários para edição.
// Funções para Carregar Dados:

// fetchGames(), fetchOrders(), fetchUsers(), fetchOrderItems()
// Essas funções fazem requisições fetch para obter dados da API backend e atualizar as tabelas na página.
// Como Funciona:
// Faz uma requisição GET para o endpoint da API (por exemplo, http://localhost:8080/api/games).
// Recebe uma resposta no formato JSON.
// Atualiza a tabela correspondente na página com os dados recebidos.
// Funções de Edição:

// editGame(id), editOrder(id), editOrderItem(id), editUser(id)
// Essas funções preenchem os formulários de edição com os dados de um item selecionado para edição.
// Como Funciona:
// Faz uma requisição GET para obter os dados do item com o ID fornecido.
// Preenche o formulário com esses dados.
// Marca que o item está em modo de edição.
// Funções de Atualização:

// editGame(), editOrder(), editOrderItem(), editUser()
// Essas funções enviam os dados modificados de volta para o backend para atualizar o item correspondente.
// Como Funciona:
// Faz uma requisição PUT para o endpoint da API com os dados atualizados.
// Se a atualização for bem-sucedida, a tabela é atualizada e o modo de edição é desmarcado.
// Funções de Exclusão:

// deleteGame(id), deleteOrder(id), deleteUser(id), deleteOrderItem(id)
// Essas funções enviam uma requisição para excluir um item específico.
// Como Funciona:
// Faz uma requisição DELETE para o endpoint da API com o ID do item a ser excluído.
// Se a exclusão for bem-sucedida, a tabela é atualizada para remover o item excluído.
// Integração com Backend e Frontend
// Integração com o Backend:

// Backend: Geralmente implementado com um framework como Spring Boot, que expõe uma API RESTful.
// Frontend: O JavaScript usa fetch para se comunicar com essas APIs.
// Endpoints: Os endpoints (como http://localhost:8080/api/games) são onde as requisições GET, PUT, POST, e DELETE são enviadas e recebidas.
// Resposta: O backend retorna dados em formato JSON, que o JavaScript usa para atualizar a interface do usuário.
// Integração com o Frontend:

// Visualização: O JavaScript atualiza o DOM (Document Object Model) para refletir os dados que são carregados do backend.
// Formulários: Quando um formulário é enviado, o JavaScript faz uma requisição ao backend para atualizar ou excluir dados e, em seguida, atualiza a página conforme necessário.
// Ações do Usuário: As ações do usuário (como clicar em "Editar" ou "Excluir") são capturadas e usadas para fazer requisições apropriadas ao backend.
// Exemplo Prático
// Imagine que você queira editar um jogo:

// Visualizar Jogos: Você vê uma lista de jogos na tabela.
// Selecionar um Jogo para Editar: Clica em "Editar" ao lado do jogo desejado.
// Preencher o Formulário de Edição: O formulário é preenchido com os dados do jogo.
// Enviar as Alterações: Você faz alterações e envia o formulário.
// Atualização no Backend: O JavaScript envia uma requisição PUT para o backend com os dados atualizados.
// Atualização na Interface: Se a atualização for bem-sucedida, a tabela de jogos é atualizada para refletir as mudanças.
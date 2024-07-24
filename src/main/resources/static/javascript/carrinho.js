document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    const continuarComprandoButton = document.getElementById('continuarComprando');
    const irParaPagamentoButton = document.getElementById('irParaPagamento');

    async function fetchCart() {
        try {
            const response = await fetch('/api/cart');
            const cart = await response.json();
            renderCart(cart);
        } catch (error) {
            console.error('Erro ao buscar o carrinho:', error);
        }
    }

    async function removeItemFromCart(itemId) {
        try {
            await fetch(`/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            fetchCart();
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
        }
    }

    function renderCart(cart) {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let quantity = 0;
        cart.forEach(item => {
            total += item.price;
            quantity += 1;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>Preço: R$${item.price.toFixed(2)}</p>
                </div>
                <button class="remover-item" data-id="${item.id}">Remover</button>
            `;
            cartItemsContainer.appendChild(cartItem);
        });
        cartTotalElement.innerHTML = `<h3>Total: R$${total.toFixed(2)}</h3><p>Quantidade de itens: ${quantity}</p>`;
        attachRemoveButtons();
    }

    function attachRemoveButtons() {
        document.querySelectorAll('.remover-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const itemId = e.target.getAttribute('data-id');
                removeItemFromCart(itemId);
            });
        });
    }

    continuarComprandoButton.addEventListener('click', () => {
        window.location.href = 'loja.html';
    });

    irParaPagamentoButton.addEventListener('click', () => {
        window.location.href = 'pagamento.html';
    });

    fetchCart();
});

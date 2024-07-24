package br.com.atma.Service;

import br.com.atma.dto.CartItemDTO;
import br.com.atma.dto.ShoppingCartDTO;
import br.com.atma.model.CartItem;
import br.com.atma.model.Game;
import br.com.atma.model.ShoppingCart;
import br.com.atma.model.UserProfile;
import br.com.atma.repository.CartItemRepository;
import br.com.atma.repository.GameRepository;
import br.com.atma.repository.ShoppingCartRepository;
import br.com.atma.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShoppingCartService {

    @Autowired
    private ShoppingCartRepository shoppingCartRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private GameRepository gameRepository; // Adicione a dependência do repositório de jogos

    public ShoppingCartDTO addItemToCart(String email, CartItemDTO itemDTO) {
        // Obter o perfil do usuário pelo e-mail
        UserProfile userProfile = userProfileRepository.findByEmail(email);
        if (userProfile == null) {
            throw new RuntimeException("UserProfile not found for email: " + email);
        }

        // Obter o carrinho de compras do usuário
        ShoppingCart cart = shoppingCartRepository.findByUserProfileId(userProfile.getId());
        if (cart == null) {
            cart = new ShoppingCart();
            cart.setUserProfile(userProfile); // Associar o perfil do usuário ao carrinho
        }

        // Obter o jogo pelo ID
        Game game = gameRepository.findById(itemDTO.getGameId()).orElseThrow(() -> new RuntimeException("Game not found with ID: " + itemDTO.getGameId()));

        // Adicionar item ao carrinho
        CartItem item = new CartItem();
        item.setGame(game); // Definir o jogo no item
        item.setQuantity(itemDTO.getQuantity());
        item.setShoppingCart(cart);

        // Salvar o item no repositório
        cartItemRepository.save(item);

        // Atualizar o carrinho e salvar
        cart.getItems().add(item);
        shoppingCartRepository.save(cart);

        // Converter o carrinho para DTO e retornar
        return convertToDTO(cart);
    }

    private ShoppingCartDTO convertToDTO(ShoppingCart cart) {
        ShoppingCartDTO dto = new ShoppingCartDTO();
        dto.setId(cart.getId());
        dto.setUserProfileId(cart.getUserProfile().getId());
        // Adicionar mais informações do carrinho conforme necessário
        return dto;
    }
}

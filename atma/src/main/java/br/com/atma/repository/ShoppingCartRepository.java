package br.com.atma.repository;

import br.com.atma.model.ShoppingCart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingCartRepository extends JpaRepository<ShoppingCart, Long> {
    ShoppingCart findByUserProfileId(Long userProfileId); // Método para encontrar pelo ID do perfil do usuário
}

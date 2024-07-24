package br.com.atma.repository;




import br.com.atma.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Optional<Game> findByNameGame(String nameGame);
    List<Game> findByCategoryId(Long categoryId);
}

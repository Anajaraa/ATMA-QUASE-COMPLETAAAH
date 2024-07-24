package br.com.atma.repository;

import br.com.atma.model.FavoriteGame;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoriteGameRepository extends JpaRepository<FavoriteGame, Long> {

}

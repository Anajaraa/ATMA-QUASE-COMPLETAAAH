package br.com.atma.Service;

import br.com.atma.dto.GameDTO;
import br.com.atma.model.Category;
import br.com.atma.model.Game;
import br.com.atma.repository.CategoryRepository;
import br.com.atma.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<GameDTO> getAllGames() {
        List<Game> games = gameRepository.findAll();
        return games.stream()
                .map(GameDTO::new)
                .collect(Collectors.toList());
    }

    public GameDTO getGameById(Long id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));
        return new GameDTO(game);
    }

    public Game saveGame(GameDTO gameDto) {
        // Verifica se o jogo já existe
        Optional<Game> existingGame = gameRepository.findByNameGame(gameDto.getNameGame());
        if (existingGame.isPresent()) {
            throw new RuntimeException("Jogo com o nome " + gameDto.getNameGame() + " já existe.");
        }

        Game game = new Game();
        game.setNameGame(gameDto.getNameGame());
        game.setDescription(gameDto.getDescription());
        game.setDeveloper(gameDto.getDeveloper());
        game.setPublisher(gameDto.getPublisher());
        game.setGenre(gameDto.getGenre());
        game.setPrice(gameDto.getPrice());
        game.setGameImage(gameDto.getGameImage());
        game.setReleaseDate(gameDto.getReleaseDate());

        if (gameDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(gameDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
            game.setCategory(category);
        } else {
            throw new RuntimeException("É necessário fornecer uma categoria para o jogo.");
        }

        return gameRepository.save(game);
    }

    public List<GameDTO> getGamesByCategory(Long categoryId) {
        List<Game> games = gameRepository.findByCategoryId(categoryId);
        return games.stream()
                .map(GameDTO::new)
                .collect(Collectors.toList());
    }

    public boolean deleteGameById(Long id) {
        if (!gameRepository.existsById(id)) {
            return false; // Jogo não encontrado
        }
        gameRepository.deleteById(id);
        return true; // Jogo excluído com sucesso
    }

    public GameDTO updateGame(Long gameId, GameDTO gameDto) {
        Game existingGame = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Jogo não encontrado"));

        existingGame.setNameGame(gameDto.getNameGame());
        existingGame.setDescription(gameDto.getDescription());
        existingGame.setDeveloper(gameDto.getDeveloper());
        existingGame.setPublisher(gameDto.getPublisher());
        existingGame.setGenre(gameDto.getGenre());
        existingGame.setPrice(gameDto.getPrice());
        existingGame.setGameImage(gameDto.getGameImage());
        existingGame.setReleaseDate(gameDto.getReleaseDate());

        if (gameDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(gameDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Categoria não encontrada"));
            existingGame.setCategory(category);
        }

        Game updatedGame = gameRepository.save(existingGame);
        return new GameDTO(updatedGame);
    }
}

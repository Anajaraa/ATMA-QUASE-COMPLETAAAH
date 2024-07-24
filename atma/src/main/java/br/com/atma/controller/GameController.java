package br.com.atma.controller;

import br.com.atma.Service.GameService;
import br.com.atma.dto.GameDTO;
import br.com.atma.model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {


        @Autowired
        private GameService gameService;

        @GetMapping
        public ResponseEntity<List<GameDTO>> getAllGames() {
            List<GameDTO> gameDtos = gameService.getAllGames();
            return new ResponseEntity<>(gameDtos, HttpStatus.OK);
        }

        @PostMapping(consumes = "application/json")
        public ResponseEntity<GameDTO> createGame(@RequestBody GameDTO gameDto) {
            try {
                Game game = gameService.saveGame(gameDto);
                return new ResponseEntity<>(new GameDTO(game), HttpStatus.CREATED);
            } catch (RuntimeException e) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        }

        @GetMapping("/{gameId}")
        public ResponseEntity<GameDTO> getGameById(@PathVariable Long gameId) {
            GameDTO gameDto = gameService.getGameById(gameId);
            if (gameDto != null) {
                return new ResponseEntity<>(gameDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        }

    @PutMapping(value = "/{gameId}", consumes = "application/json")
    public ResponseEntity<GameDTO> updateGame(@PathVariable Long gameId, @RequestBody GameDTO gameDto) {
        try {
            GameDTO updatedGameDto = gameService.updateGame(gameId, gameDto);
            if (updatedGameDto != null) {
                return new ResponseEntity<>(updatedGameDto, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

        @DeleteMapping("/{gameId}")
        public ResponseEntity<Void> deleteGameById(@PathVariable Long gameId) {
            try {
                boolean isRemoved = gameService.deleteGameById(gameId);
                if (isRemoved) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            } catch (RuntimeException e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        @GetMapping("/category/{categoryId}")
        public ResponseEntity<List<GameDTO>> getGamesByCategory(@PathVariable Long categoryId) {
            List<GameDTO> gameDtos = gameService.getGamesByCategory(categoryId);
            return new ResponseEntity<>(gameDtos, HttpStatus.OK);
        }

        // Outros endpoints...
    }

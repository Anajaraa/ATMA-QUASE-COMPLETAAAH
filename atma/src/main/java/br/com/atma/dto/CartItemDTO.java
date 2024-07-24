package br.com.atma.dto;

public class CartItemDTO {

    private Long gameId; // Adicione este campo
    private int quantity;

    // Getters e Setters
    public Long getGameId() {
        return gameId;
    }

    public void setGameId(Long gameId) {
        this.gameId = gameId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}

package br.com.atma.dto;

import br.com.atma.model.Role;

import java.util.List;

public class UserProfileDTO {
    private Long id;
    private String name;
    private String email;
    private String profileImage;
    private Role role; // Adicionado campo role
    private List<FavoriteGameDTO> favoriteGames;
    private List<PurchaseHistoryDTO> purchaseHistory;

    // Getters e setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<FavoriteGameDTO> getFavoriteGames() {
        return favoriteGames;
    }

    public void setFavoriteGames(List<FavoriteGameDTO> favoriteGames) {
        this.favoriteGames = favoriteGames;
    }

    public List<PurchaseHistoryDTO> getPurchaseHistory() {
        return purchaseHistory;
    }

    public void setPurchaseHistory(List<PurchaseHistoryDTO> purchaseHistory) {
        this.purchaseHistory = purchaseHistory;
    }
}

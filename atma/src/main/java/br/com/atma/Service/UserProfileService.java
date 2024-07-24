package br.com.atma.Service;
import br.com.atma.dto.FavoriteGameDTO;
import br.com.atma.dto.PurchaseHistoryDTO;
import br.com.atma.dto.UserProfileDTO;
import br.com.atma.model.FavoriteGame;
import br.com.atma.model.PurchaseHistory;
import br.com.atma.model.Role;
import br.com.atma.model.UserProfile;
import br.com.atma.repository.FavoriteGameRepository;
import br.com.atma.repository.PurchaseHistoryRepository;
import br.com.atma.repository.UserProfileRepository;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository userProfileRepository;

    @Autowired
    private FavoriteGameRepository favoriteGameRepository;

    @Autowired
    private PurchaseHistoryRepository purchaseHistoryRepository;

    public List<UserProfileDTO> getAllUserProfiles() {
        List<UserProfile> userProfiles = userProfileRepository.findAll();
        return userProfiles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<UserProfileDTO> getUserProfileById(Long id) {
        return userProfileRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Transactional
    public UserProfileDTO createUserProfile(UserProfileDTO userProfileDTO) {
        UserProfile userProfile = convertToEntity(userProfileDTO);
        UserProfile savedUserProfile = userProfileRepository.save(userProfile);
        return convertToDTO(savedUserProfile);
    }

    @Transactional
    public UserProfileDTO updateUserProfile(Long id, UserProfileDTO userProfileDTO) {
        UserProfile existingUserProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserProfile not found for this id :: " + id));

        existingUserProfile.setName(userProfileDTO.getName());
        existingUserProfile.setEmail(userProfileDTO.getEmail());
        existingUserProfile.setProfileImage(userProfileDTO.getProfileImage());

        if (existingUserProfile.getRole() == Role.USER) {
            // Atualizar favoriteGames
            List<FavoriteGame> updatedFavoriteGames = userProfileDTO.getFavoriteGames().stream()
                    .map(fgDTO -> {
                        FavoriteGame game = favoriteGameRepository.findById(fgDTO.getId())
                                .orElse(new FavoriteGame());
                        game.setId(fgDTO.getId());
                        game.setGameName(fgDTO.getGameName());
                        game.setUserProfile(existingUserProfile);
                        return game;
                    }).collect(Collectors.toList());

            // Atualizar purchaseHistory
            List<PurchaseHistory> updatedPurchaseHistory = userProfileDTO.getPurchaseHistory().stream()
                    .map(phDTO -> {
                        PurchaseHistory purchase = purchaseHistoryRepository.findById(phDTO.getId())
                                .orElse(new PurchaseHistory());
                        purchase.setId(phDTO.getId());
                        purchase.setPurchaseName(phDTO.getPurchaseName());
                        purchase.setUserProfile(existingUserProfile);
                        return purchase;
                    }).collect(Collectors.toList());

            // Atualizar as coleções
            existingUserProfile.getFavoriteGames().clear();
            existingUserProfile.getFavoriteGames().addAll(updatedFavoriteGames);

            existingUserProfile.getPurchaseHistory().clear();
            existingUserProfile.getPurchaseHistory().addAll(updatedPurchaseHistory);
        }

        UserProfile updatedUserProfile = userProfileRepository.save(existingUserProfile);
        return convertToDTO(updatedUserProfile);
    }

    @Transactional
    public void deleteUserProfile(Long id) {
        UserProfile userProfile = userProfileRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserProfile not found for this id :: " + id));
        if (userProfile.getRole() == Role.ADMIN) {
            throw new RuntimeException("Admin profiles cannot be deleted.");
        }
        userProfileRepository.delete(userProfile);
    }

    private UserProfileDTO convertToDTO(UserProfile userProfile) {
        UserProfileDTO userProfileDTO = new UserProfileDTO();
        userProfileDTO.setId(userProfile.getId());
        userProfileDTO.setName(userProfile.getName());
        userProfileDTO.setEmail(userProfile.getEmail());
        userProfileDTO.setProfileImage(userProfile.getProfileImage());
        userProfileDTO.setRole(userProfile.getRole());
        if (userProfile.getRole() == Role.USER) {
            userProfileDTO.setFavoriteGames(userProfile.getFavoriteGames().stream()
                    .map(fg -> {
                        FavoriteGameDTO fgDTO = new FavoriteGameDTO();
                        fgDTO.setId(fg.getId());
                        fgDTO.setGameName(fg.getGameName());
                        return fgDTO;
                    }).collect(Collectors.toList()));
            userProfileDTO.setPurchaseHistory(userProfile.getPurchaseHistory().stream()
                    .map(ph -> {
                        PurchaseHistoryDTO phDTO = new PurchaseHistoryDTO();
                        phDTO.setId(ph.getId());
                        phDTO.setPurchaseName(ph.getPurchaseName());
                        return phDTO;
                    }).collect(Collectors.toList()));
        }
        return userProfileDTO;
    }

    private UserProfile convertToEntity(UserProfileDTO userProfileDTO) {
        UserProfile userProfile = new UserProfile();
        userProfile.setId(userProfileDTO.getId());
        userProfile.setName(userProfileDTO.getName());
        userProfile.setEmail(userProfileDTO.getEmail());
        userProfile.setProfileImage(userProfileDTO.getProfileImage());
        userProfile.setRole(userProfileDTO.getRole());
        if (userProfileDTO.getRole() == Role.USER) {
            userProfile.setFavoriteGames(userProfileDTO.getFavoriteGames().stream()
                    .map(fgDTO -> {
                        FavoriteGame fg = new FavoriteGame();
                        fg.setId(fgDTO.getId());
                        fg.setGameName(fgDTO.getGameName());
                        fg.setUserProfile(userProfile);
                        return fg;
                    }).collect(Collectors.toList()));
            userProfile.setPurchaseHistory(userProfileDTO.getPurchaseHistory().stream()
                    .map(phDTO -> {
                        PurchaseHistory ph = new PurchaseHistory();
                        ph.setId(phDTO.getId());
                        ph.setPurchaseName(phDTO.getPurchaseName());
                        ph.setUserProfile(userProfile);
                        return ph;
                    }).collect(Collectors.toList()));
        }
        return userProfile;
    }
}

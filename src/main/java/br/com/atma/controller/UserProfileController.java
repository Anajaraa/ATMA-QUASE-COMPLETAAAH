package br.com.atma.controller;


import br.com.atma.Service.UserProfileService;
import br.com.atma.dto.UserProfileDTO;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userprofiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public List<UserProfileDTO> getAllUserProfiles() {
        return userProfileService.getAllUserProfiles();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getUserProfileById(@PathVariable Long id) {
        UserProfileDTO userProfileDTO = userProfileService.getUserProfileById(id)
                .orElseThrow(() -> new ResourceNotFoundException("UserProfile not found for this id :: " + id));
        return ResponseEntity.ok().body(userProfileDTO);
    }

    @PostMapping
    public UserProfileDTO createUserProfile(@RequestBody UserProfileDTO userProfileDTO) {
        return userProfileService.createUserProfile(userProfileDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserProfileDTO> updateUserProfile(@PathVariable Long id, @RequestBody UserProfileDTO userProfileDTO) {
        UserProfileDTO updatedUserProfileDTO = userProfileService.updateUserProfile(id, userProfileDTO);
        return ResponseEntity.ok(updatedUserProfileDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserProfile(@PathVariable Long id) {
        userProfileService.deleteUserProfile(id);
        return ResponseEntity.noContent().build();
    }
}

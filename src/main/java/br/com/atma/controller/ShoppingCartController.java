package br.com.atma.controller;


import br.com.atma.Service.ShoppingCartService;
import br.com.atma.dto.CartItemDTO;
import br.com.atma.dto.ShoppingCartDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class ShoppingCartController {

    @Autowired
    private ShoppingCartService shoppingCartService;

    @PostMapping("/add")
    public ResponseEntity<ShoppingCartDTO> addItemToCart(@RequestParam String email, @RequestBody CartItemDTO itemDTO) {
        try {
            ShoppingCartDTO cartDTO = shoppingCartService.addItemToCart(email, itemDTO);
            return ResponseEntity.ok(cartDTO);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}

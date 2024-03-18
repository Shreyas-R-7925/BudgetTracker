package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.model.User;
import com.example.ReactSpringMongo.repository.UserRepository;
import com.example.ReactSpringMongo.resource.UserRequest;
import com.fasterxml.jackson.core.JsonParser;
import org.bson.json.JsonObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @PostMapping("/user")
    public ResponseEntity<User> createUser(@RequestBody UserRequest userRequest){

        User user = new User();
        user.setUsername(userRequest.getUsername());
        user.setEmail(userRequest.getEmail());
        user.setPassword(userRequest.getPassword());

        return ResponseEntity.status(201).body(this.userRepository.save(user));
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(this.userRepository.findAll());
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity deleteUserById(@PathVariable String id){

        Optional<User> user = this.userRepository.findById(id);

        if(user.isPresent()){
            this.userRepository.deleteById(id);
            return ResponseEntity.ok("Deleted Successfully");
        }
        else{
            return ResponseEntity.ok("The product with id: " +id + "was not found.");
        }
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return ResponseEntity.ok(user.getPassword());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/user/{id}/change-password")
    public ResponseEntity<?> changePassword(@PathVariable String id, @RequestBody String newPasswordJson) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Extract the new password value manually
            String newPassword = extractNewPassword(newPasswordJson);
            // Set the new password
            user.setPassword(newPassword);
            userRepository.save(user);
            return ResponseEntity.ok("Password changed successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Method to extract the new password value from the JSON string
    private String extractNewPassword(String newPasswordJson) {
        int startIndex = newPasswordJson.indexOf(":") + 1;
        int endIndex = newPasswordJson.length() - 1;
        return newPasswordJson.substring(startIndex, endIndex).replaceAll("[^a-zA-Z0-9]", "");
    }

}

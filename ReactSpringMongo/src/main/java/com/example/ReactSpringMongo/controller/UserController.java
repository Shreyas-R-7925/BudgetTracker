package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.model.User;
import com.example.ReactSpringMongo.repository.UserRepository;
import com.example.ReactSpringMongo.resource.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}

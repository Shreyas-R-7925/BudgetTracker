package com.example.ReactSpringMongo.repository;

import com.example.ReactSpringMongo.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
}

package com.example.ReactSpringMongo.repository;

import com.example.ReactSpringMongo.model.Target;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TargetRepository extends MongoRepository<Target, String> {
    List<Target> findByUserId(String userId);
}

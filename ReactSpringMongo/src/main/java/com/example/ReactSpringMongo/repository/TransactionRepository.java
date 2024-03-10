package com.example.ReactSpringMongo.repository;

import com.example.ReactSpringMongo.model.Transaction;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TransactionRepository extends MongoRepository<Transaction, String> {

}

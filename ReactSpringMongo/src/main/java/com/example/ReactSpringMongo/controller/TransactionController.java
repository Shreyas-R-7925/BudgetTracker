package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.model.Transaction;
import com.example.ReactSpringMongo.repository.TransactionRepository;
import com.example.ReactSpringMongo.resource.TransactionRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
    private final TransactionRepository transactionRepository;

    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest transactionRequest){
        Transaction transaction = new Transaction();
        transaction.setUserId(transactionRequest.getUserId());
        transaction.setCategoryId(transactionRequest.getCategoryId());
        transaction.setAmount(transactionRequest.getAmount());
        transaction.setDescription(transactionRequest.getDescription());
        return ResponseEntity.status(201).body(this.transactionRepository.save(transaction));
    }

}

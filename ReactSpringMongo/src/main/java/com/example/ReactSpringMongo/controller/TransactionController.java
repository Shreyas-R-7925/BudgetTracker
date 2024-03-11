package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.model.Transaction;
import com.example.ReactSpringMongo.model.User;
import com.example.ReactSpringMongo.repository.TransactionRepository;
import com.example.ReactSpringMongo.resource.TransactionRequest;
import com.example.ReactSpringMongo.resource.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
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
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse(transactionRequest.getDate());
            transaction.setDate(date);
        } catch (ParseException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(201).body(this.transactionRepository.save(transaction));
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        return ResponseEntity.ok(this.transactionRepository.findAll());
    }

    @DeleteMapping("/transactions/{id}")
    public ResponseEntity deleteTransactionById(@PathVariable String id){

        Optional<Transaction> transaction = this.transactionRepository.findById(id);

        if(transaction.isPresent()){
            this.transactionRepository.deleteById(id);
            return ResponseEntity.ok("Deleted Successfully");
        }
        else{
            return ResponseEntity.ok("The product with id: " +id + "was not found.");
        }
    }

    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable String id, @RequestBody TransactionRequest transactionRequest){
        Optional<Transaction> optionalTransaction = this.transactionRepository.findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction transaction = optionalTransaction.get();
            transaction.setUserId(transactionRequest.getUserId());
            transaction.setCategoryId(transactionRequest.getCategoryId());
            transaction.setAmount(transactionRequest.getAmount());
            transaction.setDescription(transactionRequest.getDescription());
            try {
                SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
                Date date = formatter.parse(transactionRequest.getDate());
                transaction.setDate(date);
            } catch (ParseException e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.ok(this.transactionRepository.save(transaction));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

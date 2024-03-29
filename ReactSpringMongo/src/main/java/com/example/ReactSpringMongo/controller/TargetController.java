package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.model.Target;
import com.example.ReactSpringMongo.model.Transaction;
import com.example.ReactSpringMongo.repository.TargetRepository;
import com.example.ReactSpringMongo.resource.TargetRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class TargetController {

    private final TargetRepository targetRepository;

    public TargetController(TargetRepository targetRepository) {
        this.targetRepository = targetRepository;
    }

    @PostMapping("/target")
    public ResponseEntity<Target> createTarget(@RequestBody TargetRequest targetRequest) {
        try {
            Target target = new Target();
            target.setUserId(targetRequest.getUserId());
            target.setTargetAmount(targetRequest.getTargetAmount());

            // Combine the month and year received from the frontend with a default day (e.g., 01)
            String[] parts = targetRequest.getDate().split("-");
            int month = Integer.parseInt(parts[0]);
            int year = Integer.parseInt(parts[1]);

            // Set the day to 01 and create the date string in "dd-MM-yyyy" format
            String formattedDate = "01-" + targetRequest.getDate();

            // Parse the combined date string using the formatter
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            Date date = formatter.parse(formattedDate);

            target.setDate(date);
            target.setNotes(targetRequest.getNotes());

            Target createdTarget = targetRepository.save(target);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTarget);
        } catch (ParseException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/target/{userId}")
    public ResponseEntity<List<Target>> getAllTargetsByUserId(@PathVariable String userId) {
        List<Target> userTargets = targetRepository.findByUserId(userId);
        if (userTargets.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userTargets);
    }

    @DeleteMapping("/target/{id}")
    public ResponseEntity deleteTargetById(@PathVariable String id){

        Optional<Target> target = this.targetRepository.findById(id);

        if(target.isPresent()){
            this.targetRepository.deleteById(id);
            return ResponseEntity.ok("Deleted Successfully");
        }
        else{
            return ResponseEntity.ok("The target with id: " +id + "was not found.");
        }
    }
}

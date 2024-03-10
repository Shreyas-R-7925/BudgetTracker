package com.example.ReactSpringMongo.controller;

import com.example.ReactSpringMongo.repository.UserRepository;
import com.example.ReactSpringMongo.model.Category;
import com.example.ReactSpringMongo.model.User;
import com.example.ReactSpringMongo.repository.CategoryRepository;
import com.example.ReactSpringMongo.resource.CategoryRequest;
import com.example.ReactSpringMongo.resource.UserRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
public class CategoryController {
    private final CategoryRepository categoryRepository;
//    private final UserRepository userRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @PostMapping("/categories")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryRequest categoryRequest){

        Category category = new Category();
        category.setCategoryName(categoryRequest.getCategoryName());
        category.setUserId(categoryRequest.getUserId());

        return ResponseEntity.status(201).body(this.categoryRepository.save(category)); //in this line ur saving created category(line 33)
    }


}

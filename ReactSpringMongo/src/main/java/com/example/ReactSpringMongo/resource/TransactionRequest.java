package com.example.ReactSpringMongo.resource;

import java.util.Date;

public class TransactionRequest {

    private String userId;

    private String categoryId;

    private double amount;

    private String description;

    private String date;

    public TransactionRequest() {
    }

    public TransactionRequest(String userId, String categoryId, double amount, String description, String date) {
        this.userId = userId;
        this.categoryId = categoryId;
        this.amount = amount;
        this.description = description;
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date){
        this.date = date;
    }
}

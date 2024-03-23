package com.example.ReactSpringMongo.resource;

import java.util.Date;

public class TargetRequest {

    private String userId;

    private double targetAmount;

    private String date;

    private String notes;

    public TargetRequest() {
    }

    public TargetRequest(String userId, double targetAmount, String date, String notes) {
        this.userId = userId;
        this.targetAmount = targetAmount;
        this.date = date;
        this.notes = notes;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public double getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(double targetAmount) {
        this.targetAmount = targetAmount;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}

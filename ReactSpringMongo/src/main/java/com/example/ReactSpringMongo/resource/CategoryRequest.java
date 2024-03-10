package com.example.ReactSpringMongo.resource;

public class CategoryRequest {

    private String categoryName;

    private String userId;

    public CategoryRequest() {
    }

    public CategoryRequest(String categoryName, String userId) {
        this.categoryName = categoryName;
        this.userId = userId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}

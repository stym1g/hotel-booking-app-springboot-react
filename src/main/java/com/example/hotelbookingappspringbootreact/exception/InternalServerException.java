package com.example.hotelbookingappspringbootreact.exception;

public class InternalServerException extends RuntimeException {
    public InternalServerException(String message) {
        super(message);
    }
}

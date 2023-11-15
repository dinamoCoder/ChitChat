package com.chitchat.ViewModels;

public record RegisterResponseModel<T>(
    boolean Status,
    T Data
){
}

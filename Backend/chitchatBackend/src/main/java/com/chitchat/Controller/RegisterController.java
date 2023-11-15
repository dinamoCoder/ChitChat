package com.chitchat.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chitchat.ViewModels.Register;
import com.chitchat.ViewModels.RegisterResponseModel;


@RestController
public class RegisterController {

    @PostMapping("/register")
    public RegisterResponseModel RegisterUser(@RequestBody Register register){
        var registerResponse = new RegisterResponseModel<Register>(true,register);
        return registerResponse;
    }



}


package com.chitchat.Controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chitchat.Models.User;
import com.chitchat.Services.LoginRegisterService;
import com.chitchat.ViewModels.RegisterRequest;
import com.chitchat.ViewModels.RegisterResponse;

@RestController
public class RegisterController {

    @Autowired
    private LoginRegisterService _loginRegisterService;
    private final ModelMapper _modelMapper;

    public RegisterController(ModelMapper modelMapper) {
        this._modelMapper = modelMapper;
    }
    @PostMapping("/register")

    public ResponseEntity<RegisterResponse> RegisterUser(@RequestBody RegisterRequest register) {
         var registerUser = this._modelMapper.map(register, User.class);
         System.out.println(registerUser.UserName);
        if (registerUser != null) {
           RegisterResponse createUser = _loginRegisterService.RegisterUser(registerUser);
           if(createUser.Success){
               return new ResponseEntity<RegisterResponse>(createUser, HttpStatus.OK);
           }
           else{
            return new ResponseEntity<RegisterResponse>(createUser, HttpStatus.BAD_REQUEST);
           }
        }
        return new ResponseEntity<RegisterResponse>(new RegisterResponse() , HttpStatus.BAD_REQUEST);
    }

}

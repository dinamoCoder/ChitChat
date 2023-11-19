package com.chitchat.Services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chitchat.Models.User;
import com.chitchat.Services.IRepository.ILoginRegisterRepository;
import com.chitchat.ViewModels.RegisterResponse;

@Service
public class LoginRegisterService {

    @Autowired
    private ILoginRegisterRepository<User> LoginRegisterRepository;
    @Autowired
    private ModelMapper _modelMapperDto;
    @Autowired
    private PasswordEncoder _passwordEncoder;
    

    public RegisterResponse RegisterUser(User user) {
        RegisterResponse registerResponse = new RegisterResponse();
        user.Password = _passwordEncoder.encode(user.Password);
        var createUser = LoginRegisterRepository.save(user);
        if (createUser != null) {
            // then we will return the RegisterResponse
            createUser.setSuccess(true);
            registerResponse = _modelMapperDto.map(user, RegisterResponse.class);
            registerResponse.setMessage("Registered Successfully!!!!!");
            return registerResponse;
        }
        return registerResponse;
    }

}

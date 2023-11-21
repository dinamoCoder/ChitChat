package com.chitchat.Services;

import java.util.HashMap;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chitchat.Models.User;
import com.chitchat.Services.IRepository.ILoginRegisterRepository;
import com.chitchat.ViewModels.LoginRequest;
import com.chitchat.ViewModels.LoginResponse;
import com.chitchat.ViewModels.RegisterResponse;

@Service
public class LoginRegisterService {

    @Autowired
    private ILoginRegisterRepository<User> _loginRegisterRepository;
    @Autowired
    private ModelMapper _modelMapperDto;
    @Autowired
    private PasswordEncoder _passwordEncoder;
    @Autowired
    private JwtService _jwtService;
    

    public RegisterResponse RegisterUser(User user) {
        RegisterResponse registerResponse = new RegisterResponse();
        user.Password = _passwordEncoder.encode(user.Password);
        var createUser = _loginRegisterRepository.save(user);
        if (createUser != null) {
            // then we will return the RegisterResponse
            createUser.setSuccess(true);
            registerResponse = _modelMapperDto.map(user, RegisterResponse.class);
            registerResponse.setMessage("Registered Successfully!!!!!");
            return registerResponse;
        }
        return registerResponse;
    }
   

    public User CheckUser(String userName){
       List<User> getUserData =  _loginRegisterRepository.findByUserName(userName);
       if(getUserData!=null)
           return getUserData.get(0);
        else
            return null;
    }

    public LoginResponse LoginUser(LoginRequest login){
        LoginResponse loginResponse = new LoginResponse();
        var checkUser = CheckUser(login.UserName);
        if(checkUser!=null){
            // then we will check its password and other work so on
            var encodedPassword = _passwordEncoder.encode(login.Password); 
            var checkPassword = _passwordEncoder.matches(login.Password,encodedPassword);
            if(checkPassword){
                HashMap<String,Object> mapExtraClaims = new HashMap<String,Object>();
                mapExtraClaims.put("UserName", checkUser.UserName);
                // TODO:  this role will be changed later on just use static
                mapExtraClaims.put("Role", checkUser.Role.Admin);
                // then we will genereate the token and send it to the client.
                loginResponse.Token = _jwtService.generateToken(null, checkUser);
                return loginResponse;
            }
            loginResponse.ErrorMessage = "Please enter a correct password";
            return loginResponse;
        }
        loginResponse.ErrorMessage="You enter a wrong ceredentials";
        return loginResponse;
    }
}

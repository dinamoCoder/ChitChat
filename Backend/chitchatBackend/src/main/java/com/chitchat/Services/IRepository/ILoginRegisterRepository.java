package com.chitchat.Services.IRepository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.chitchat.Models.User;
public interface ILoginRegisterRepository<T> extends MongoRepository<User,String>  {  
     @Query("{ 'userName' : ?0 }")
    User findByUsernameCustomQuery(String username);
    @Query("{'User'}")
    User saveUser(User user);
    // public User  Create(User register);
    // public User  Get(int id);
    // public User  Delete(int id);
    // public User  Update(User register);
    // public User findByUserName(User user);
}

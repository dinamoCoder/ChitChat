package com.chitchat.Models;

import org.bson.codecs.pojo.annotations.BsonIgnore;
import org.modelmapper.internal.bytebuddy.implementation.bind.annotation.IgnoreForBinding;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("Users")
public class User {
    @Id
    public String UserId; // this is a primary key........................
    public String Logo;
    public String Email;
    public String UserName;
    public String Password;
    public String Number;
    @Transient // this will ignore this property and not stored it in database...........
    public boolean Success;

    public void setLogo(String logo) {
        this.Logo = logo;
    }

    public void setEmail(String email) {
        this.Email = email;
    }

    public void setUserName(String userName) {
        this.UserName = userName;
    }

    public void setPassword(String password) {
        this.Password = password;
    }

    public void setNumber(String number) {
        this.Number = number;
    }
        public void setSuccess(boolean success){
        this.Success = success;
    }

       public String getLogo() {
        return this.Logo;
    }

    public String getEmail() {
        return this.Email;
    }

    public String getUserName() {
        return this.UserName;
    }

    public String getPassword() {
        return this.Password;
    }

    public String getNumber() {
        return this.Number;
    }
    public boolean getSuccess(){
        return this.Success;
    }
}

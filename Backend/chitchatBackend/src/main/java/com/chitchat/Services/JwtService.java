package com.chitchat.Services;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.Map;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
     @Autowired
     private Environment environment;
     
//    public String extractUsername(String token){
//      return extractClaims(token,Claims::getSubject);
//    }

//     //In this method we will extract all the cloims from the token.................
//     private Claims extractAllClaims(string token ){
//       return Jwts.parser().setSigningKey().build().parseClaimsJws().getBody();
//     }

    // this will generate the token
    public String generateToken(Map<String,Object> extraClaims,UserDetails userDetails){
      try{
          byte[] keyBytes = Decoders.BASE64.decode(environment.getProperty("jwt.secret-key"));
          Key key = Keys.hmacShaKeyFor(keyBytes);
          return Jwts.builder().addClaims(extraClaims).setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis())).setExpiration(new Date(System.currentTimeMillis()*1000*1))
        .signWith(key,SignatureAlgorithm.HS512).compact();
      }
      catch(Exception ex){
        System.out.println(ex);
        return "";
      }
      }
      
      //  public <T> T  extractClaims(String token,Function<Claims,T> claimsResolver){
          //      final Claims claims = extractAllClaims(token);
          //      return claimsResolver.apply(claims);
          //  }
          
}





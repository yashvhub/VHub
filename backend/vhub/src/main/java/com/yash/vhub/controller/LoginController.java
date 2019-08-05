package com.yash.vhub.controller;

import java.util.Base64;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yash.vhub.domain.User;
import com.yash.vhub.repository.UserRepository;

@RestController
@RequestMapping("/api")
public class LoginController {

	@Autowired
	UserRepository userRepository;
	
	@GetMapping("/login")
	Object login(HttpServletRequest req) {
		try {
			// When Spring Security is implemented this will be replaced
			// with Authentication parameter
			String authHeader = req.getHeader("Authorization");
			String authString = new String(Base64.getDecoder().decode(authHeader.split("Basic ")[1]));
			String[] auth = authString.split(":");
			String email = auth[0];
			String password = auth[1];
			User user = userRepository.findOneByEmail(email);
			if (user.comparePassword(password)) {
				return user;
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login or password.");
			}
			//
		} catch (NullPointerException ex) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid login or password.");
		}
	}
	
	@GetMapping("/logout")
	Object logout() {
		return ResponseEntity.status(200).body("Successfully Logged Out.");
	}
	
}

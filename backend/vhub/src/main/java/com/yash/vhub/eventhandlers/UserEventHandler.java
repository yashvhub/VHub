package com.yash.vhub.eventhandlers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;

import com.yash.vhub.domain.User;
import com.yash.vhub.repository.UserRepository;

@RepositoryEventHandler(User.class)
public class UserEventHandler {
	
	@Autowired
	UserRepository userRepository;

	@HandleBeforeCreate
	public void handleBeforeUserCreate(User user) {
		// TODO hash and salt password
		user.setPassword("*");
	}
	
	@HandleBeforeSave
	public void handleBeforeUserSave(User user) {
		if (user.getPassword() == null || user.getPassword() == "") {
			User storedUser = userRepository.getOne(user.getId());
			user.setPassword(storedUser.getPassword());
		} else {
			// TODO hash and salt password
			user.setPassword("*");
		}
	}
}

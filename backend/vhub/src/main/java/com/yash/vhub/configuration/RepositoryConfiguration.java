package com.yash.vhub.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.yash.vhub.eventhandlers.UserEventHandler;

@Configuration
public class RepositoryConfiguration {

	public RepositoryConfiguration() {
		super();
	}
	
	@Bean
	UserEventHandler userEventHandler() {
		return new UserEventHandler();
	}
}

package com.yash.vhub.domain;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="UserSummary",
		types= {
				User.class
		})
public interface UserSummary {
	String getEmail();
	String getFirstName();
	String getLastName();
	String getTitle();
	String getCompany();
	String getPhoneNumber();
	Location getLocation();
	Set<Role> getRoles();
}

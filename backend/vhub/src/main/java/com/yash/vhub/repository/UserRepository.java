package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.User;
import com.yash.vhub.domain.UserSummary;

@RepositoryRestResource(excerptProjection=UserSummary.class)
public interface UserRepository extends JpaRepository<User, Long> {

	User findOneByEmail(String email);
	
}

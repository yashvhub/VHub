package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yash.vhub.domain.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

}

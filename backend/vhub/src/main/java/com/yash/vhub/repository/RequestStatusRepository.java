package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.RequestStatus;

@RepositoryRestResource(path="request-statuses")
public interface RequestStatusRepository extends JpaRepository<RequestStatus, Long> {

}

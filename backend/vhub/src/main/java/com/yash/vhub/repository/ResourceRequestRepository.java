package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.ResourceRequest;

@RepositoryRestResource(path="resource-requests")
public interface ResourceRequestRepository extends JpaRepository<ResourceRequest, Long> {

}

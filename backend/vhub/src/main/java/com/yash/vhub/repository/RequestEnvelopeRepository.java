package com.yash.vhub.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.RequestEnvelope;

@RepositoryRestResource(path="request-envelopes")
public interface RequestEnvelopeRepository extends JpaRepository<RequestEnvelope, Long> {
	
	@Query("SELECT e FROM RequestEnvelope e INNER JOIN e.requester r WHERE CONCAT(r.firstName, ' ', r.lastName) LIKE %:name%")
	Set<RequestEnvelope> findByRequesterName(@Param("name") String name);
}

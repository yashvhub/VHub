package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.RequestEnvelope;

@RepositoryRestResource(path="request-envelopes")
public interface RequestEnvelopeRepository extends JpaRepository<RequestEnvelope, Long> {

}

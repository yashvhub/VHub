package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.ProposalType;

@RepositoryRestResource(path="proposal-type")
public interface ProposalTypeRepository extends JpaRepository<ProposalType, Long>{

}

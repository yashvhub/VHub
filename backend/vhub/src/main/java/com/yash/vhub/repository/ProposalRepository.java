package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yash.vhub.domain.Proposal;

@Repository
public interface ProposalRepository extends JpaRepository<Proposal, Long> {

}

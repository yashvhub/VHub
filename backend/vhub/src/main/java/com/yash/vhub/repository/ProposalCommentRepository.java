package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.ProposalComment;

@RepositoryRestResource(path="proposal-comments")
public interface ProposalCommentRepository extends JpaRepository<ProposalComment, Long> {

}

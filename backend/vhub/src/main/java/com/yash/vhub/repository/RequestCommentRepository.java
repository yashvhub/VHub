package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.RequestComment;

@RepositoryRestResource(path="request-comments")
public interface RequestCommentRepository extends JpaRepository<RequestComment, Long> {

}

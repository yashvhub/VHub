package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.JobPosting;

@RepositoryRestResource(path="job-postings")
public interface JobPostingRepository extends JpaRepository<JobPosting, Long> {

}

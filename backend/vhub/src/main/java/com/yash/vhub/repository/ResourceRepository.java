package com.yash.vhub.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.Resource;
import com.yash.vhub.domain.ResourceSummary;

@RepositoryRestResource(excerptProjection=ResourceSummary.class)
public interface ResourceRepository extends JpaRepository<Resource, Long> {

	@Query("SELECT r FROM Resource r INNER JOIN r.skills s WHERE s.skill = :skill AND r.name LIKE %:name%")
	Set<Resource> findBySkillAndName(@Param("skill") String skill, @Param("name") String name);
	
	@Query("SELECT r FROM Resource r INNER JOIN r.skills s WHERE s.skill = :skill")
	Set<Resource> findBySkill(@Param(value = "skill") String skill);
	
	Set<Resource> findByNameContaining(String name);
}

package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yash.vhub.domain.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

}

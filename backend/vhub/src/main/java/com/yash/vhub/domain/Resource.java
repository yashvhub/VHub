package com.yash.vhub.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="resources")
@Data @NoArgsConstructor
public class Resource {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String name;
	
	private String email;
	
	private String vendor;
	
	@Column(name="resume_link")
	private String resumeLink;
	
	@Column(name="hourly_rate")
	private double hourlyRate;
	
	@Column(name="years_of_experience")
	private int yearsOfExperience;

	@ManyToMany
	@JoinTable(
			name="resource_skills_jt",
			joinColumns = {@JoinColumn(name="resource_id")},
			inverseJoinColumns = {@JoinColumn(name="skill_id")}
			)
	private Set<Skill> skills = new HashSet<>();
	
	
}

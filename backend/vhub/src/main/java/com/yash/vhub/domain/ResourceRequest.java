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
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="resource_requests")
@Data @NoArgsConstructor
public class ResourceRequest {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="request_envelope_id")
	private RequestEnvelope requestEnvelope;
	
	private int count;
	
	@Column(name="hourly_rate")
	private double hourlyRate;
	
	@Column(name="years_of_experience")
	private int yearsOfExperience;

	@ManyToMany
	@JoinTable(
			name="resource_request_skills_jt",
			joinColumns = {@JoinColumn(name="resource_request_id")},
			inverseJoinColumns = {@JoinColumn(name="skill_id")}
			)
	private Set<Skill> skills = new HashSet<>();
}

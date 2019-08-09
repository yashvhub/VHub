package com.yash.vhub.domain;

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
@Table(name="proposals")
@Data @NoArgsConstructor
public class Proposal {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="resource_request_id")
	private long resourceRequestId;
	
	@ManyToMany
	@JoinTable(
			name="proposal_resources_jt",
			joinColumns = {@JoinColumn(name="proposal_id")},
			inverseJoinColumns = {@JoinColumn(name="resource_id")}
			)
	private Set<Resource> resources;

}

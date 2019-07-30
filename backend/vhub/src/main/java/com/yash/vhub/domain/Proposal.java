package com.yash.vhub.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
	
	@ManyToOne
	@JoinColumn(name="resource_request_id")
	private ResourceRequest resourceRequest;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User resource;

}

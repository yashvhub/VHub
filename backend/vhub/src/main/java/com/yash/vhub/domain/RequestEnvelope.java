package com.yash.vhub.domain;

import java.util.Date;
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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.lang.Nullable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="request_envelope")
@Data @NoArgsConstructor
public class RequestEnvelope {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@ManyToOne
	@JoinColumn(name="requester_id")
	private User requester;
	
	@Nullable
	@ManyToOne
	@JoinColumn(name="interviewer_id")
	private User interviewer;
	
	@ManyToOne
	@JoinColumn(name="request_status_id")
	private RequestStatus requestStatus;
	
	@ManyToOne
	@JoinColumn(name="job_posting_id")
	private JobPosting jobPosting;
	
	@ManyToOne
	@JoinColumn(name="location_preference_id")
	private Location locationPreference;
	
	@Temporal(TemporalType.DATE)
	@Column(name="request_date")
	private Date requestDate;
	
	@Column(name="business_case")
	private String businessCase;

	@Column(name="client_name")
	private String clientName;

	private String team;

	private String manager;
	
	@OneToMany
	@JoinColumn(name="request_envelope_id")
	Set<ResourceRequest> resourceRequests = new HashSet<>();

	@ManyToMany
	@JoinTable(
			name="request_envelope_approvers_jt",
			joinColumns = {@JoinColumn(name="request_envelope_id")},
			inverseJoinColumns = {@JoinColumn(name="user_id")}
			)
	private Set<User> approvers = new HashSet<>();
	
}

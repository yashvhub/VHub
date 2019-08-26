package com.yash.vhub.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="request_comments")
@Data @NoArgsConstructor
public class RequestComment {

//	@EmbeddedId
//	private CompositeRequestCommentId id;
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(name="request_id")
	private long requestId;
	
	@ManyToOne
	@JoinColumn(name="author_id")
	private User author;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="created_at")
	private Date createdAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="last_updated")
	private Date lastUpdated;
	
	private String comment;	
	
}

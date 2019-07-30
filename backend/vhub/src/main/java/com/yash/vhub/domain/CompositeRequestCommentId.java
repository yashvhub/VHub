package com.yash.vhub.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@Data @NoArgsConstructor
@EqualsAndHashCode
public class CompositeRequestCommentId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 3343563873190640476L;

	@Column(name="id", insertable=true)
	private long id;
	
	@Column(name="request_id", insertable=true)
	private long requestId;
	
	@Override
	public String toString() {
		return this.requestId+"_"+this.id;
	}

}

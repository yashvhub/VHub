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
public class CompositeProposalCommentId implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -9178511440222223849L;

	@Column(name="id", insertable=true)
	private long id;
	
	@Column(name="proposal_id", insertable=true)
	private long proposalId;
	
	@Override
	public String toString() {
		return this.proposalId+"_"+this.id;
	}

}

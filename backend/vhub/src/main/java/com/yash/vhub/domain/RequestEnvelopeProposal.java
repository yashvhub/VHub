package com.yash.vhub.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="ProposalRequestEnvelope",
		types= {
				RequestEnvelope.class
		})
public interface RequestEnvelopeProposal {
	long getId();
	ProposalType getProposalType();
}

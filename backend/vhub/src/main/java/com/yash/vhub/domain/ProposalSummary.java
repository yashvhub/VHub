package com.yash.vhub.domain;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="ProposalSummary",
		types={Proposal.class}
		)
public interface ProposalSummary {
	long getId();
	long getResourceRequestId();
	Set<ResourceSummary> getResources();
}

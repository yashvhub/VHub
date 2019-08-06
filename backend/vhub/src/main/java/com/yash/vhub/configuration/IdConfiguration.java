package com.yash.vhub.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import com.yash.vhub.domain.JobPosting;
import com.yash.vhub.domain.Location;
import com.yash.vhub.domain.Proposal;
import com.yash.vhub.domain.ProposalComment;
import com.yash.vhub.domain.ProposalType;
import com.yash.vhub.domain.RequestComment;
import com.yash.vhub.domain.RequestEnvelope;
import com.yash.vhub.domain.RequestStatus;
import com.yash.vhub.domain.Resource;
import com.yash.vhub.domain.ResourceRequest;
import com.yash.vhub.domain.Role;
import com.yash.vhub.domain.Skill;
import com.yash.vhub.domain.User;
import com.yash.vhub.domain.Vendor;

@Configuration
public class IdConfiguration implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		config.exposeIdsFor(JobPosting.class);
		config.exposeIdsFor(Location.class);
		config.exposeIdsFor(Proposal.class);
		config.exposeIdsFor(ProposalComment.class);
		config.exposeIdsFor(ProposalType.class);
		config.exposeIdsFor(RequestComment.class);
		config.exposeIdsFor(RequestEnvelope.class);
		config.exposeIdsFor(RequestStatus.class);
		config.exposeIdsFor(Resource.class);
		config.exposeIdsFor(ResourceRequest.class);
		config.exposeIdsFor(Role.class);
		config.exposeIdsFor(Skill.class);
		config.exposeIdsFor(User.class);
		config.exposeIdsFor(Vendor.class);
	}
}

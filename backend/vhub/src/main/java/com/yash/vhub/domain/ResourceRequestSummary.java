package com.yash.vhub.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="ResourceRequestSummary",
		types= {ResourceRequest.class}
		)
public interface ResourceRequestSummary {
	long getId();
	int getCount();
	double getHourlyRate();
	int getYearsOfExperience();
}

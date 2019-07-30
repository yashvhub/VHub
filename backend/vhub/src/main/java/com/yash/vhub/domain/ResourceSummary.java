package com.yash.vhub.domain;

import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="ResourceSummary",
		types= {
				Resource.class
		})
public interface ResourceSummary {
	long getId();
	String getName();
	String getEmail();
	String getVendor();
	String getResumeLink();
	double getHourlyRate();
	int getYearsOfExperience();
	Set<Skill> getSkills();
}

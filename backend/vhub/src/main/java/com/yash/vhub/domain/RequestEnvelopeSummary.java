package com.yash.vhub.domain;

import java.util.Date;
import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="RequestEnvelopeSummary",
		types= {
				RequestEnvelope.class
		})
public interface RequestEnvelopeSummary {
	long getId();
	User getRequester();
	User getInterviewer();
	RequestStatus getRequestStatus();
	JobPosting getJobPosting();
	Location getLocationPreference();
	Date getRequestDate();
	String getBusinessCase();
	String getClientName();
	String getTeam();
	String getManager();
	Set<ResourceRequest> getResourceRequests();
	Set<User> getApprovers();
	
}

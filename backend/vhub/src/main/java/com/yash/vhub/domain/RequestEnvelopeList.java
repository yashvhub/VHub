package com.yash.vhub.domain;

import java.util.Date;
import java.util.Set;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="ListRequestEnvelope",
		types= {
				RequestEnvelope.class
		})
public interface RequestEnvelopeList {
	long getId();
	User getRequester();
	RequestStatus getRequestStatus();
	JobPosting getJobPosting();
	Date getRequestDate();
	String getClientName();
	String getManager();
	Set<ResourceRequest> getResourceRequests();
	@Value("#{target.getNumberOfRequestedResources()}")
	int getNumberOfRequestedResources();
	
}

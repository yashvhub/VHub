package com.yash.vhub.domain;

import java.util.Date;
import java.util.Set;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="FullRequestEnvelope",
		types= {
				RequestEnvelope.class
		})
public interface RequestEnvelopeFull {
	long getId();
	User getRequester();
	RequestStatus getRequestStatus();
	JobPosting getJobPosting();
	Location getLocationPreference();
	Date getRequestDate();
	String getBusinessCase();
	String getClientName();
	String getTeam();
	String getManager();
	ProposalType getProposalType();
	Set<ResourceRequestSummary> getResourceRequests();
	Set<RequestCommentSummary> getRequestComments();
	Set<ResourceSummary> getSelectedResources();
	Set<User> getApprovers();
	Set<User> getInterviewers();
}

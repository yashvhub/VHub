package com.yash.vhub.domain;

import java.util.Date;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="RequestCommentSummary",
		types= {
				RequestComment.class
		})
public interface RequestCommentSummary {
	Long getId();
	User getAuthor();	
	Date getCreatedAt();
	Date getLastUpdated();
	String getComment();

}

package com.yash.vhub.domain;

import org.springframework.data.rest.core.config.Projection;

@Projection(
		name="VendorSummary",
		types= {
				Vendor.class
		})
public interface VendorSummary {
	String getName();
	String getDescription();
	String getEmail();
	String getSkype();
	String getPhoneNumber();
	Location getLocation();
}

package com.yash.vhub.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="locations")
@Data @NoArgsConstructor
public class Location {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String country;
	
	@Column(name="state_or_province")
	private String stateOrProvince;
	
	private String city;
	
	@Column(name="zip_or_postcode")
	private String zipOrPostCode;

	@Column(name="address_line_1")
	private String addressLine1;
	
	@Column(name="address_line_2")
	private String addressLine2;
	
	@Column(name="address_line_3")
	private String addressLine3;
	
	@Column(name="address_line_4")
	private String addressLine4;
	
}

package com.yash.vhub.domain;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.data.rest.core.annotation.RestResource;
import org.springframework.lang.Nullable;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="vendors")
@Data @NoArgsConstructor
public class Vendor {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private String name;
	
	private String description;
	
	private String email;
	
	private String skype;
	
	@Column(name="phone_number")
	private String phoneNumber;
	
	@RestResource(exported=false)
	@OneToOne(cascade=CascadeType.ALL)
	@JoinColumn(name="location_id")
	@Nullable
	private Location location;
	
	@ManyToMany
	@JoinTable(
			name="vendor_users_jt",
			joinColumns = {@JoinColumn(name="vendor_id")},
			inverseJoinColumns = {@JoinColumn(name="user_id")}
			)
	private Set<User> vendorUsers = new HashSet<>();
	
	
}

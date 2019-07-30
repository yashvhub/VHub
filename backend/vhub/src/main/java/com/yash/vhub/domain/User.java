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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name="users")
@Data @NoArgsConstructor
@ToString(exclude="password")
public class User {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String email;
	
	@Column(name="hash")
	@JsonIgnore
	private String password;

	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	private String title;
	
	private String company;
	
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
			joinColumns = {@JoinColumn(name="user_id")},
			inverseJoinColumns = {@JoinColumn(name="vendor_id")}
			)
	private Set<Vendor> vendorUsers = new HashSet<>();
	
	@ManyToMany
	@JoinTable(
			name="user_roles",
			joinColumns = {@JoinColumn(name="user_id")},
			inverseJoinColumns = {@JoinColumn(name="role_id")}
			)
	private Set<Role> roles = new HashSet<>();
	
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public boolean comparePassword(String password) {
		// TODO implement Spring Security and Compare Hashes
		return this.password.equals(password);
	}
	
}

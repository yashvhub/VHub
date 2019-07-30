package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.yash.vhub.domain.Vendor;
import com.yash.vhub.domain.VendorSummary;

@RepositoryRestResource(excerptProjection=VendorSummary.class)
public interface VendorRepository extends JpaRepository<Vendor, Long> {

}

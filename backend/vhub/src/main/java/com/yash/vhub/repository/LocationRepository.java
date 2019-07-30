package com.yash.vhub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.yash.vhub.domain.Location;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

}

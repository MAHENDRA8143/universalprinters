package com.universalprinters.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.universalprinters.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findTop10ByUserEmailIgnoreCaseOrderByCreatedAtDesc(String email);
}

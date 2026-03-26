package com.universalprinters.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.universalprinters.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

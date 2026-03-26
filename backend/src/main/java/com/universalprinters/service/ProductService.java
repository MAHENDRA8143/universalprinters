package com.universalprinters.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.universalprinters.model.Product;
import com.universalprinters.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

package com.universalprinters.controller;

import com.universalprinters.model.Order;
import com.universalprinters.service.OrderService;
import com.universalprinters.service.PricingService;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final PricingService pricingService;

    public OrderController(OrderService orderService, PricingService pricingService) {
        this.orderService = orderService;
        this.pricingService = pricingService;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.createOrder(order));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        return orderService.findById(id)
                .<ResponseEntity<?>>map(order -> ResponseEntity.ok(toResponse(order)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", "Order not found")));
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentOrders(@RequestParam String email) {
        if (email == null || email.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required"));
        }

        List<Order> orders = orderService.findRecentByEmail(email.trim());
        return ResponseEntity.ok(orders.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PostMapping("/price")
    public Map<String, Object> calculatePrice(@RequestBody Map<String, Object> payload) {
        double total = pricingService.calculatePrice(payload);
        Map<String, Object> response = new HashMap<>();
        response.put("price", total);
        return response;
    }

    private Map<String, Object> toResponse(Order order) {
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.getId());
        response.put("productName", order.getProductName());
        response.put("quantity", order.getQuantity());
        response.put("price", order.getPrice());
        response.put("status", order.getStatus());
        response.put("filePath", order.getFilePath());
        response.put("createdAt", order.getCreatedAt());

        if (order.getUser() != null) {
            response.put("customerName", order.getUser().getName());
            response.put("customerEmail", order.getUser().getEmail());
            response.put("customerPhone", order.getUser().getPhone());
        }

        return response;
    }
}

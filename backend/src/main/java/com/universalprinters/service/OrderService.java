package com.universalprinters.service;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.universalprinters.model.Order;
import com.universalprinters.model.User;
import com.universalprinters.repository.OrderRepository;
import com.universalprinters.repository.UserRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ExcelLogService excelLogService;
    private final NotificationService notificationService;

    public OrderService(
            OrderRepository orderRepository,
            UserRepository userRepository,
            ExcelLogService excelLogService,
            NotificationService notificationService
    ) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.excelLogService = excelLogService;
        this.notificationService = notificationService;
    }

    public Order createOrder(Order order) {
        if (order.getStatus() == null || order.getStatus().isBlank()) {
            order.setStatus("Printing");
        }

        if (order.getUser() != null && order.getUser().getEmail() != null && !order.getUser().getEmail().isBlank()) {
            String email = order.getUser().getEmail().trim();
            User user = userRepository.findByEmailIgnoreCase(email)
                    .map(existing -> {
                        if (order.getUser().getPhone() != null && !order.getUser().getPhone().isBlank()) {
                            existing.setPhone(order.getUser().getPhone().trim());
                        }
                        if (order.getUser().getName() != null && !order.getUser().getName().isBlank()) {
                            existing.setName(order.getUser().getName().trim());
                        }
                        return existing;
                    })
                    .orElseGet(() -> {
                        User created = new User();
                        created.setEmail(email);
                        created.setPhone(order.getUser().getPhone());
                        created.setName(order.getUser().getName() == null || order.getUser().getName().isBlank()
                                ? "Customer"
                                : order.getUser().getName());
                        return created;
                    });
            order.setUser(userRepository.save(user));
        }

        Order savedOrder = orderRepository.save(order);
        Path ordersSheet = excelLogService.appendOrder(savedOrder);
        notificationService.sendOwnerOrderNotice(savedOrder, ordersSheet);

        try {
            String customerEmail = savedOrder.getUser() != null ? savedOrder.getUser().getEmail() : "";
            notificationService.sendCustomerOrderCopy(customerEmail, savedOrder, excelLogService.buildSingleOrderSheet(savedOrder));
        } catch (IOException ignored) {
            // Non-blocking email path.
        }

        return savedOrder;
    }

    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> findRecentByEmail(String email) {
        return orderRepository.findTop10ByUserEmailIgnoreCaseOrderByCreatedAtDesc(email);
    }
}

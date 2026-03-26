package com.universalprinters.controller;

import com.universalprinters.model.User;
import com.universalprinters.repository.UserRepository;
import com.universalprinters.service.ExcelLogService;
import com.universalprinters.service.NotificationService;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final ExcelLogService excelLogService;
    private final NotificationService notificationService;

    public AuthController(
            UserRepository userRepository,
            ExcelLogService excelLogService,
            NotificationService notificationService
    ) {
        this.userRepository = userRepository;
        this.excelLogService = excelLogService;
        this.notificationService = notificationService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.getOrDefault("email", "").trim().toLowerCase();
        String mobile = request.getOrDefault("mobile", "").trim();
        String phone = mobile.isBlank() ? request.getOrDefault("phone", "").trim() : mobile;
        String name = request.getOrDefault("name", "Customer").trim();

        if (email.isBlank() || phone.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and phone are required"));
        }

        Optional<User> byEmail = userRepository.findByEmailIgnoreCase(email);
        Optional<User> byPhone = userRepository.findByPhone(phone);

        if (byEmail.isPresent()) {
            User existing = byEmail.get();
            String existingPhone = existing.getPhone() == null ? "" : existing.getPhone().trim();
            if (!existingPhone.isBlank() && !existingPhone.equals(phone)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid credentials. Email and phone do not match."));
            }

            if (existingPhone.isBlank()) {
                existing.setPhone(phone);
            }
            if (!name.isBlank()) {
                existing.setName(name);
            }

            User savedUser = userRepository.save(existing);
            return successResponse(savedUser);
        }

        if (byPhone.isPresent()) {
            User existing = byPhone.get();
            String existingEmail = existing.getEmail() == null ? "" : existing.getEmail().trim().toLowerCase();
            if (!existingEmail.equals(email)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid credentials. Email and phone do not match."));
            }

            if (!name.isBlank()) {
                existing.setName(name);
            }

            User savedUser = userRepository.save(existing);
            return successResponse(savedUser);
        }

        User created = new User();
        created.setEmail(email);
        created.setPhone(phone);
        created.setName(name.isBlank() ? "Customer" : name);

        User savedUser = userRepository.save(created);
        return successResponse(savedUser);
    }

    private ResponseEntity<Map<String, Object>> successResponse(User savedUser) {

        notificationService.sendOwnerLoginNotice(
                savedUser.getName(),
                savedUser.getEmail(),
                savedUser.getPhone(),
                excelLogService.appendLogin(savedUser)
        );

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("message", "Login successful");
        response.put("user", Map.of(
                "id", savedUser.getId(),
                "name", savedUser.getName(),
                "email", savedUser.getEmail(),
                "phone", savedUser.getPhone()
        ));

        return ResponseEntity.ok(response);
    }
}

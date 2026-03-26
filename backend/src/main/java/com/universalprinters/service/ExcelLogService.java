package com.universalprinters.service;

import com.universalprinters.model.Order;
import com.universalprinters.model.User;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class ExcelLogService {

    private final Path logsDir;

    public ExcelLogService(@Value("${app.logs-dir:logs}") String logsDirPath) {
        this.logsDir = Paths.get(logsDirPath);
    }

    public Path appendLogin(User user) {
        return appendRow(
                "user-logins.csv",
                "timestamp,name,email,phone",
                csv(LocalDateTime.now().toString()) + ","
                        + csv(user.getName()) + ","
                        + csv(user.getEmail()) + ","
                        + csv(user.getPhone())
        );
    }

    public Path appendOrder(Order order) {
        String email = order.getUser() != null ? order.getUser().getEmail() : "";
        String phone = order.getUser() != null ? order.getUser().getPhone() : "";

        return appendRow(
                "orders.csv",
                "timestamp,orderId,customerEmail,customerPhone,productName,quantity,price,status,filePath",
                csv(LocalDateTime.now().toString()) + ","
                        + csv(String.valueOf(order.getId())) + ","
                        + csv(email) + ","
                        + csv(phone) + ","
                        + csv(order.getProductName()) + ","
                        + csv(String.valueOf(order.getQuantity())) + ","
                        + csv(String.valueOf(order.getPrice())) + ","
                        + csv(order.getStatus()) + ","
                        + csv(order.getFilePath())
        );
    }

    public Path buildSingleOrderSheet(Order order) throws IOException {
        Files.createDirectories(logsDir);
        Path orderSheet = logsDir.resolve("order-" + order.getId() + ".csv");

        StringBuilder builder = new StringBuilder();
        builder.append("orderId,productName,quantity,price,status,createdAt,customerEmail,customerPhone,filePath")
                .append(System.lineSeparator());
        builder.append(csv(String.valueOf(order.getId()))).append(",")
                .append(csv(order.getProductName())).append(",")
                .append(csv(String.valueOf(order.getQuantity()))).append(",")
                .append(csv(String.valueOf(order.getPrice()))).append(",")
                .append(csv(order.getStatus())).append(",")
                .append(csv(order.getCreatedAt() != null ? order.getCreatedAt().toString() : "")).append(",")
                .append(csv(order.getUser() != null ? order.getUser().getEmail() : "")).append(",")
                .append(csv(order.getUser() != null ? order.getUser().getPhone() : "")).append(",")
                .append(csv(order.getFilePath()));

        Files.writeString(orderSheet, builder.toString(), StandardCharsets.UTF_8, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        return orderSheet;
    }

    private Path appendRow(String fileName, String header, String row) {
        try {
            Files.createDirectories(logsDir);
            Path path = logsDir.resolve(fileName);

            if (!Files.exists(path)) {
                Files.writeString(path, header + System.lineSeparator(), StandardCharsets.UTF_8, StandardOpenOption.CREATE);
            }

            Files.writeString(path, row + System.lineSeparator(), StandardCharsets.UTF_8, StandardOpenOption.APPEND);
            return path;
        } catch (IOException ex) {
            throw new IllegalStateException("Unable to write CSV log", ex);
        }
    }

    private String csv(String value) {
        if (value == null) {
            return "\"\"";
        }
        return "\"" + value.replace("\"", "\"\"") + "\"";
    }
}

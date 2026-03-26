package com.universalprinters.service;

import com.universalprinters.model.Order;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.file.Path;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class NotificationService {

    private static final Logger logger = LoggerFactory.getLogger(NotificationService.class);

    private final JavaMailSender mailSender;
    private final String ownerEmail;
    private final String mailHost;
    private final String mailPort;
    private final String mailUsername;
    private final String mailPassword;
    private final String mailFrom;

    public NotificationService(
            ObjectProvider<JavaMailSender> mailSenderProvider,
            @Value("${app.owner-email:mahendra8143411340@gmail.com}") String ownerEmail,
            @Value("${spring.mail.host:}") String mailHost,
            @Value("${spring.mail.port:}") String mailPort,
            @Value("${spring.mail.username:}") String mailUsername,
            @Value("${spring.mail.password:}") String mailPassword,
            @Value("${app.mail.from:}") String mailFrom
    ) {
        this.mailSender = mailSenderProvider.getIfAvailable();
        this.ownerEmail = ownerEmail;
        this.mailHost = mailHost;
        this.mailPort = mailPort;
        this.mailUsername = mailUsername;
        this.mailPassword = mailPassword;
        this.mailFrom = mailFrom;
    }

    @PostConstruct
    public void logMailConfiguration() {
        logger.info(
            "Mail config status: senderBeanPresent={}, host='{}', port='{}', username='{}', passwordPresent={}, from='{}', owner='{}'.",
            mailSender != null,
            nullable(mailHost),
            nullable(mailPort),
            maskSensitive(mailUsername),
            !blank(mailPassword),
            maskSensitive(resolveFrom()),
            maskSensitive(ownerEmail)
        );
    }

    public void sendOwnerLoginNotice(String name, String email, String phone, Path loginSheetPath) {
        if (!mailEnabled() || blank(ownerEmail)) {
            return;
        }

        String subject = "New customer login - Universal Printers";
        String body = String.format("""
            A customer logged in.

            Name: %s
            Email: %s
            Phone: %s
            Login sheet: %s
            """, nullable(name), nullable(email), nullable(phone), loginSheetPath.toAbsolutePath());

        sendSimple(ownerEmail, subject, body);
    }

    public void sendOwnerOrderNotice(Order order, Path ordersSheetPath) {
        if (!mailEnabled() || blank(ownerEmail)) {
            return;
        }

        String customerEmail = order.getUser() != null ? order.getUser().getEmail() : "";
        String customerPhone = order.getUser() != null ? order.getUser().getPhone() : "";

        String subject = "New order #" + order.getId() + " - Universal Printers";
        String body = String.format("""
            A new order was placed.

            Order ID: %s
            Product: %s
            Quantity: %s
            Price: %s
            Status: %s
            Customer Email: %s
            Customer Phone: %s
            Order sheet: %s
            """,
            order.getId(),
            nullable(order.getProductName()),
            nullable(String.valueOf(order.getQuantity())),
            nullable(String.valueOf(order.getPrice())),
            nullable(order.getStatus()),
            nullable(customerEmail),
            nullable(customerPhone),
            ordersSheetPath.toAbsolutePath());

        sendSimple(ownerEmail, subject, body);
    }

    public void sendCustomerOrderCopy(String customerEmail, Order order, Path singleOrderSheet) {
        if (!mailEnabled() || blank(customerEmail)) {
            return;
        }

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);
            helper.setTo(customerEmail);
            if (!blank(resolveFrom())) {
                helper.setFrom(resolveFrom());
            }
            helper.setSubject("Your order copy #" + order.getId() + " - Universal Printers");
            helper.setText("Your order has been received. Attached is your order copy in Excel format.");
            helper.addAttachment(singleOrderSheet.getFileName().toString(), singleOrderSheet.toFile());
            mailSender.send(mimeMessage);
            logger.info("Customer order copy mail sent to {} for order {}", customerEmail, order.getId());
        } catch (MessagingException | MailException ex) {
            logger.warn("Unable to send customer order copy mail for order {}: {}", order.getId(), ex.getMessage());
        }
    }

    private void sendSimple(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            if (!blank(resolveFrom())) {
                message.setFrom(resolveFrom());
            }
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);
            mailSender.send(message);
            logger.info("Mail sent to {} with subject '{}'.", to, subject);
        } catch (MailException ex) {
            Throwable root = rootCause(ex);
            logger.warn(
                "Unable to send mail to {} with subject '{}': {} | rootCause={} ({})",
                to,
                subject,
                ex.getMessage(),
                root.getMessage(),
                root.getClass().getSimpleName()
            );
        }
    }

    private boolean mailEnabled() {
        boolean configured = mailSender != null && !blank(mailHost) && !blank(mailUsername) && !blank(mailPassword);
        if (!configured) {
            logger.warn("Mail delivery is disabled. Configure spring.mail.host, spring.mail.username, and spring.mail.password.");
        }
        return configured;
    }

    private boolean blank(String value) {
        return value == null || value.isBlank();
    }

    private String nullable(String value) {
        return value == null ? "" : value;
    }

    private String resolveFrom() {
        if (!blank(mailFrom)) {
            return mailFrom;
        }
        return mailUsername;
    }

    private Throwable rootCause(Throwable ex) {
        Throwable current = ex;
        while (current.getCause() != null && current.getCause() != current) {
            current = current.getCause();
        }
        return current;
    }

    private String maskSensitive(String value) {
        if (blank(value)) {
            return "";
        }
        int atIndex = value.indexOf('@');
        if (atIndex > 1) {
            return value.charAt(0) + "***" + value.substring(atIndex);
        }
        if (value.length() <= 3) {
            return "***";
        }
        return value.substring(0, 2) + "***";
    }
}

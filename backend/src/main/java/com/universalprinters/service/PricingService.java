package com.universalprinters.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class PricingService {

    public double calculatePrice(Map<String, Object> payload) {
        String size = String.valueOf(payload.getOrDefault("size", "A4"));
        String color = String.valueOf(payload.getOrDefault("colorMode", "bw"));
        String paper = String.valueOf(payload.getOrDefault("paperType", "matte"));
        int quantity = Integer.parseInt(String.valueOf(payload.getOrDefault("quantity", 1)));

        double sizeFactor = "A5".equalsIgnoreCase(size) ? 0.7 : ("custom".equalsIgnoreCase(size) ? 1.35 : 1.0);
        double colorFactor = "color".equalsIgnoreCase(color) ? 1.45 : 1.0;
        double paperFactor = "glossy".equalsIgnoreCase(paper) ? 1.3 : 1.0;

        double total = 2.5 * sizeFactor * colorFactor * paperFactor * Math.max(1, quantity);
        return Math.max(40, Math.round(total));
    }
}

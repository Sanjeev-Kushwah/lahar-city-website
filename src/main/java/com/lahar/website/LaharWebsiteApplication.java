package com.lahar.website;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Lahar City Website – Spring Boot Application
 *
 * Run this class to start the embedded Tomcat server.
 * Then open your browser at: http://localhost:8080
 *
 * City: Lahar, Bhind District, Madhya Pradesh, India
 */
@SpringBootApplication
public class LaharWebsiteApplication {

    public static void main(String[] args) {
        SpringApplication.run(LaharWebsiteApplication.class, args);
        System.out.println("\n");
        System.out.println("╔══════════════════════════════════════════════════════╗");
        System.out.println("║         लहार City Portal — Successfully Started!      ║");
        System.out.println("║                                                      ║");
        System.out.println("║   Open your browser and visit:                       ║");
        System.out.println("║   ➜  http://localhost:8080                           ║");
        System.out.println("║                                                      ║");
        System.out.println("║   Lahar – The City of Culture & Heritage             ║");
        System.out.println("║   Bhind District, Madhya Pradesh, India              ║");
        System.out.println("╚══════════════════════════════════════════════════════╝");
        System.out.println("\n");
    }
}
    
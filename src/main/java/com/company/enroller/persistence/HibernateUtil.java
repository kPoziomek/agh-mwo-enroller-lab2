package com.company.enroller.persistence;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class HibernateUtil {

    private static SessionFactory sessionFactory;

    // Spring will inject values from application-{profile}.properties
    @Value("${spring.datasource.url}")
    private String databaseUrl;
    
    @Value("${spring.datasource.driver-class-name}")
    private String driverClass;
    
    @Value("${spring.jpa.database-platform}")
    private String dialect;
    
    @Value("${spring.jpa.hibernate.ddl-auto}")
    private String hbm2ddlAuto;
    
    @Value("${spring.jpa.show-sql}")
    private String showSql;
    
    @Value("${spring.jpa.properties.hibernate.format_sql}")
    private String formatSql;
    
    @Value("${spring.jpa.properties.hibernate.connection.autocommit}")
    private String autocommit;

    @PostConstruct
    public void init() {
        try {
            Configuration configuration = new Configuration();
            
            // Use properties from Spring profiles
            configuration.setProperty("hibernate.connection.driver_class", driverClass);
            configuration.setProperty("hibernate.connection.url", databaseUrl);
            configuration.setProperty("hibernate.dialect", dialect);
            configuration.setProperty("hibernate.hbm2ddl.auto", hbm2ddlAuto);
            configuration.setProperty("hibernate.connection.autocommit", autocommit);
            configuration.setProperty("hibernate.show_sql", showSql);
            configuration.setProperty("hibernate.format_sql", formatSql);
            configuration.setProperty("hibernate.connection.username", "");
            configuration.setProperty("hibernate.connection.password", "");
            
            // Add mappings
            configuration.addAnnotatedClass(com.company.enroller.model.Meeting.class);
            configuration.addAnnotatedClass(com.company.enroller.model.Participant.class);
            
            sessionFactory = configuration.buildSessionFactory();
            
            System.out.println("✅ Hibernate SessionFactory initialized with database: " + databaseUrl);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create SessionFactory", e);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }

    public static void shutdown() {
        if (sessionFactory != null) {
            sessionFactory.close();
        }
    }
}

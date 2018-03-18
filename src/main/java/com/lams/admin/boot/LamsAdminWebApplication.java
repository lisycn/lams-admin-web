package com.lams.admin.boot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import com.fasterxml.jackson.databind.ObjectMapper;

@ComponentScan(basePackages = { "com.lams" })
@SpringBootApplication
public class LamsAdminWebApplication {

	@Autowired
	ApplicationContext applicationContext;

	public static void main(String[] args) {
		SpringApplication.run(LamsAdminWebApplication.class, args);
	}

	@Bean
	public ObjectMapper createObjectMapper() {
		ObjectMapper objectMapper = new ObjectMapper();
		applicationContext.getAutowireCapableBeanFactory().autowireBean(objectMapper);
		return objectMapper;
	}
}

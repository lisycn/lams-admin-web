package com.lams.admin.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

@RestController
@RequestMapping("/web")
public class AppStartupController {

	@Autowired
	private ObjectMapper objectMapper;

	@Value("${com.lams.user.url}")
	private String userUrl;

	private static final Logger logger = LoggerFactory.getLogger(AppStartupController.class);

	@RequestMapping(value = "/ping", method = RequestMethod.GET)
	public String getPing() {
		logger.info("Ping success");
		return "Ping Succeed";
	}

	@RequestMapping(value = "/get_urls", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public ObjectNode getUrls() {
		ObjectNode reponse = objectMapper.createObjectNode();
		reponse.put("user", userUrl);
		return reponse;
	}

}

package com.nikias.typeahead.typeahead;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TypeaheadApplication {


	@RequestMapping("/hello")
	public String homeRest() {
		return "Hello World!";
	}

	@RequestMapping("/")
	public String home() {
		return "Hello~World!";
	}

	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(TypeaheadApplication.class, args);
	}
}

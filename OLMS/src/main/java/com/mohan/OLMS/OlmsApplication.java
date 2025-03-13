package com.mohan.OLMS;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class OlmsApplication {

	static {
		// Load the .env file
		Dotenv dotenv = Dotenv.load();

		System.setProperty("DB_PASSWORD", dotenv.get("DB_PASSWORD"));
		System.out.println(dotenv.get("DB_PASSWORD"));
	}

	public static void main(String[] args) {
		SpringApplication.run(OlmsApplication.class, args);
	}

}

package kr.co.animalname;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})  // springsecurity 설정을 풀어줘야 한다 => exclude 세팅.
@ComponentScan(basePackages = {"kr.co.animalname", "kr.co.util"})
public class AnimalnameBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnimalnameBackApplication.class, args);
	}

}

package kr.co.animalname;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;



@Configuration
public class WebConfig implements WebMvcConfigurer{

	//Controller마다 CrossOrigin("*")설정을 안해도 됨
	//프로젝트 전체에 한 번에 적용하는 것이다. => rest 서버를 사용하려면 본 작업을 진행해야 한다.
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
	}
    


}

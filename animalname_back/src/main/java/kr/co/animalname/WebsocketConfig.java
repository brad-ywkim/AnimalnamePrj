package kr.co.animalname;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import kr.co.animalname.model.service.RealTimeNameRankHandler;

@Configuration
@EnableWebSocket //websocket 활성화
public class WebsocketConfig implements WebSocketConfigurer {

	@Autowired
	private RealTimeNameRankHandler realTimeNameRankHandler; 
	
	

	
	@Override   //이걸 구현해야 함
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(realTimeNameRankHandler, "/realtime").setAllowedOrigins("*"); //도메인이 다른 서버 접속도 허용
	}

	
	
}

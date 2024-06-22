package kr.co.animalname.model.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class RealTimeNameRankHandler extends TextWebSocketHandler {

	private final List<WebSocketSession> sessions = new ArrayList<>();
	private final ObjectMapper objectMapper = new ObjectMapper();

	// 클라이언트 웹소켓 접속
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		System.out.println("Client 접속");
		System.out.println("접속 소켓 : " + session);
		sessions.add(session);
	}

	// 클라이언트 -> 서버 메시지 전송
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		System.out.println("client message 전송" + message);
	}

	// 클라이언트 웹소켓 종료
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		System.out.println("client 퇴장");
		sessions.remove(session);
	}

	// 실시간 순위 업데이트 메시지 전송
	public void sendRealTimeNameRank(Object rankingData) {
		try {
			String rankingJson = objectMapper.writeValueAsString(rankingData);
			TextMessage message = new TextMessage(rankingJson);
			for (WebSocketSession session : sessions) {
				session.sendMessage(message);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}

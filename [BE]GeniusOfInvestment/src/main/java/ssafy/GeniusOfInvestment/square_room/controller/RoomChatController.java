package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import ssafy.GeniusOfInvestment.square_room.dto.RoomChatMessageDto;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Controller
public class RoomChatController {

    private final SimpMessageSendingOperations messageSendingOperations;
    private Map<String, String> sessions = new HashMap<>();

    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
    @EventListener(SessionConnectEvent.class)
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        log.info("웹소켓 연결시 Event에서 sessionId: " + sessionId);
//        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = headerAccesor.getSessionId();
        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];
        log.info("웹소켓 연결시 Event에서 userId: " + userId);

        sessions.put(sessionId, userId);
        log.info("Received a new web socket connection");
    }
    @EventListener(SessionDisconnectEvent.class)
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccesor.getSessionId();

        log.info("sessionId Disconnected : " + sessionId);
    }
    @MessageMapping("/room/chat/message/")
    public void message(RoomChatMessageDto roomChatMessageDto){
        messageSendingOperations.convertAndSend("/sub/room/chat/" + roomChatMessageDto.getRoomId(),roomChatMessageDto);
    }
}

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
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.dto.UserListRequest;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.square_room.dto.RoomChatMessageDto;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Controller
public class RoomChatController {

    private final SimpMessageSendingOperations messageSendingOperations;
    private final RedisGameRepository redisGameRepository;
    private final UserRepository userRepository;
    private Map<String, String> sessions = new HashMap<>();

    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
    @EventListener(SessionConnectEvent.class)
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        log.info("웹소켓 연결시 Event에서 sessionId: " + sessionId);
//        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = headerAccesor.getSessionId();
        String userId = event.getMessage().getHeaders().get("nativeHeaders").toString();
        //String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];
        log.info("웹소켓 연결시 Event에서 userId: " + userId);

        //sessions.put(sessionId, userId);
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

    @MessageMapping("/room/list")
    public void getUserList(UserListRequest request){
        GameRoom gameRoom = redisGameRepository.getOneGameRoom(request.roomId());
        List<RoomPartInfo> rstList = new ArrayList<>();
        for(GameUser gu : gameRoom.getParticipants()){
            Optional<User> tmp = userRepository.findById(gu.getUserId());
            if(tmp.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
            rstList.add(RoomPartInfo.builder()
                    .userId(gu.getUserId())
                    .userNick(tmp.get().getNickName())
                    .isReady(gu.isReady())
                    .isManager(gu.isManager())
                    .exp(tmp.get().getExp())
                    .imageId(tmp.get().getImageId())
                    .build());
        }

        messageSendingOperations.convertAndSend("/sub/room/chat/" + request.roomId(),
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_ENTER)
                        .data(rstList)
                        .build());
    }
}

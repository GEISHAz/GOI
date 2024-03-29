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
import ssafy.GeniusOfInvestment._common.jwt.JwtUtil;
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
    private final JwtUtil jwtUtil;
    private Map<String, String> sessions = new HashMap<>();

    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
    @EventListener(SessionConnectEvent.class)
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        log.info("웹소켓 연결시 Event에서 sessionId: " + sessionId);
//        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = headerAccesor.getSessionId();
        String str = event.getMessage().getHeaders().get("nativeHeaders").toString();
        log.info("웹소켓 연결시 Event에서 받아온 헤더 정보: " + str);
        int startIndex = str.indexOf("Bearer") + 7;
        int endIdx = str.indexOf(",") - 1;
        if(startIndex == 6 || endIdx == -2) throw new CustomBadRequestException(ErrorType.FAIL_TO_GENERATE_ACCESS_TOKEN);
        String token = str.substring(startIndex, endIdx);
        log.info("웹소켓 연결시 Event에서 문자열에서 추출한 토큰: " + token);
        String userId = jwtUtil.getUserId(token);
        //String userId = event.getMessage().getHeaders().get("nativeHeaders").toString().split("User=\\[")[1].split("]")[0];
        log.info("웹소켓 연결시 Event에서 userId: " + userId);

        sessions.put(sessionId, userId);
        log.info("Received a new web socket connection");
    }
    @EventListener(SessionDisconnectEvent.class)
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccesor.getSessionId();
        log.info("웹소켓 연결 해제(disconnect)시 Event속 map에서 추출한 userId: " + sessions.get(sessionId));
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

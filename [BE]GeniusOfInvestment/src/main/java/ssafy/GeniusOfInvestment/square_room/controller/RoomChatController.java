package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.jwt.JwtUtil;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.dto.ParticipantInfo;
import ssafy.GeniusOfInvestment.game.dto.UserListRequest;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.game.repository.RedisMyTradingInfoRepository;
import ssafy.GeniusOfInvestment.game.service.GameService;
import ssafy.GeniusOfInvestment.square_room.dto.RoomChatMessageDto;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;
import ssafy.GeniusOfInvestment.square_room.repository.RedisUserRepository;
import ssafy.GeniusOfInvestment.square_room.repository.RoomRepository;
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
    private final RedisTemplate<Object, Object> redisTemplate;
    private final RedisUserRepository redisUserRepository;
    private final RedisMyTradingInfoRepository myTradingInfoRepository;
    private final RoomRepository roomRepository;
    private final GameService gameService;
    private final SimpMessageSendingOperations messageTemplate;
    private Map<String, String> sessions = new HashMap<>();

    // 새로운 사용자가 웹 소켓을 연결할 때 실행됨
    // @EventListener은 한개의 매개변수만 가질 수 있다.
    @EventListener(SessionConnectEvent.class)
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        String sessionId = event.getMessage().getHeaders().get("simpSessionId").toString();
        //log.info("웹소켓 연결시 Event에서 sessionId: " + sessionId);
//        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
//        String sessionId = headerAccesor.getSessionId();
        if(event.getMessage().getHeaders().get("nativeHeaders") == null){
            return;
//            throw new CustomBadRequestException(ErrorType.NEED_TOKEN);
        }
        String str = event.getMessage().getHeaders().get("nativeHeaders").toString();
        //log.info("웹소켓 연결시 Event에서 받아온 헤더 정보: " + str);
        int startIndex = str.indexOf("Bearer") + 7;
        int endIdx = str.indexOf(",") - 1;

        //웹소켓 연결시 토큰을 제대로 못 받아왔다.
        if(startIndex == 6 || endIdx == -2) return;

        String token = str.substring(startIndex, endIdx);
        //log.info("웹소켓 연결시 Event에서 문자열에서 추출한 토큰: " + token);
        String userId = jwtUtil.getUserId(token);
        //log.info("웹소켓 연결시 Event에서 userId: " + userId);

        if(Boolean.TRUE.equals(redisTemplate.hasKey(userId))){ //키값이 존재한다.(5초안에 재접속)
            String tmp = (String) redisTemplate.opsForValue().get(userId);
            //log.info("연결 event의 redis에서 얻어온 값: " + tmp);
            //log.info("5초안에 재접속 성공");
            redisTemplate.delete(userId);
        }
        sessions.put(sessionId, userId);
        //log.info("Received a new web socket connection");
    }
    @EventListener(SessionDisconnectEvent.class)
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccesor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccesor.getSessionId();
        //log.info("웹소켓 연결 해제(disconnect)시 Event속 map에서 추출한 userId: " + sessions.get(sessionId));
        String userId = sessions.get(sessionId);

        if(userId != null){
            redisTemplate.opsForValue().set(userId, "COMPLETE_DISCONNECT");

            Timer timer = new Timer();
            TimerTask task = new TimerTask() {
                @Override
                public void run() {
                    if(Boolean.TRUE.equals(redisTemplate.hasKey(userId))){ //5초안에 재접속 실패
                        //log.info("유저 아직 재접속 안했지롱");
                        Long uId = Long.valueOf(userId);

                        Optional<User> user = userRepository.findById(uId);
                        if(user.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
                        user.get().updateChannel(null);

                        delGameRoom(user.get()); //방 탈퇴 처리랑 같은 로직
                        userRepository.save(user.get());
                        redisUserRepository.deleteUser(uId); //유저 동선 저장 삭제(원래 광장으로 나오면 제거될 값)
                        myTradingInfoRepository.deleteMyTradingInfo(uId); //유저의 게임에서의 거래내역 삭제
                        redisTemplate.delete(userId);
                    }
                    cancel();
                }
            };

            // 1초 간격으로 작업 실행
            timer.scheduleAtFixedRate(task, 5000, 1000); //5초뒤에 task 작업 실행
        }else {
            return;
//            throw new CustomBadRequestException(ErrorType.FAIL_TO_GET_USER_DISCONNECT);
        }

        //log.info("sessionId Disconnected : " + sessionId);
    }

    public void delGameRoom(User user){
        Map<Long, GameRoom> tmp = redisGameRepository.getAllGameRooms();
        List<GameRoom> rlist = new ArrayList<>(tmp.values());
        for(GameRoom gr : rlist){
            GameUser gameUser = new GameUser();
            gameUser.setUserId(user.getId());
            int idx = gr.getParticipants().indexOf(gameUser);
            if(idx != -1){
                if(gr.getParticipants().size() > 1){ //삭제하기전 남아있는 인원이 2명 이상
                    //log.info("방 나가기 전 방 안의 유저 수"+gr.getParticipants().size());
                    gr.getParticipants().remove(idx);
                    if(gameUser.isManager()){ //방장 권한을 가장 먼저 들어온 유저에게 위임
                        gr.getParticipants().get(0).setManager(true);
                        gr.getParticipants().get(0).setReady(true);
                    }
                    gameService.rewardByRank(user, 4, 0L);
                    RedisUser ru = redisUserRepository.getOneRedisUser(user.getId());
                    //유저가 나가기전 상태가 게임 중이고, 나간 후에 게임방에 남은 인원이 1명일 경우(게임 종료 로직 수행)
                    if(ru.isStatus() && gr.getParticipants().size() == 1){
                        List<ParticipantInfo> rst = gameService.endGame(gr.getId());
                        messageTemplate.convertAndSend("/sub/room/chat/" + gr.getId(),
                                MessageDto.builder()
                                        .type(MessageDto.MessageType.GAME_RESULT)
                                        .data(rst)
                                        .build());
                        //============================여기까지가 주석
                    }else {
                        redisGameRepository.updateGameRoom(gr);
                    }
                }else { //한명이 남아있었으므로 방 삭제까지 같이 수행
                    redisGameRepository.deleteGameRoom(gr.getId());
                    Optional<Room> rtmp = roomRepository.findById(gr.getId());
                    if(rtmp.isPresent()){
                        rtmp.get().updateStatus(2); //room테이블에 없어진 방 처리
                        roomRepository.save(rtmp.get());
                    }
                }
            }
        }
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

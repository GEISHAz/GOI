package ssafy.GeniusOfInvestment.square_room.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.game.repository.RedisGameUserRepository;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserDisConnectMessageResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserEnterMessageResponse;
import ssafy.GeniusOfInvestment.square_room.repository.RedisUserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    private final SimpMessageSendingOperations messageTemplate;
    private final RedisGameRepository redisGameRepository;
    private final RedisUserRepository redisUserRepository;
    private final RedisGameUserRepository redisGameUserRepository;

    public void enterRoom(User user, Room room) {

        //gameRoom Redis 정보 가져오기
        GameRoom gameRoom;

        try {
             gameRoom = redisGameRepository.getOneGameRoom(room.getId());
        }catch (Exception e){
            throw new CustomBadRequestException(ErrorType.ROOM_NOT_FOUND);
        }

        // redisUser 가  없어야함 있다면 예외
        if(redisUserRepository.getOneRedisUser(user.getId())!=null)
            throw new CustomBadRequestException(ErrorType.IS_NOT_AVAILABLE_REDISUSER);

        // redis user 만들기, 상태추적
        redisUserRepository.saveUserStatusGameing(
                RedisUser
                        .builder()
                        .userId(user.getId())
                        .status(false)
                        .build());


        // gameuser 만들어서 Gameroom 에 넣어주고 저장
        gameRoom.getParticipants().add(
                GameUser
                        .builder()
                        .userId(user.getId())
                        .isReady(false)
                        .isManager(false)
                        .build());

        // gameroom에 저장
        redisGameRepository.saveGameRoom(gameRoom);

        //websocket 들어감 보내주기
        messageTemplate.convertAndSend("/alram/msg-to/" + room.getId(),
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_ENTER)
                        .data(UserEnterMessageResponse
                                .builder()
                                .userId(user.getId())
                                .roomId(gameRoom.getId())
                                .chId(user.getChannel().getId())
                                .isReady(false)
                                .exp(user.getExp())
                                .nickName(user.getNickName())
                                .build())
                        .build());
    }

//    public List<UserEnterMessageResponse> exitRoom(User user, Room room) {
//
//        try {
//            RedisUser ru = redisUserRepository.getOneRedisUser(user.getId());
//            redisUserRepository.deleteUser(ru);
//        }catch(Exception e){
//            throw new CustomBadRequestException(ErrorType.NOT_FOUND_REDISUSER);
//        }
//
//        GameRoom gm = redisGameRepository.getOneGameRoom(room.getId());
//        GameUser gu = redisGameUserRepository.getOneGameUser(user.getId());
//
//        //전달할 방정보
//        List<UserEnterMessageResponse> list = new ArrayList<>();
//
//        if(gm.getParticipants().size()==1) //방장 혼자면 방삭제 + gameUser 삭제
//        {
//            redisGameUserRepository.deleteGameUser(user.getId());
//            redisGameRepository.deleteGameRoom(room.getId());
//        }
//        else{ //방장외의 사람이 존재하면
//            if (gu.isManager()){ //방장이 나갔다면 방장 옮겨서 list 전달
//                for(GameUser gameu : )
//                list.add(UserEnterMessageResponse
//                        .builder()
//                                .chId(user.getChannel().getId())
//                                .roomId(room.getId())
//                                .userId(user.getId())
//                                .nickName(user.getNickName())
//                                .exp(user.getExp())
//                                .isReady()
//                        .build());
//            }
//            else{ //방장이 아닌사람이 나갔다면 삭제만하고 list 전달
//
//            }
//
//        }
//        redisGameUserRepository.deleteGameUser(user.getId());
//
//
//
//        //redisUser 삭제
//        //gameRoom 수정
//        //gameUser 삭제
//
//        //websocket 나감 보내주기
//        messageTemplate.convertAndSend("/alram/msg-to/"+room.getId(),
//                MessageDto
//                        .builder()
//                        .type(MessageDto.MessageType.ROOM_ENTER)
//                        .data(UserDisConnectMessageResponse
//                                .builder()
//                                .chId(user.getChannel().getId())
//                                .build())
//                        .build());
//    }
//
//    public void readyRoom(User user, Room room) {
//        messageTemplate.convertAndSend();
//    }
//
//    public void kickUser(User user, Room room) {
//        messageTemplate.convertAndSend();
//    }
}

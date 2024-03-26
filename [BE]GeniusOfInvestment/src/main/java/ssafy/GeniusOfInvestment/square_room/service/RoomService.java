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
import ssafy.GeniusOfInvestment.game.dto.ParticipantInfo;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserDisConnectMessageResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserEnterMessageResponse;
import ssafy.GeniusOfInvestment.square_room.repository.RedisUserRepository;
import ssafy.GeniusOfInvestment.square_room.repository.RoomRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    private final RedisGameRepository redisGameRepository;
    private final RedisUserRepository redisUserRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;

    public void enterRoom(User user, Room room) {
        Optional<Room> rtmp = roomRepository.findById(room.getId());
        if(rtmp.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);

        if(room.getPassword() != null){
            if(!room.getPassword().equals(rtmp.get().getPassword())){
                throw new CustomBadRequestException(ErrorType.INVALID_PASSWORD);
            }
        }
        //gameRoom Redis 정보 가져오기
        GameRoom gameRoom = redisGameRepository.getOneGameRoom(room.getId());
        if(gameRoom == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        // redisUser 가  없어야함 있다면 예외
        if(redisUserRepository.getOneRedisUser(user.getId()) != null)
            throw new CustomBadRequestException(ErrorType.IS_NOT_AVAILABLE_REDISUSER);

        // redis user 만들기, 상태추적
        redisUserRepository.saveUserStatusGameing(RedisUser.builder()
                .userId(user.getId())
                .status(false) //대기중 상태로
                .build());


        // gameuser 만들어서 Gameroom 에 넣어주고 저장
        gameRoom.getParticipants().add(
                GameUser.builder()
                        .userId(user.getId())
                        .isReady(false)
                        .isManager(false)
                        .buyInfos(new ArrayList<>())
                        .build());

        // gameroom에 저장
        redisGameRepository.saveGameRoom(gameRoom);
    }

    public List<RoomPartInfo> exitRoom(User user, Long rId){
        GameRoom room = redisGameRepository.getOneGameRoom(rId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        GameUser gameUser = new GameUser();
        gameUser.setUserId(user.getId());
        int idx = room.getParticipants().indexOf(gameUser);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        gameUser = room.getParticipants().get(idx); //탈퇴한 유저의 객체
        if(room.getParticipants().size() != 1){ //남아있는 인원이 2명 이상
            room.getParticipants().remove(idx);
            if(gameUser.isManager()){ //방장 권한을 가장 먼저 들어온 유저에게 위임
                room.getParticipants().get(0).setManager(true);
            }
            redisGameRepository.updateGameRoom(room);
        }else { //한명이 남아있었으므로 방 삭제까지 같이 수행
            redisGameRepository.deleteGameRoom(rId);
            Optional<Room> tmp = roomRepository.findById(rId);
            if(tmp.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
            tmp.get().updateStatus(2); //room테이블에 없어진 방 처리
        }

        List<RoomPartInfo> rstList = new ArrayList<>();
        for(GameUser gu : room.getParticipants()){
            Optional<User> tmp = userRepository.findById(gu.getUserId());
            if(tmp.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
            rstList.add(RoomPartInfo.builder()
                            .userId(gu.getUserId())
                            .userNick(tmp.get().getNickName())
                            .isReady(gu.isReady())
                            .isManager(gu.isManager())
                    .build());
        }
        return rstList;
    }

}

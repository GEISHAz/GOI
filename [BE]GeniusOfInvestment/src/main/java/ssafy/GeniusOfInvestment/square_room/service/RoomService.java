package ssafy.GeniusOfInvestment.square_room.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.dto.ParticipantInfo;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomEnterRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomInfoResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserDisConnectMessageResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserEnterMessageResponse;
import ssafy.GeniusOfInvestment.square_room.repository.RedisUserRepository;
import ssafy.GeniusOfInvestment.square_room.repository.RoomRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RoomService {
    private final RedisGameRepository redisGameRepository;
    private final RedisUserRepository redisUserRepository;
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final SimpMessageSendingOperations messageTemplate;

    public List<RoomPartInfo> enterRoom(User user, RoomEnterRequest enterInfo) {
        Optional<Room> rtmp = roomRepository.findById(enterInfo.roomId());
        if(rtmp.isEmpty() || rtmp.get().getStatus() == 2) throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        Room room = rtmp.get(); //들어가려는 방 정보를 얻는다.

        if(room.getPassword() != null){ //방에 비밀번호가 설정되어 있다.
            if(!room.getPassword().equals(enterInfo.password())){
                throw new CustomBadRequestException(ErrorType.INVALID_PASSWORD);
            }
        }
        //gameRoom Redis 정보 가져오기
        GameRoom gameRoom = redisGameRepository.getOneGameRoom(room.getId());
        if(gameRoom == null){
            System.out.println("redis 설정 잘못 된듯");
            throw new CustomBadRequestException(ErrorType.IS_NOT_AVAILABLE_REDIS_GAMEROOM);
        }
        log.info("enter기능 속 레디스 방 아이디 로그: " + gameRoom.getId().toString());
        for(GameUser tp : gameRoom.getParticipants()){
            log.info("enter 참여자 " + tp.getUserId().toString());
        }

        //방이 가득 찼다.
        if(gameRoom.getParticipants().size()>=4){
            throw new CustomBadRequestException(ErrorType.IS_FULL_ROOM);
        }

        // redisUser 가 없어야함 있다면 예외
        if(redisUserRepository.getOneRedisUser(user.getId()) != null)
            throw new CustomBadRequestException(ErrorType.IS_NOT_AVAILABLE_REDISUSER);

        // redis user 만들기, 상태추적
        redisUserRepository.saveUserStatusGameing(RedisUser.builder()
                .userId(user.getId())
                .status(false) //대기중 상태로
                .build());

        log.info("참여 신청 유저 아이디: " + user.getId());
        for(GameUser tp : gameRoom.getParticipants()){
            log.info("enter전 참여자 " + tp.getUserId().toString());
        }
        // gameuser 만들어서 Gameroom 에 넣어주고 저장
        gameRoom.getParticipants().add(
                GameUser.builder()
                        .userId(user.getId())
                        .isReady(false)
                        .isManager(false)
                        .buyInfos(new ArrayList<>())
                        .build());
        // gameroom에 저장
        redisGameRepository.updateGameRoom(gameRoom);
        for(GameUser tp : gameRoom.getParticipants()){
            log.info("enter후 참여자 " + tp.getUserId().toString());
            log.info("방장인가?? " + tp.isManager());
        }

        List<RoomPartInfo> rstList = new ArrayList<>();
        for(GameUser gu : gameRoom.getParticipants()){
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

    @Transactional
    public List<RoomPartInfo> exitRoom(User user, Long rId){
        GameRoom room = redisGameRepository.getOneGameRoom(rId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }
        log.info("방 아이디 값은 " + room.getId().toString());

        GameUser gameUser = new GameUser();
        log.info("요청 유저 아이디: " + user.getId());
        gameUser.setUserId(user.getId());
        for(GameUser tp : room.getParticipants()){
            log.info("참여자 " + tp.getUserId().toString());
        }
        int idx = room.getParticipants().indexOf(gameUser);
        log.info("gameuser인덱스값이 " + idx);
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
            roomRepository.save(tmp.get());
        }
        redisUserRepository.deleteUser(user.getId());

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

    @Transactional
    public List<RoomPartInfo> kickUser(User user, Long targetId, Long rId){
        GameRoom room = redisGameRepository.getOneGameRoom(rId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        GameUser gameUser = new GameUser();
        gameUser.setUserId(user.getId());
        int idx = room.getParticipants().indexOf(gameUser);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        gameUser = room.getParticipants().get(idx); //강퇴를 요청한 유저의 객체
        if(!gameUser.isManager()){
            throw new CustomBadRequestException(ErrorType.IS_NOT_MANAGER);
        }
        GameUser target = new GameUser();
        target.setUserId(targetId);
        idx = room.getParticipants().indexOf(target);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        room.getParticipants().remove(idx); //강퇴 당할 유저를 redis 참가자 리스트에서 삭제
        redisGameRepository.updateGameRoom(room);
        redisUserRepository.deleteUser(targetId); //redis 유저에서도 삭제

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

    public int doingRoomReady(User user, Long grId){
        GameRoom room = redisGameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        List<GameUser> gameUserList = new ArrayList<>();
        int cnt = 0;
        int flag = 1;
        for(GameUser guser : room.getParticipants()){
            if(Objects.equals(guser.getUserId(), user.getId())){ //ready를 요청한 사용자이다.
                if(!guser.isReady()){
                    flag = 0; //레디를 한것
                    guser.setReady(true);
                }else{
                    flag = -1; //레디를 취소한것
                    guser.setReady(false);
                }
            }
//            if(guser.isReady()){
//                cnt++;
//            }
            gameUserList.add(guser);
        }

        //GameRoom(redis)에 정보 업데이트
        room.setParticipants(gameUserList);
        redisGameRepository.updateGameRoom(room);

        //ready를 요청한 사용자가 참가자 목록에 없다.
        if(flag == 1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER_IN_ROOM);
        return flag;

//        if(cnt == room.getParticipants().size()){
//            return 1;
//        }else { //아직 전체 참여자가 레디를 다 누르지 않았다.
//            //ready를 요청한 사용자가 참가자 목록에 없다.
//            if(flag == 1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER_IN_ROOM);
//            return flag;
//            //return 0;
//        }
    }
}

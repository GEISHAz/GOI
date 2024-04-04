package ssafy.GeniusOfInvestment.square_room.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.exception.CustomRoomEnterException;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomEnterRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.*;
import ssafy.GeniusOfInvestment.channel.repository.ChannelRepository;
import ssafy.GeniusOfInvestment.square_room.repository.RedisUserRepository;
import ssafy.GeniusOfInvestment.square_room.repository.RoomRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class SquareService {

    private final RoomRepository roomRepository;
    private final RedisGameRepository redisGameRepository;
    private final RedisUserRepository redisUserRepository;
    private final ChannelRepository channelRepository;
    private final SimpMessageSendingOperations messageTemplate;
    private final UserRepository userRepository;

    @Transactional
    public SavedRoomResponse insertRoom(User user, RoomCreateRequest info) {
        //log.info("SquareService insertRoom start");

        Optional<User> u = userRepository.findById(user.getId());
        //저장할 채널 객체 생성
        if (u.isEmpty())
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);

        Channel ch = u.get().getChannel();

        if(ch == null){
            throw new CustomBadRequestException(ErrorType.FAIL_TO_CREATE_ROOM);
        }
        int rmNum = createRoomNum(ch);
        if(rmNum == 0){
            throw new CustomBadRequestException(ErrorType.ERR_CREATE_ROOMNUM);
        }
        //log.info("생성된 방번호: " + rmNum);
        //방 객체 생성 및 사용자가 원하는 방제,비번등으로 설정
        Room room = Room
                .builder()
                .roomNum(rmNum)
                .channel(ch)
                .title(info.title())
                .password(info.password())
                .isPublic(!info.isPrivate())
                .status(0)
                .fromYear(info.startYear())
                .endYear(info.endYear())
                .build();
        //방 정보 DB 저장
        room = roomRepository.save(room);
        //log.info("save, result 이후 room" + room.getId());

        //Redis 정보속 유저 리스트 생성
        List<GameUser> list = new ArrayList<>();
        list.add(GameUser.builder()
                .userId(user.getId())
                .isReady(true)
                .isManager(true)
                .buyInfos(new ArrayList<>())
                .build());

        //Redis GameRoom 생성
        GameRoom gameRoom = GameRoom
                .builder()
                .id(room.getId())
                .participants(list)
                .build();
        redisGameRepository.saveGameRoom(gameRoom);

        //log.info("redisUser가 없어야함 있다면 문제임"+redisUserRepository.getOneRedisUser(user.getId()));
        if(redisUserRepository.getOneRedisUser(user.getId()) != null) {
            log.info("IS_NOT_AVILABLE_REDISUSER");
            throw new CustomBadRequestException(ErrorType.IS_NOT_AVAILABLE_REDISUSER);
        }
        // redis user 만들기, 상태추적
        redisUserRepository.saveUserStatusGameing(RedisUser.builder()
                .userId(user.getId())
                .status(false) //대기중 상태로
                .build());

        //log.info("SquareService insertRoom end");

        List<RoomPartInfo> rstList = new ArrayList<>();
        rstList.add(RoomPartInfo.builder()
                .userId(user.getId())
                .userNick(user.getNickName())
                .isReady(true)
                .isManager(true)
                .exp(user.getExp())
                .imageId(user.getImageId())
                .build());

        return makeSavedRoomResponse(room, info.channelId(), rstList);
    }

    //방 번호를 생성(ex)1001, 2001)
    public int createRoomNum(Channel ch){
        Room room = roomRepository.findLargestRmNum(ch);
        if(room == null){ //이 채널에 생성된 방이 없다.
            return (int) ((ch.getId()*1000) + 1);
        }else {
            int num = room.getRoomNum() + 1;
            if(num >= (ch.getId()+1) * 1000){ //그 다음 천단위로 넘어간다 (ex)1999 -> 2000)
                num = (int) ((ch.getId()*1000) + 1);
                while (num < (ch.getId()+1) * 1000){
                    //이 숫자에 대해서 roomNum가 존재하지 않는다면
                    if(!roomRepository.existsByChannelAndRoomNumAndStatusBetween(ch, num, 0, 1)){
                        return num;
                    }
                    num++;
                }
                throw new CustomBadRequestException(ErrorType.CHANNEL_IS_FULL);
            }else {
                return num;
            }
        }
    }

    public List<SquareNowUser> listUser(Long channelnum) {
        //log.info("SquareService listRoom start");
        //리턴할 list
        List<SquareNowUser> list = new ArrayList<>();


        //받아온 방정보
        List<User> users = new ArrayList<>();
        try {
            Optional<Channel> byId = channelRepository.findById(channelnum);
            if (byId.isPresent())
                users = userRepository.findAllByChannel(byId.get());
        } catch (Exception e) {
            throw new CustomBadRequestException(ErrorType.CHANNEL_NOT_FOUND);
        }

        for (User u : users) {
            int nowStatus; // 0 == 로그인 1 == 대기중 2 == 게임중
            if (redisUserRepository.getOneRedisUser(u.getId()) == null) nowStatus = 0; // 로그인 중
            else {
                if (redisUserRepository.getOneRedisUser(u.getId()).isStatus())
                    nowStatus = 2; // 게임 중
                else
                    nowStatus = 1; // 대기 중
            }

            list.add(SquareNowUser
                    .builder()
                    .id(u.getId())
                    .nickName(u.getNickName())
                    .status(nowStatus)
                    .exp(u.getExp())
                    .imageId(u.getImageId())
                    .build());
        }
        //log.info("SquareService insertRoom end");
        return list;
    }

    public RoomListResponse listRoom(Long channelnum) {

        //log.info("SquareService listRoom start");

        //채널 잘못 받을때 예외
        if (channelnum > 8 || channelnum < 1)
            throw new CustomBadRequestException(ErrorType.NOT_AVAILABLE_CHANNEL);

        //리턴할 list
        List<SquareRoom> list = new ArrayList<>();

        //받아온 방정보
        List<SquareRoom> rooms = channelRepository.findRoomsStatus0(channelnum);

        //list 가공
        for (SquareRoom room : rooms) {
            Long id = room.id();
            if(room.roomNum() == 0){
                log.info("방 번호가 잘못 검색이 되었다. 방번호가 제대로 저장이 안된듯");
                throw new CustomBadRequestException(ErrorType.ERR_CREATE_ROOMNUM);
            }
            GameRoom groom = redisGameRepository.getOneGameRoom(id);
            if(groom == null){
                throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
            }
            list.add(SquareRoom
                    .builder()
                    .id(id)
                    .roomNum(room.roomNum())
                    .title(room.title())
                    .isPrivate(room.isPrivate())
                    .userCount(groom.getParticipants().size())
                    .build());
        }

        //리턴값 생성
        RoomListResponse result = RoomListResponse
                .builder()
                .totalRoomCount(list.size())
                .list(list)
                .build();

        log.info("SquareService listRoom end");
        return result;
    }

    public RoomEnterRequest fastEnter(User user) {
        //log.info("SquareService fastEnter start");
        RoomEnterRequest result = RoomEnterRequest
                .builder()
                .roomId(99999999L)
                .build();
        List<SquareRoom> list = roomRepository.findRoomCanEnter(user.getChannel().getId());
        if(list.size()==0) {
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }
        int number = list.size();
        //log.info("in fastEnter list size = "+number);
        boolean stop = false;
        Random rand = new Random();
        do {
            //log.info("in fastEnter while start");
            int num  = rand.nextInt(number);
            if(isGameRoomFull(list.get(num).id()))
                continue;
            stop = true;
            return RoomEnterRequest
                    .builder()
                    .roomId(list.get(num).id())
                    .roomNum(list.get(num).roomNum())
                    .build();

        } while(stop);
//        log.info("return id     = " +result.roomId());
//        log.info("in fastEnter while end");
        return result;
    }

    public SavedRoomResponse makeSavedRoomResponse(Room room, Long channelId, List<RoomPartInfo> userList) {
        //log.info("SquareService makeSavedRoomResponse start");

        if (room.getId() == null)
            log.info("id null");
        if (room.getTitle() == null)
            log.info("title null");
        if (room.getChannel() == null)
            log.info("channel null");

        //log.info("SquareService makeSavedRoomResponse end");
        return SavedRoomResponse
                .builder()
                .roomId(room.getId())
                .roomnum(room.getRoomNum())
                .channelId(channelId)
                .title(room.getTitle())
                .isPrivate(!room.isPublic())
                .turnNum(room.getEndYear()-room.getFromYear()+1)
                .status(room.getStatus())
                .userList(userList)
                .build();
    }


    public boolean isGameRoomFull(Long roomId){
        GameRoom oneGameRoom = redisGameRepository.getOneGameRoom(roomId);
        if (oneGameRoom.getParticipants().size()==4)
            return true;
        return false;
    }

    public boolean isGameRoomLocked(Long roomId){
        Optional<Room> byId = roomRepository.findById(roomId);
        if(byId.isEmpty())
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        return !byId.get().isPublic();
    }

}

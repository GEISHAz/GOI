package ssafy.GeniusOfInvestment.square.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;
import ssafy.GeniusOfInvestment._common.redis.GameUser;
import ssafy.GeniusOfInvestment.square.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square.dto.response.SavedRoomResponse;
import ssafy.GeniusOfInvestment.square.repository.RoomRepository;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SquareService {

    private final RoomRepository squareRepository;
    private final RedisGameRepository gameRepository;

    public SavedRoomResponse insertRoom(User user, RoomCreateRequest info) {

        Channel ch = new Channel();
        ch.setId(info.channelId());

        Room room = Room
                .builder()
                .channel(ch)
                .title(info.title())
                .password(info.password())
                .isPublic(info.isPublic())
                .status(0)
                .fromYear(info.fromYear())
                .endYear(info.endYear())
                .build();

        //방 정보 DB 저장
        squareRepository.save(room);

        //Redis 정보속 유저 리스트 생성
        List<GameUser> list = new ArrayList<>();
        list.add(GameUser
                .builder()
                .userId(user.getId())
                .isReady(false)
                .isManager(true)
                .build());

        //Redis GameRoom 생성
        GameRoom gameRoom = GameRoom
                .builder()
                .id(room.getId())
                .participants(list)
                .build();

        gameRepository.saveGameRoom(gameRoom);


        // 방 redis 방장 user 집어넣기가 피룡하다.

        return makeSavedRoomResponse(room);
        //방생성 완료
    }

    public SavedRoomResponse makeSavedRoomResponse(Room room){
        return SavedRoomResponse
                .builder()
                .channelId(room.getChannel().getId())
                .title(room.getTitle())
                .password(room.getPassword())
                .isPublic(room.isPublic())
                .status(room.getStatus())
                .fromYear(room.getFromYear())
                .endYear(room.getEndYear())
                .build();
    }
}

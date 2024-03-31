package ssafy.GeniusOfInvestment.square_room.repository;

import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment.square_room.dto.response.SquareRoom;

import java.util.List;

public interface RoomRepositoryCustom {
    List<SquareRoom> findRoomCanEnter(Long channelId);
    Room findLargestRmNum(Channel ch);
    //Long countRmNumByCh(Channel ch, int roomNum);
    Long findRoomIdByRoomNumAndStatusZero(int roomNum);
}

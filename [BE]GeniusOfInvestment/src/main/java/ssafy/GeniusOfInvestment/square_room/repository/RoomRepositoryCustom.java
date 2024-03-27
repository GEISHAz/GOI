package ssafy.GeniusOfInvestment.square_room.repository;

import ssafy.GeniusOfInvestment.square_room.dto.response.SquareRoom;

import java.util.List;

public interface RoomRepositoryCustom {
    List<SquareRoom> findRoomCanEnter(Long channelId);
}

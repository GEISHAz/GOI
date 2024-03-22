package ssafy.GeniusOfInvestment.square_room.repository;

import ssafy.GeniusOfInvestment.square_room.dto.response.SquareRoom;

import java.util.List;

public interface ChannelRepositoryCustom {
    List<SquareRoom> findRoomsStatus0(Long channelNum);
}

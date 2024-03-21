package ssafy.GeniusOfInvestment.square.repository;

import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment.square.dto.response.SquareRoom;

import java.util.List;

public interface ChannelRepositoryCustom {
    List<SquareRoom> findRoomsStatus0(Long channelNum);
}

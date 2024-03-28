package ssafy.GeniusOfInvestment.game.dto;

import lombok.Builder;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;

import java.util.List;

@Builder
public record ReadyResponse(Long userId, boolean ready, boolean start, List<RoomPartInfo> list) {
}

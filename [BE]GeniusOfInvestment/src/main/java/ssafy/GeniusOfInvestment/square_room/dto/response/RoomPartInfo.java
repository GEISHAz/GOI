package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record RoomPartInfo(Long userId, String userNick, boolean isReady, boolean isManager) {
}

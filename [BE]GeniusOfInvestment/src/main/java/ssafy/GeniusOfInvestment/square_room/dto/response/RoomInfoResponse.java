package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record RoomInfoResponse(
        Long roomId,
        boolean isPrivate, //true면 비번방 false면 공개방
        boolean enter //true 면 가능 false 면 불가능

) {
}

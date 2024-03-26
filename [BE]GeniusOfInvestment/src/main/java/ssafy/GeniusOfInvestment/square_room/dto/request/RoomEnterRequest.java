package ssafy.GeniusOfInvestment.square_room.dto.request;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public record RoomEnterRequest(
        Long roomId,
        String password
) {
}

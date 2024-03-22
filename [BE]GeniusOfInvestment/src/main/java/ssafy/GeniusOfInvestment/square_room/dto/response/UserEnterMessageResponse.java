package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record UserEnterMessageResponse(
        Long chId,
        Long roomId,
        Long userId,
        String nickName,
        Long exp,
        boolean isReady
) {

}

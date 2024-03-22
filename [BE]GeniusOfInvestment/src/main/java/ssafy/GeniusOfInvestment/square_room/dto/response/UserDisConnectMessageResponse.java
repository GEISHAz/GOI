package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record UserDisConnectMessageResponse(
        Long chId,
        Long roomId,
        Long userId

)
{

}

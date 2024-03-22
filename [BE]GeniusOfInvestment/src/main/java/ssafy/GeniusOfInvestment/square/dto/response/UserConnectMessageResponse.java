package ssafy.GeniusOfInvestment.square.dto.response;

import lombok.Builder;

@Builder
public record UserConnectMessageResponse(
        Long userId,
        Long roomId,
        Long chId)
{

}

package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record SquareNowUser(
        Long id,
        String nickName,
        int status,
        Long exp,
        int imageId
) {
}

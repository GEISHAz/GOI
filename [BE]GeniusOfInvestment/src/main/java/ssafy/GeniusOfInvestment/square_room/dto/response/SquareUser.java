package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record SquareUser(
        Long id,
        String nickName,
        boolean isPublic,
        int userCount

) {
    public SquareUser {

    }
}

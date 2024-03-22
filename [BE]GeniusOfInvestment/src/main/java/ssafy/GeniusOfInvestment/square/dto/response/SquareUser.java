package ssafy.GeniusOfInvestment.square.dto.response;

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

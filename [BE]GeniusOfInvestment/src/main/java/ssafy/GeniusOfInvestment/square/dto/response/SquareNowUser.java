package ssafy.GeniusOfInvestment.square.dto.response;

import lombok.Builder;

@Builder
public record SquareNowUser(
        Long id,
        String nickName,
        int status,
        Long exp
) {
    public SquareNowUser{

    }
}

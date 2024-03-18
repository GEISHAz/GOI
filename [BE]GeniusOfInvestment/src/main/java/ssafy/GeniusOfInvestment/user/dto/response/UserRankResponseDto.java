package ssafy.GeniusOfInvestment.user.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UserRankResponseDto {
    private Long rank;
    private String nickname;
    private Long exp;

    @Builder
    private UserRankResponseDto(Long rank, String nickname, Long exp){
        this.rank = rank;
        this.nickname = nickname;
        this.exp = exp;
    }

    public static UserRankResponseDto of(Long rank, String nickname, Long exp){
        return builder()
                .rank(rank)
                .nickname(nickname)
                .exp(exp)
                .build();
    }

}

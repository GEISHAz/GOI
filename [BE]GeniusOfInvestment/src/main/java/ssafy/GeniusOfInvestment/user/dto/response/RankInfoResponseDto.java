package ssafy.GeniusOfInvestment.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.GeniusOfInvestment._common.entity.User;

@Getter
public class RankInfoResponseDto {

    private Long id;
    private String nickName;
    private Long exp;

    @Builder
    private RankInfoResponseDto(Long id, String nickName, Long exp){
        this.id = id;
        this.nickName = nickName;
        this.exp = exp;
    }

    public static RankInfoResponseDto from(User user){
        return builder()
                .id(user.getId())
                .nickName(user.getNickName())
                .exp(user.getExp())
                .build();
    }


}

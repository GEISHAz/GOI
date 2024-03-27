package ssafy.GeniusOfInvestment.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment._common.entity.User;

@Getter
public class RankInfoResponseDto {

    private final Long id;
    private final String nickName;
    private final Long exp;
    private final int imageId;
    private final Long rankByExp;

    @Builder
    private RankInfoResponseDto(Long id, String nickName, Long exp,int imageId,Long rankByExp){
        this.id = id;
        this.nickName = nickName;
        this.exp = exp;
        this.imageId = imageId;
        this.rankByExp = rankByExp;
    }

    public static RankInfoResponseDto from(User user, Long rankByExp){
        return builder()
                .id(user.getId())
                .nickName(user.getNickName())
                .exp(user.getExp())
                .imageId(user.getImageId())
                .rankByExp(rankByExp)
                .build();
    }
}

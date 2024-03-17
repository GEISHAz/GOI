package ssafy.GeniusOfInvestment.user.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.GeniusOfInvestment.entity.User;

@Getter
public class UserInfoResponseDto {
    private Long id;
    private Long exp;
    private int imageId;
    private String nickName;

    @Builder
    private UserInfoResponseDto(Long id,Long exp, int imageId, String nickName){
        this.id = id;
        this.exp = exp;
        this.imageId = imageId;
        this.nickName = nickName;
    }

    public static UserInfoResponseDto from(User user){
        return builder()
                .id(user.getId())
                .exp(user.getExp())
                .imageId(user.getImageId())
                .nickName(user.getNickName())
                .build();
    }
}

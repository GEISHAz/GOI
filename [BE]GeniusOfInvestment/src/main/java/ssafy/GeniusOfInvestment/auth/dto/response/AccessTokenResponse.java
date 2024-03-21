package ssafy.GeniusOfInvestment.auth.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class AccessTokenResponse {
    private String accessToken;

    @Builder
    private AccessTokenResponse(String accessToken){
        this.accessToken = accessToken;
    }

    public static AccessTokenResponse of(String accessToken){
        return builder()
                .accessToken(accessToken)
                .build();
    }
}

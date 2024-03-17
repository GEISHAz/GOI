package ssafy.GeniusOfInvestment.common.oauth2.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ssafy.GeniusOfInvestment._common.oauth2.exception.OAuth2AuthenticationProcessingException;

@RequiredArgsConstructor
@Component
public class OAuth2UserUnlinkManager {

    private final KakaoOAuth2UserUnlink kakaoOAuth2UserUnlink;
    private final NaverOAuth2UserUnlink naverOAuth2UserUnlink;

    public void unlink(OAuth2Provider provider, String accessToken) {

       if (OAuth2Provider.NAVER.equals(provider)) {
            naverOAuth2UserUnlink.unlink(accessToken);
        } else if (OAuth2Provider.KAKAO.equals(provider)) {
            kakaoOAuth2UserUnlink.unlink(accessToken);
        } else {
            throw new OAuth2AuthenticationProcessingException(
                    "Unlink with " + provider.getRegistrationId() + " is not supported");
        }
    }
}

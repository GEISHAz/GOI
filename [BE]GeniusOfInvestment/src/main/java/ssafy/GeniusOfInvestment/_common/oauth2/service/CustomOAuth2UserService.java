package ssafy.GeniusOfInvestment._common.oauth2.service;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import ssafy.GeniusOfInvestment._common.oauth2.exception.OAuth2AuthenticationProcessingException;
import ssafy.GeniusOfInvestment._common.oauth2.user.OAuth2UserInfo;
import ssafy.GeniusOfInvestment._common.oauth2.user.OAuth2UserInfoFactory;

@RequiredArgsConstructor
@Service
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            //log.info("사용자 정보 받아오기 완료 == " + oAuth2User);

            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        //로그인한 클라이언트의 등록 ID
        String registrationId = userRequest.getClientRegistration()
                .getRegistrationId();
        //사용자 정보 엑세스 토큰
        String accessToken = userRequest.getAccessToken().getTokenValue();

        //
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId,
                accessToken,
                oAuth2User.getAttributes());

        // OAuth2UserInfo field value validation
        if (!StringUtils.hasText(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        //OAuth2 공급자로부터 받은 사용자 정보를 OAuth2UserPrincipal 객체에 담아 Spring Security에 반환
        return new OAuth2UserPrincipal(oAuth2UserInfo);
    }
}

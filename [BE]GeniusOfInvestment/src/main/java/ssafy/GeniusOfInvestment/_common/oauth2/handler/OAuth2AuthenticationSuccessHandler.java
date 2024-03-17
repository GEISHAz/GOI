package ssafy.GeniusOfInvestment._common.oauth2.handler;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import ssafy.GeniusOfInvestment._common.jwt.GeneratedToken;
import ssafy.GeniusOfInvestment._common.jwt.JwtUtil;
import ssafy.GeniusOfInvestment._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import ssafy.GeniusOfInvestment._common.oauth2.service.OAuth2UserPrincipal;
import ssafy.GeniusOfInvestment._common.oauth2.user.OAuth2Provider;
import ssafy.GeniusOfInvestment._common.oauth2.user.OAuth2UserUnlinkManager;
import ssafy.GeniusOfInvestment._common.utils.CookieUtils;
import ssafy.GeniusOfInvestment.auth.service.AuthTokenService;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.user.service.UserService;

import java.io.IOException;
import java.util.Optional;

import static ssafy.GeniusOfInvestment._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.MODE_PARAM_COOKIE_NAME;
import static ssafy.GeniusOfInvestment._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * OAuth2 인증 성공시 호출되는 핸들러
 * 프론트앤트에서 백엔드 로그인 요청시 mode 쿼리 파라미터에 담긴 값에 따라 분기하여 처리
 * mode=login -> 사용자 정보 DB 저장, 서비스 액세스 토큰, 리프레시 토큰 생성, 리프레시 토큰 DB 저장
 */
@Slf4j
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final OAuth2UserUnlinkManager oAuth2UserUnlinkManager;
    private final AuthTokenService authTokenService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        String targetUrl;

        targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) {

        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        String mode = CookieUtils.getCookie(request, MODE_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse("");

        //CustomOAuth2UserService에서 저장한 OAuth2UserPrincipal(oAuth2UserInfo)
        OAuth2UserPrincipal principal = getOAuth2UserPrincipal(authentication);

        if (principal == null) {
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("error", "Login failed")
                    .build().toUriString();
        }

        if ("login".equalsIgnoreCase(mode)) {
            // TODO: DB 저장
            // TODO: 액세스 토큰, 리프레시 토큰 발급
            // TODO: 리프레시 토큰 DB 저장

//            log.info("id={}, email={}, name={}, profileUrl={}, accessToken={}, providerType={}",
//                    principal.getUserInfo().getId(),
//                    principal.getUserInfo().getEmail(),
//                    principal.getUserInfo().getName(),
//                    principal.getUserInfo().getProfileImageUrl(),
//                    principal.getUserInfo().getAccessToken(),
//                    principal.getUserInfo().getProvider()
//            );


            String socialId = principal.getUserInfo().getId();
            Optional<User> findUser = userService.findBySocialId(socialId);

            //로그인을 처음한 인원 -> DB에 저장해줘야 함
            if(findUser.isEmpty()){

                User user = User.of(principal.getUserInfo().getId(),0L,0,null);
                Long memberId = userService.saveSocialMember(user);
                GeneratedToken token = jwtUtil.generateToken(memberId.toString());

                //TODO: 회원가입 페이지(닉네임)로 리다이렉트
                return UriComponentsBuilder.fromUriString(targetUrl)
                        .queryParam("access-token", token.getAccessToken())
                        .queryParam("member-id", memberId)
                        .queryParam("next", "kakaoLogin")
                        .build().toUriString();
            }else {
                //회원이 존재하는 경우
                GeneratedToken token = jwtUtil.generateToken(findUser.get().getId().toString());

                //TODO: 로그인 후 페이지로 리다이렉트
                return UriComponentsBuilder.fromUriString(targetUrl)
                        .queryParam("access-token", token.getAccessToken())
                        .queryParam("member-id", findUser.get().getId())
                        .queryParam("next", "main")
                        .build().toUriString();
            }

        } else if ("unlink".equalsIgnoreCase(mode)) {
            // TODO: DB 삭제
            // TODO: 리프레시 토큰 삭제
            String accessToken = principal.getUserInfo().getAccessToken();
            OAuth2Provider provider = principal.getUserInfo().getProvider();
            oAuth2UserUnlinkManager.unlink(provider, accessToken);
            Optional<User> findMember = userService.findBySocialId(principal.getUserInfo().getId());
            authTokenService.removeRefreshTokenById(findMember.get().getId().toString());
            userService.deleteMember(findMember);


            return UriComponentsBuilder.fromUriString(targetUrl)
                    .build().toUriString();
        }

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", "Login failed")
                .build().toUriString();
    }

    private OAuth2UserPrincipal getOAuth2UserPrincipal(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof OAuth2UserPrincipal) {
            return (OAuth2UserPrincipal) principal;
        }
        return null;
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }
}

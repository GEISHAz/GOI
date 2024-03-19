package ssafy.GeniusOfInvestment._common.oauth2.handler;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import ssafy.GeniusOfInvestment._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository;
import ssafy.GeniusOfInvestment._common.utils.CookieUtils;

import java.io.IOException;

import static ssafy.GeniusOfInvestment._common.oauth2.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

/**
 * OAuth2 인증 실패시 호출되는 핸들러
 * 인증 실패 -> 프론트엔드에서 백엔드로 로그인 요청시 redirect_uri 쿼리 파리미터에 담긴 주소로 리다이렉트함
 * 이때 error라는 쿼리 파라미터에 오류 메세지를 담아서 리다이렉트
 */
@RequiredArgsConstructor
@Component
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        String targetUrl = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME) //사용자가 요청에 쿠키(redirect_uri)를 담아서 보낼 경우 쿠키에서 uri를 가져옴
                .map(Cookie::getValue)
                .orElse(("/"));// 쿠키에 uri가 없을 경우 '/'로 리다이렉트

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}

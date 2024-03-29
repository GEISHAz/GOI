package ssafy.GeniusOfInvestment._common.jwt;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import ssafy.GeniusOfInvestment._common.exception.JwtException;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.user.service.UserService;

import java.io.IOException;
import java.util.Collections;

@Slf4j
@RequiredArgsConstructor
@Component
public class JwtAuthorizationFilter extends OncePerRequestFilter {

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().contains("api/auth/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String token = resolveToken(request);

        // 토큰 검사 생략(모두 허용 URL의 경우 토큰 검사 통과)
        // 토큰이 없다면 필터 계속 진행 -> oauth 로그인 실행됨
        if (!StringUtils.hasText(token)) {
            doFilter(request, response, filterChain);
            return;
        }

        // AccessToken을 검증하고, 만료되었을경우 예외를 발생시킨다.
        if (!jwtUtil.validateToken(token)) {
            throw new JwtException("Access Token 만료!");
        }

        if (StringUtils.hasText(token) && jwtUtil.validateToken(token)) {
            //SecurityContext에 저장할 User 객체 생성
            log.info("토큰값이 " + token);
            String userId = jwtUtil.getUserId(token);
            log.info("필터속 token에서 얻어온 유저 아디디: " + userId);
            UserDetails user = userService.loadUserByUsername(userId);
            //User user = userService.getAuthenticationUser(jwtUtil.getUserId(token));
            log.info("jwt필터에서 유저: " + user);
            //log.info("필터에서 유저 아이디: " + user.get);

//            Authentication authentication = jwtUtil.getAuthentication(user);
//            SecurityContextHolder.getContext().setAuthentication(authentication);

            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(user, "", Collections.emptyList());

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }

        return null;
    }
}

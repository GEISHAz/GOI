package ssafy.GeniusOfInvestment.auth.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import ssafy.GeniusOfInvestment._common.jwt.JwtUtil;
import ssafy.GeniusOfInvestment._common.jwt.SavedToken;
import ssafy.GeniusOfInvestment._common.jwt.TokenRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthTokenService {

    private final TokenRepository tokenRepository;
    private final JwtUtil jwtUtil;

    private static final String AUTHORIZATION_HEADER = "Authorization";
    private static final String BEARER_PREFIX = "Bearer ";

    @Transactional
    public String republishAccessToken(String accessToken) {
        // 액세스 토큰으로 Refresh 토큰 객체를 조회
        Optional<SavedToken> refreshToken = tokenRepository.findByAccessToken(resolveToken(accessToken));

        // RefreshToken이 존재하고 유효하다면 실행
        if (refreshToken.isPresent() && jwtUtil.validateToken(refreshToken.get().getRefreshToken())) {
            //RefreshToken 객체를 꺼내온다.
            SavedToken resultToken = refreshToken.get();
            //아이디를 추출해 새로운 액세스토큰을 만든다.
            String newAccessToken = jwtUtil.generateAccessToken(resultToken.getId());
            //액세스 토큰의 값을 수정해준다.
            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);
            //새로운 액세스 토큰을 반환해준다.
            return newAccessToken;
        }
        // RefreshToken이 유효하지 않다면 예외 처리, 전달
        return null;
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        SavedToken token = tokenRepository.findByAccessToken(resolveToken(accessToken))
                .orElseThrow(IllegalArgumentException::new);

        tokenRepository.delete(token);
    }

    @Transactional
    public void removeRefreshTokenById(String memberId) {
        tokenRepository.deleteById(memberId);
    }

    private String resolveToken(String token) {

        if (StringUtils.hasText(token) && token.startsWith(BEARER_PREFIX)) {
            return token.substring(BEARER_PREFIX.length());
        }

        return null;
    }
}

package ssafy.GeniusOfInvestment._common.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.User;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtTokenService jwtTokenService;

    private static final long REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000L * 60L * 60L * 24L * 14; //refresh token 2week
    private static final long ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS = 1000 * 60 * 60; //access token 30min

    @Value(value = "${jwt.secret}")
    private String secret;
    private Key key;

    @PostConstruct
    public void init() {
        byte[] key = Decoders.BASE64URL.decode(secret);
        this.key = Keys.hmacShaKeyFor(key);
    }

    public boolean validateToken(String token) {

        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            //토큰의 만료 시간과 현재 시간 비교
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());  // 만료 시간이 현재 시간 이후인지 확인하여 유효성 검사 결과를 반환
        } catch (UnsupportedJwtException | MalformedJwtException exception) {
            log.error("JWT is not valid");
        } catch (SignatureException exception) {
            log.error("JWT signature validation fails");
        } catch (ExpiredJwtException exception) {
            log.error("JWT is expired");
        } catch (IllegalArgumentException exception) {
            log.error("JWT is null or empty or only whitespace");
        } catch (Exception exception) {
            log.error("JWT validation fails", exception);
        }

        return false;
    }

    public GeneratedToken generateToken(String memberId) {
        // refreshToken과 accessToken을 생성한다.
        String refreshToken = generateRefreshToken(memberId);
        String accessToken = generateAccessToken(memberId);

        // 토큰을 Redis에 저장한다.
        jwtTokenService.saveTokenInfo(memberId, refreshToken, accessToken);
        return new GeneratedToken(accessToken, refreshToken);
    }

    public String generateRefreshToken(String userId) {

        //새로운 클레임 객체 생성, userId를 Subject설정
        Claims claims = Jwts.claims().setSubject(userId);

        //현재 시간과 날짜
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRE_TIME_IN_MILLISECONDS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateAccessToken(String userId) {

        //새로운 클레임 객체 생성, userId를 Subject설정
        Claims claims = Jwts.claims().setSubject(userId);

        //현재 시간과 날짜
        Date now = new Date();

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRE_TIME_IN_MILLISECONDS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Authentication getAuthentication(User user) {

        return new UsernamePasswordAuthenticationToken(user, "",
                Collections.emptyList());
    }

    public String getUserId(String token) {
        //Subject로 설정한 userId 가져오기
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody().getSubject();
    }
}

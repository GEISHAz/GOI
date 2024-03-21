package ssafy.GeniusOfInvestment.auth.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment.auth.dto.response.AccessTokenResponse;
import ssafy.GeniusOfInvestment.auth.service.AuthTokenService;

@Slf4j
@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthTokenService authTokenService;

    @PostMapping("/logout")
    public ResponseEntity<SuccessType> logout(@RequestHeader(value = "Authorization") final String accessToken) {
        System.out.println("access token : " + accessToken);
        // 엑세스 토큰으로 현재 Redis 정보 삭제
        authTokenService.removeRefreshToken(accessToken);

        return ResponseEntity.ok(SuccessType.LOGOUT_SUCCESSFULLY);
    }

    @PostMapping("/regenerate-token")
    public SuccessResponse<AccessTokenResponse> regenerateToken(@RequestHeader("Authorization") final String accessToken) {

        String newAccessToken = authTokenService.republishAccessToken(accessToken);
        if (!StringUtils.hasText(newAccessToken)) {
            throw new CustomBadRequestException(ErrorType.FAIL_TO_GENERATE_ACCESS_TOKEN);
        }
        AccessTokenResponse accessTokenResponse = AccessTokenResponse.of(newAccessToken);
        return SuccessResponse.of(SuccessType.NEW_ACCESS_TOKEN_GENERATED,accessTokenResponse);
    }
}

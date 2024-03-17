package ssafy.GeniusOfInvestment._common.jwt;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class JwtTokenService {

    private final TokenRepository tokenRepository;

    @Transactional
    public void saveTokenInfo(String memberId, String refreshToken, String accessToken) {
        tokenRepository.save(new SavedToken(memberId, accessToken, refreshToken));
    }
}

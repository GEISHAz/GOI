package ssafy.GeniusOfInvestment.common.jwt;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TokenRepository extends CrudRepository<SavedToken, String> {

    // accessToken으로 RefreshToken을 찾아온다.
    Optional<SavedToken> findByAccessToken(String accessToken);
}

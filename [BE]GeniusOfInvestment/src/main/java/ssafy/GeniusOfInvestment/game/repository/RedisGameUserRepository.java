package ssafy.GeniusOfInvestment.game.repository;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment._common.redis.GameUser;


@Repository
public class RedisGameUserRepository {
    private final String hashReference = "GameUser"; //DB의 테이블 역할
    @Resource(name = "redisTemplate") // 빨간 줄 무시
    private HashOperations<String, Long, GameUser> hashOperations;

    public GameUser getOneGameUser(Long id){
        return hashOperations.get(hashReference, id);
    }
    public void updateGameUser(GameUser user){
        hashOperations.put(hashReference, user.getUserId(), user);
    }
    public void deleteGameUser(Long id){
        hashOperations.delete(hashReference, id);
    }
}

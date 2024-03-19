package ssafy.GeniusOfInvestment.square.repository;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.HashOperations;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;

public class RedisUserRepository {

    private final String hashReference = "RedisUser";
    @Resource(name = "redisTemplate")
    private HashOperations<String, Long, RedisUser> hashOperations;

    public void updateUserStatusGameing(RedisUser user){
        hashOperations.putIfAbsent(hashReference, user.getUserId(), user);
    }
}

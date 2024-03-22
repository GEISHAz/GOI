package ssafy.GeniusOfInvestment.square_room.repository;

import jakarta.annotation.Resource;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment._common.redis.RedisUser;

@Repository
public class RedisUserRepository {

    private final String hashReference = "RedisUser";
    @Resource(name = "redisTemplate")
    private HashOperations<String, Long, RedisUser> hashOperations;

    public void saveUserStatusGameing(RedisUser user){
        hashOperations.put(hashReference, user.getUserId(), user);
    }

    public void updateUserStatusGameing(RedisUser user){
        hashOperations.putIfAbsent(hashReference, user.getUserId(), user);
    }

    public RedisUser getOneRedisUser(Long id){
        return hashOperations.get(hashReference, id);
    }

    public void deleteUser(RedisUser user){
        hashOperations.delete(hashReference, user.getUserId(), user);
    }

}


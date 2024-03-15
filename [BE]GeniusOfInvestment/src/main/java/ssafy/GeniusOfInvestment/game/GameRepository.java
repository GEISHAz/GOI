package ssafy.GeniusOfInvestment.game;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment.entity.redis.GameRoom;

@Repository
public class GameRepository {
    private final String hashReference = "GameRoom";
    @Resource(name = "redisTemplate") // 빨간 줄 무시
    private HashOperations<String, Long, GameRoom> hashOperations;

    public void saveGameRoom(GameRoom room){
        hashOperations.putIfAbsent(hashReference, room.getId(), room);
    }

    public GameRoom getOneGameRoom(Long id){
        return hashOperations.get(hashReference, id);
    }

    public void updateGameRoom(GameRoom room){
        hashOperations.put(hashReference, room.getId(), room);
    }
}

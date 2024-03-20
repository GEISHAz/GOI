package ssafy.GeniusOfInvestment.game.repository;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment._common.redis.GameRoom;

import java.util.Map;

@Repository
public class RedisGameRepository {
    private final String hashReference = "GameRoom"; //DB의 테이블 역할
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

    public Map<Long, GameRoom> getAllGameRooms(){
        return hashOperations.entries(hashReference);
    }

    public void deleteGameRoom(Long id){
        hashOperations.delete(hashReference, id);
    }
}

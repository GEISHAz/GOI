package ssafy.GeniusOfInvestment.game.repository;

import jakarta.annotation.Resource;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment._common.redis.MyTradingInfo;

import java.util.Map;

@Repository
public class RedisMyTradingInfoRepository {
    private final String hashReference = "MyTradingInfo"; //DB의 테이블 역할
    @Resource(name = "redisTemplate") // 빨간 줄 무시
    private HashOperations<String, Long, MyTradingInfo> hashOperations;

    public void saveMyTradingInfo(MyTradingInfo tradingInfo){
        hashOperations.putIfAbsent(hashReference, tradingInfo.getId(), tradingInfo);
    }

    public MyTradingInfo getOneMyTradingInfo(Long id){
        return hashOperations.get(hashReference, id);
    }

    public void updateMyTradingInfo(MyTradingInfo tradingInfo){
        hashOperations.put(hashReference, tradingInfo.getId(), tradingInfo);
    }

    public Map<Long, MyTradingInfo> getAllMyTradingInfo(){
        return hashOperations.entries(hashReference);
    }

    public void deleteMyTradingInfo(Long id){
        hashOperations.delete(hashReference, id);
    }
}

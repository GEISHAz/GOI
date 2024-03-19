package ssafy.GeniusOfInvestment.square.repository;

import jakarta.annotation.Resource;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment.entity.Room;
import ssafy.GeniusOfInvestment.redis.RedisUser;

import java.util.Optional;

@Repository
public interface SquareRepository extends JpaRepository<Room,Long> {

    @Override
    Optional<Room> findById(Long aLong);

}

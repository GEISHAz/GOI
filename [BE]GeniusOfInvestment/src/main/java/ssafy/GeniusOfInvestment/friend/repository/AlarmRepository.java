package ssafy.GeniusOfInvestment.friend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.GeniusOfInvestment._common.entity.Alarm;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query("SELECT a FROM Alarm a WHERE a.status = 0 AND a.user.id = :userId")
    List<Alarm> findAllByUserId(Long userId);
}

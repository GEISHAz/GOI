package ssafy.GeniusOfInvestment.friend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.GeniusOfInvestment._common.entity.Alarm;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
}

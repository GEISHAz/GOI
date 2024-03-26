package ssafy.GeniusOfInvestment.friend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.GeniusOfInvestment._common.entity.Alarm;
import ssafy.GeniusOfInvestment._common.entity.User;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {
    @Query("SELECT a FROM Alarm a WHERE a.status = 0 AND a.user.id = :userId")
    List<Alarm> findAllByUserId(Long userId);

    @Query("SELECT a FROM Alarm a WHERE a.user = :user AND a.from = :from")
    Optional<Alarm> findAlarmsByUserAndFrom(User user, User from);

    @Query("SELECT a FROM Alarm a WHERE a.user = :from AND a.from = :user")
    Optional<Alarm> findAlarmsByFromAndUser(User user, User from);
}

package ssafy.GeniusOfInvestment.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findBySocialId(String socialId);
    List<User> findAllByOrderByExpDesc();

    @Query("SELECT COUNT(*) + 1 AS rank FROM User u WHERE u.exp > (SELECT u2.exp FROM User u2 WHERE u2.id = :userId)")
    Long findRankByExp(@Param("userId") Long userId);

    boolean existsByNickName(String nickname);

    List<User> findAllByChannel(Channel channel);

    Optional<User> findByNickName(String nickName);
}

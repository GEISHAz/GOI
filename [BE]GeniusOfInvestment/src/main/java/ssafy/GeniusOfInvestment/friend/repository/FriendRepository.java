package ssafy.GeniusOfInvestment.friend.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment._common.entity.User;

public interface FriendRepository extends JpaRepository<Friend, Long> {

    @Query("SELECT f FROM Friend f WHERE f.user.id = :userId OR f.friend.id = :userId")
    List<Friend> findFriendByUserIdOrFriendId(Long userId);

    @Query("SELECT f FROM Friend f " +
            "WHERE (f.user = :userId AND f.friend = :fromId) " +
            "OR (f.user = :fromId AND f.friend = :userId)")
    Optional<Friend> findFriendsByUserAndFriend(User userId, User fromId);

}

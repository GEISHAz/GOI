package ssafy.GeniusOfInvestment.square_room.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.Room;

import java.util.Optional;

@Repository
public interface RoomRepository extends JpaRepository<Room,Long>,RoomRepositoryCustom {
    Room findFirstByChannelOrderByRoomNumDesc(Channel ch);
}

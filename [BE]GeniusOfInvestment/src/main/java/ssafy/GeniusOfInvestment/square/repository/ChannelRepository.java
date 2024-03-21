package ssafy.GeniusOfInvestment.square.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.Room;

import java.util.List;

public interface ChannelRepository extends JpaRepository<Channel, Long>,ChannelRepositoryCustom{
    List<Room> findAllById(Long id);
}

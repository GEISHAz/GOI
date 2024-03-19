package ssafy.GeniusOfInvestment.chatting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;

public interface ChatRecordRepository extends JpaRepository<ChatRecord, Long> {
}

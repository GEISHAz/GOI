package ssafy.GeniusOfInvestment.friend.repository;

import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;

public interface ChatRecordRepository extends JpaRepository<ChatRecord, Long> {
    @Query("SELECT cr FROM ChatRecord cr WHERE cr.chatId.id = :chatId")
    List<ChatRecord> findByChatId(@Param("chatId") Long chatId);
}

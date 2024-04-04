package ssafy.GeniusOfInvestment.friend.repository;

import io.lettuce.core.dynamic.annotation.Param;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;

public interface ChatRecordRepository extends JpaRepository<ChatRecord, Long> {
    @Query("SELECT cr FROM ChatRecord cr WHERE cr.chatId.id = :chatId ORDER BY cr.id DESC LIMIT 333")
    List<ChatRecord> findByChatId(@Param("chatId") Long chatId);

    @Query("SELECT cr FROM ChatRecord cr WHERE cr.sender = :nickName")
    List<ChatRecord> findBySender(@Param("nickName") String nickName);
}

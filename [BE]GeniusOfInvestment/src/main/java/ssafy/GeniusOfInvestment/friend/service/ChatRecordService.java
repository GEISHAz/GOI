package ssafy.GeniusOfInvestment.friend.service;

import java.util.Comparator;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;
import ssafy.GeniusOfInvestment.friend.dto.response.ChatRecordResponse;
import ssafy.GeniusOfInvestment.friend.repository.ChatRecordRepository;

@Service
@RequiredArgsConstructor
public class ChatRecordService {

    private final ChatRecordRepository chatRecordRepository;

    public List<ChatRecordResponse> getChatRecord(Long chatId) {
        List<ChatRecord> chatRecords = chatRecordRepository.findByChatId(chatId);
        chatRecords.sort(Comparator.comparing(ChatRecord::getId));
        return chatRecords.stream().map(ChatRecordResponse::from).toList();
    }
}

package ssafy.GeniusOfInvestment.friend.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;

@Getter
public class ChatRecordResponse {

    private final Long id;
    private final String message;
    private final String sender;

    @Builder
    private ChatRecordResponse(Long id,String message, String sender){
        this.id = id;
        this.message = message;
        this.sender = sender;
    }

    public static ChatRecordResponse from(ChatRecord chatRecord){
        return builder()
                .id(chatRecord.getId())
                .message(chatRecord.getMsg())
                .sender(chatRecord.getSender())
                .build();
    }
}

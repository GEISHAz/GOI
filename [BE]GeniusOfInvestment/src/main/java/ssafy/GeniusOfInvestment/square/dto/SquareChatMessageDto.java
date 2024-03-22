package ssafy.GeniusOfInvestment.square.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SquareChatMessageDto {

    public enum MessageType {
        ENTER, TALK
    }
    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지
}

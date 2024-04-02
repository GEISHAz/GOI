package ssafy.GeniusOfInvestment.friend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FriendChatMessageDto {

    public enum MessageType {
        ENTER, TALK, ACCEPT, SEND
    }
    private MessageType type; // 메시지 타입
    private String roomId; // 방번호
    private String sender; // 메시지 보낸사람
    private String message; // 메시지

    @Builder
    private FriendChatMessageDto(MessageType messageType, String roomId, String sender, String message){
        this.type = messageType;
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
    }

    public static FriendChatMessageDto of(MessageType messageType, String roomId, String sender, String message){
        return builder()
                .messageType(messageType)
                .roomId(roomId)
                .sender(sender)
                .message(message)
                .build();
    }
}

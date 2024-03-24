package ssafy.GeniusOfInvestment._common.stomp.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDto {

    public enum MessageType {
//        CREATE, QUIT,
        //Channel
        CHANNEL_ENTER, CHANNEL_EXIT, CHANNEL_CHAT,
        TIMER, STOCK_MARKET, READY, GAME_RESULT,
        ROOM_ENTER, ROOM_EXIT,
        FRIEND_CHAT

//        FRIEND_CHAT, GAME_CHAT,
//        START, END, GAME,
//        MOTION, SETTING,
//        ROOM_CUR_USERS, OPEN_CARD,
//        NEW_ROUND_SET, GAME_END_CAT_WIN, GAME_END_MOUSE_WIN,
//        MUTE_OFF, CHOICE_ALL_TURN, CAN_SEE_CARD, DELETE_CHEEZE_CARD, SHOW_JOB, DELETE_USER_CARDS, SEE_CARD
    }

    private MessageType type;
    private Object data;

    @Builder
    public MessageDto(MessageType type, Object data) {
        this.type = type;
        this.data = data;
    }
}

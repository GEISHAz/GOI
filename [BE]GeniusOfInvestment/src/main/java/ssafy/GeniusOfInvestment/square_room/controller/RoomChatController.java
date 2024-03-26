package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import ssafy.GeniusOfInvestment.square_room.dto.RoomChatMessageDto;

@RequiredArgsConstructor
@Controller
public class RoomChatController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("/room/chat/message/")
    public void message(RoomChatMessageDto roomChatMessageDto){
        messageSendingOperations.convertAndSend("/sub/room/chat/" + roomChatMessageDto.getRoomId(),roomChatMessageDto);
    }
}

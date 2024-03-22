package ssafy.GeniusOfInvestment.square.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import ssafy.GeniusOfInvestment.square.dto.SquareChatMessageDto;

@Controller
@RequiredArgsConstructor
public class SquareChatController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("/square/chat/message/")
    public void message(SquareChatMessageDto squareChatMessageDto){
        messageSendingOperations.convertAndSend("/sub/square/chat/" + squareChatMessageDto.getRoomId(),squareChatMessageDto);
    }
}

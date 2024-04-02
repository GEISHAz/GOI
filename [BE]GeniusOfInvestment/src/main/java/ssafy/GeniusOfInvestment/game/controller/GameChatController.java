package ssafy.GeniusOfInvestment.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import ssafy.GeniusOfInvestment.game.dto.GameChatMessageDto;

@RequiredArgsConstructor
@Controller
@Slf4j
public class GameChatController {

    private final SimpMessageSendingOperations messageSendingOperations;

    @MessageMapping("/game/chat/message")
    public void message(GameChatMessageDto gameChatMessageDto){
        log.info("////////////////////////////////////////"+gameChatMessageDto.getReceiver());
        messageSendingOperations.convertAndSend("/sub/game/chat/" + gameChatMessageDto.getRoomId(),gameChatMessageDto);
    }
}

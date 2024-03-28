package ssafy.GeniusOfInvestment.friend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import ssafy.GeniusOfInvestment.friend.dto.FriendChatMessageDto;
import ssafy.GeniusOfInvestment.friend.service.FriendService;

@RequiredArgsConstructor
@Controller
public class FriendChatController {

    private final SimpMessageSendingOperations messageSendingOperations;
    private final FriendService friendService;

    @MessageMapping("/friend/chat/message")
    public void message(FriendChatMessageDto friendChatMessageDto){

        //채팅을 저장하는 메서드
        System.out.println(friendChatMessageDto.getMessage());
        friendService.saveMessage(friendChatMessageDto);
        messageSendingOperations.convertAndSend("/sub/friend/chat/" + friendChatMessageDto.getRoomId(),friendChatMessageDto);
    }

}

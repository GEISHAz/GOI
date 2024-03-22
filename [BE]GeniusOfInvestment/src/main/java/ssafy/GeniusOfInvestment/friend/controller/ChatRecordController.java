package ssafy.GeniusOfInvestment.friend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment.friend.dto.request.ChatRecordRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.ChatRecordResponse;
import ssafy.GeniusOfInvestment.friend.service.ChatRecordService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatRecordController {

    private final ChatRecordService chatRecordService;

    @GetMapping("/list")
    public SuccessResponse<List<ChatRecordResponse>> getChatRecord(@RequestBody ChatRecordRequest chatRecordRequest){
        return SuccessResponse.of(SuccessType.GET_FRIEND_CHAT_INFO,chatRecordService.getChatRecord(chatRecordRequest));
    }
}

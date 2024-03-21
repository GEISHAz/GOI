package ssafy.GeniusOfInvestment.friend.controller;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment.friend.dto.request.SendFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.FriendListResponse;
import ssafy.GeniusOfInvestment.friend.service.AlarmService;
import ssafy.GeniusOfInvestment.friend.service.FriendService;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/friend")
public class FriendController {

    private final FriendService friendService;
    private final AlarmService alarmService;

    // 친구id, 닉네임, 방번호(friendListId) 반환
    @GetMapping("/{id}/list")
    public SuccessResponse<List<FriendListResponse>> getFriendList(@PathVariable(value = "id") Long userId){
        return SuccessResponse.of(SuccessType.GET_FRIEND_SUCCESSFULLY,friendService.getFriendList(userId));
    }

    @GetMapping("/send/invitation")
    public SuccessResponse<Void> sendFriendInvitation(@RequestBody SendFriendRequest sendFriendRequest){
        alarmService.sendFriendInvitation(sendFriendRequest);
        return SuccessResponse.from(SuccessType.SEND_FRIEND_INVITATION);
    }

    @GetMapping("/accept/{id}/invitation")
    public SuccessResponse<Void> acceptFriendInvitation(@PathVariable("id") Long alarmId){
        alarmService.acceptFriendInvitation(alarmId);
        return SuccessResponse.from(SuccessType.ACCEPT_FRIEND_INVITATION_SUCCESSFULLY);
    }

}

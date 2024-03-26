package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.square_room.dto.request.KickRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomPartInfo;
import ssafy.GeniusOfInvestment.square_room.dto.response.UserEnterMessageResponse;
import ssafy.GeniusOfInvestment.square_room.service.RoomService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/room")
public class RoomController {
    private final SimpMessageSendingOperations messageTemplate;
    private final RoomService roomService;

    //방 들어가기
    @PostMapping("/enter")
    public Map<String, String> enterRoom(@AuthenticationPrincipal User user, @RequestBody Room room){
        roomService.enterRoom(user,room);
        //websocket 들어감 보내주기
        messageTemplate.convertAndSend("/sub/room/chat/" + room.getId(),
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_ENTER)
                        .data(UserEnterMessageResponse
                                .builder()
                                .userId(user.getId())
                                .roomId(room.getId())
                                .chId(user.getChannel().getId())
                                .isReady(false)
                                .exp(user.getExp())
                                .nickName(user.getNickName())
                                .build())
                        .build());

        Map<String, String> json = new HashMap<>();
        json.put("msg", "방 입장 완료");
        return json;
    }

    //방 나가기
    @DeleteMapping("/exit/{id}")
    public Map<String, String> exitRoom(@AuthenticationPrincipal User user, @PathVariable("id") Long rId){
        List<RoomPartInfo> rInfo = roomService.exitRoom(user, rId);
        messageTemplate.convertAndSend("/sub/room/chat/" + rId,
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_EXIT)
                        .data(rInfo)
                        .build());

        Map<String, String> json = new HashMap<>();
        json.put("msg", "방 나가기 완료");
        return json;
    }

    @PostMapping("/kick")
    public Map<String, String> kickUser(@AuthenticationPrincipal User user, @RequestBody KickRequest kinfo){
        List<RoomPartInfo> rInfo = roomService.kickUser(user, kinfo.userId(), kinfo.roomId());
        messageTemplate.convertAndSend("/sub/room/chat/" + kinfo.roomId(),
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_KICK)
                        .data(rInfo)
                        .build());

        Map<String, String> json = new HashMap<>();
        json.put("msg", "유저 강퇴 완료");
        return json;
    }

//    @RequestMapping("/ready")
//    public void readyRoom(@AuthenticationPrincipal User user, @RequestBody Room room){
//        roomService.readyRoom(user,room);
//    }
//
//    @RequestMapping("/kick")
//    public void kickUser(@AuthenticationPrincipal User user, @RequestBody Room room){
//        roomService.kickUser(user,room);
//    }

}

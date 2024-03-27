package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.dto.ReadyResponse;
import ssafy.GeniusOfInvestment.game.dto.TurnResponse;
import ssafy.GeniusOfInvestment.square_room.dto.request.KickRequest;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomEnterRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomInfoResponse;
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
    public List<RoomPartInfo> enterRoom(@AuthenticationPrincipal User user, @RequestBody RoomEnterRequest enterInfo){
        log.info("RoomController enterRoom start");
        List<RoomPartInfo> rst = roomService.enterRoom(user, enterInfo);
        //websocket 들어감 보내주기
        messageTemplate.convertAndSend("/sub/room/chat/" + enterInfo.roomId(),
                MessageDto
                        .builder()
                        .type(MessageDto.MessageType.ROOM_ENTER)
                        .data(rst)
                        .build());
        return rst;
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

    @PutMapping("/ready/{id}")
    public Map<String, String> doingRoomReady(@AuthenticationPrincipal User user, @PathVariable("id") Long grId){
        int status = roomService.doingRoomReady(user, grId);
        Map<String, String> json = new HashMap<>();
        //status = 0이면 레디를 한것, status = -1이면 레디를 취소한 것
//        messageTemplate.convertAndSend("/sub/room/chat/" + grId,
//                MessageDto.builder()
//                        .type(MessageDto.MessageType.READY)
//                        .data(
//                                ReadyResponse.builder()
//                                        .userId(user.getId())
//                                        .ready(status == 0)
//                                        .build())
//                        .build());
        sendMsg(grId,
                ReadyResponse.builder()
                        .userId(user.getId())
                        .ready(status == 0)
                        .build(),
                MessageDto.MessageType.READY);
        json.put("msg", "레디 완료");
        return json;
    }

    public void sendMsg(Long grId, Object obj, MessageDto.MessageType type){
        messageTemplate.convertAndSend("/sub/room/chat/" + grId,
                MessageDto.builder()
                        .type(type)
                        .data(obj)
                        .build()); //웹소켓으로 게임에 참가한 모든 이용자들에게 게임 결과를 보낸다.
    }

}

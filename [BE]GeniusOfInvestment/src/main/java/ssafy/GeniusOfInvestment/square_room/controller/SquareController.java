package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomEnterRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.*;
import ssafy.GeniusOfInvestment.square_room.service.RoomService;
import ssafy.GeniusOfInvestment.square_room.service.SquareService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/square")
public class SquareController {

    private final RoomService roomService;
    private final SquareService squareService;
    private final SimpMessageSendingOperations messageTemplate;

    @PostMapping("/create") //방생성
    public SavedRoomResponse createRoom(@AuthenticationPrincipal User user, @RequestBody RoomCreateRequest info){
        log.info("SquareController createRoom start");
        log.info("user id값"+user.getId());
        return squareService.insertRoom(user, info);
    }

    @PostMapping("/fast") //빠른입장
    public SuccessResponse<Long> fastEnterRoom(@AuthenticationPrincipal User user){
        log.info("SquareController fastEnterRoom start");
        RoomEnterRequest res = squareService.fastEnter(user);
        log.info("SquareController fastEnterRoom end");
        return SuccessResponse.of(SuccessType.ROOM_ENTER_REQUEST_SUCCESSFULLY,res.roomId());
    }

    @GetMapping("/list/{channelId}") //방 목록
    public SuccessResponse<RoomListResponse> listRoom(@AuthenticationPrincipal User user, @PathVariable("channelId") Long channelId){
        log.info("SquareController listRoom in");
        log.info("user id값"+user.getId());
        return SuccessResponse.of(SuccessType.ROOM_LIST_CALLED_SUCCESSFULLY,squareService.listRoom(channelId));
    }

    @GetMapping("/channellist/{channelId}") //유저목록
    public SuccessResponse<List<SquareNowUser>> listUser(@AuthenticationPrincipal User user, @PathVariable("channelId") Long channelId){
        log.info("SquareController listUser in");
        return SuccessResponse.of(SuccessType.USER_LIST_CALLED_SUCCESSFULLY,squareService.listUser(channelId));
    }


}

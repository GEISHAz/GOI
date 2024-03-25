package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.square_room.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square_room.dto.response.RoomListResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.SavedRoomResponse;
import ssafy.GeniusOfInvestment.square_room.dto.response.SquareNowUser;
import ssafy.GeniusOfInvestment.square_room.dto.response.SquareRoom;
import ssafy.GeniusOfInvestment.square_room.service.SquareService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/square")
public class SquareController {

    private final SquareService squareService;

    @PostMapping("/create") //방생성
    public SavedRoomResponse createRoom(@AuthenticationPrincipal User user, @RequestBody RoomCreateRequest info){
        log.info("SquareService createRoom in");
        return squareService.insertRoom(user,info);
    }

    @PutMapping("/find") //방찾기
    public void searchRoom(@AuthenticationPrincipal User user, @RequestBody Long roomnum){
        log.info("SquareService searchRoom in");
        squareService.searchRoom(user,roomnum);
        log.info("SquareService searchRoom out");
    }

    @GetMapping("/list") //방 목록
    public RoomListResponse listRoom(@AuthenticationPrincipal User user, @RequestBody Long channelnum){
        log.info("SquareService listRoom in");
        return squareService.listRoom(channelnum);
    }

    @GetMapping("/channellist/{channelId}") //유저목록
    public List<SquareNowUser> listUser(@AuthenticationPrincipal User user, @PathVariable("channelId") Long channelId){
        log.info("SquareService listUser in");
        return squareService.listUser(channelId);
    }

}

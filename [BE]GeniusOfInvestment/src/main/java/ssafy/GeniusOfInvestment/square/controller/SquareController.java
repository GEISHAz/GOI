package ssafy.GeniusOfInvestment.square.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.square.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square.dto.response.SavedRoomResponse;
import ssafy.GeniusOfInvestment.square.dto.response.SquareRoom;
import ssafy.GeniusOfInvestment.square.service.SquareService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/square")
public class SquareController {

    private final SquareService squareService;

    @PostMapping("/create") //방생성
    public SavedRoomResponse createRoom(@AuthenticationPrincipal User user, @RequestBody RoomCreateRequest info){
        return squareService.insertRoom(user,info);
    }

    @PutMapping("/find") //방찾기
    public void searchRoom(@AuthenticationPrincipal User user, @RequestBody Long roomnum){
        squareService.searchRoom(user,roomnum);
    }

    @GetMapping("/list") //방 목록
    public List<SquareRoom> listRoom(@AuthenticationPrincipal User user, @RequestBody Long channelnum){
        return squareService.listRoom(channelnum);
    }
}

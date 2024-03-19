package ssafy.GeniusOfInvestment.square.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.square.dto.request.RoomCreateRequest;
import ssafy.GeniusOfInvestment.square.dto.response.SavedRoomResponse;
import ssafy.GeniusOfInvestment.square.service.SquareService;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/square")
public class SquareController {

    private final SquareService squareService;

    @PostMapping("/create")
    public SavedRoomResponse createRoom(@AuthenticationPrincipal User user, @RequestBody RoomCreateRequest info){
        return squareService.insertRoom(user,info);
    }



}

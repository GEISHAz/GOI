package ssafy.GeniusOfInvestment.square_room.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.entity.Room;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.square_room.service.RoomService;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;

    //방 들어가기
    @PostMapping("/enter")
    public void enterRoom(@AuthenticationPrincipal User user, @RequestBody Room room){
        roomService.enterRoom(user,room);
    }
//
//    @RequestMapping("/exit")
//    public void exitRoom(@AuthenticationPrincipal User user, @RequestBody Room room){
//        roomService.exitRoom(user,room);
//    }
//
//    @RequestMapping("/ready")
//    public void readyRoom(@AuthenticationPrincipal User user, @RequestBody Room room){
//        roomService.readyRoom(user,room);
//    }
//
//    @RequestMapping("/kick")
//    public void kickUser(@AuthenticationPrincipal User user, @RequestBody Room room){
//        roomService.kickUser(user,room);
//    }
//
}

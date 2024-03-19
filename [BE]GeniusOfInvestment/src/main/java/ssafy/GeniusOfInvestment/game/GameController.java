package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.game.dto.TurnResponse;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;
    private final SimpMessageSendingOperations messageTemplate;

    //게임 시작시 초기 주식 정보를 넘겨준다.
    @GetMapping("/start")
    public Map<String, String> getInitStockInfo(@AuthenticationPrincipal User user, @RequestParam("id") Long grId){
        TurnResponse rst = gameService.getInitStockInfo(user, grId);
        messageTemplate.convertAndSend("/alram/msg-to/" + grId, rst); //웹소켓으로 게임에 참가한 모든 이용자들에게 초기 주식 정보를 보낸다.
        Map<String, String> json = new HashMap<>();
        json.put("msg", "게임 시작 완료");
        return json;
    }

    //다음 턴 넘기기(참가한 모든 유저에 대한 평가 금액도 모두 함께 계산)
    @GetMapping("/next")
    public Map<String, String> getNextStockInfo(@AuthenticationPrincipal User user, @RequestParam("id") Long grId){
        return null;
    }
}

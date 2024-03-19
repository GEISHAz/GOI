package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.game.dto.StockInfoResponse;

@Slf4j
@RestController
@RequestMapping("/game")
@RequiredArgsConstructor
public class GameController {
    private final GameService gameService;

    @GetMapping("/start")
    public StockInfoResponse getInitStockInfo(@AuthenticationPrincipal User user, @RequestParam("id") Long grId){
        return null;
    }
}

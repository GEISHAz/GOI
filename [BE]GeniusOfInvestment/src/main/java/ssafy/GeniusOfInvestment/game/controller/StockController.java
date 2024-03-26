package ssafy.GeniusOfInvestment.game.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.redis.MyTradingInfo;
import ssafy.GeniusOfInvestment.game.dto.BuyInfoResponse;
import ssafy.GeniusOfInvestment.game.dto.BuySellRequest;
import ssafy.GeniusOfInvestment.game.dto.ChartResponse;
import ssafy.GeniusOfInvestment.game.service.StockService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/stock")
@RequiredArgsConstructor
public class StockController {
    private final StockService stockService;

    //나의 주식 거래 내역들
    @GetMapping("")
    public MyTradingInfo getTradingInfo(@AuthenticationPrincipal User user){
        return stockService.getTradingInfo(user);
    }

    //정보를 구매한다.
    @GetMapping("/info")
    public BuyInfoResponse buyInformation(@AuthenticationPrincipal User user, @RequestParam("id") Long grId,
                                          @RequestParam("item") String item,
                                          @RequestParam("level") int level){
        return stockService.buyInformation(user, grId, item, level);
    }

    //내가 구매한 정보 목록들
    @GetMapping("/infolist")
    public List<BuyInfoResponse> getMyOwnInfoList(@AuthenticationPrincipal User user, @RequestParam("id") Long grId){
        return stockService.getMyOwnInfoList(user, grId);
    }

    //종목별 차트 정보
    @GetMapping("/chart")
    public List<ChartResponse> getItemChart(@RequestParam("id") Long grId, @RequestParam("item") String item){
        return stockService.getItemChart(grId, item);
    }

    //주식 매수 기능
    @PutMapping("/buy")
    public MyTradingInfo buyStockItem(@AuthenticationPrincipal User user, @RequestBody BuySellRequest buyInfo){
        return stockService.buyStockItem(user, buyInfo.grId(), buyInfo.item(), buyInfo.share());
    }

    //주식 매도 기능
    @PutMapping("/sell")
    public MyTradingInfo sellStockItem(@AuthenticationPrincipal User user, @RequestBody BuySellRequest buyInfo){
        return stockService.sellStockItem(user, buyInfo.grId(), buyInfo.item(), buyInfo.share());
    }
}

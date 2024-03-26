package ssafy.GeniusOfInvestment.game.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Information;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.redis.*;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.game.dto.BuyInfoResponse;
import ssafy.GeniusOfInvestment.game.dto.ChartResponse;
import ssafy.GeniusOfInvestment.game.repository.InformationRepository;
import ssafy.GeniusOfInvestment.game.repository.RedisGameRepository;
import ssafy.GeniusOfInvestment.game.repository.RedisMyTradingInfoRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class StockService {
    private final RedisGameRepository gameRepository;
    private final InformationRepository informationRepository;
    private final RedisMyTradingInfoRepository myTradingInfoRepository;
    private final GameService gameService;

    public MyTradingInfo getTradingInfo(User user){
        return myTradingInfoRepository.getOneMyTradingInfo(user.getId());
    }

    public BuyInfoResponse buyInformation(User user, Long grId, String item, int level){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        List<Long> purchased = new ArrayList<>(); //이 게임에서 구매된 정보 목록들
        for(GameMarket mk : room.getMarket()){
            if(mk.getDependencyInfo() != null){
                purchased.add(mk.getDependencyInfo());
            }
        }

        GameUser gameUser = new GameUser();
        gameUser.setUserId(user.getId());
        int idx = room.getParticipants().indexOf(gameUser);
        GameUser mine = room.getParticipants().get(idx);
        int myPoint = mine.getPoint(); //현재 내가 보유 중인 포인트
        String content = "";
        for(GameMarket mk : room.getMarket()){
            if(mk.getItem().equals(item)){
                if(mk.getDependencyInfo() != null){ //이미 다른 사용자가 이 종목에 대해서 정보를 구매했다.
                    Optional<Information> info = informationRepository.findById(mk.getDependencyInfo());
                    if(info.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_INFO);
                    if(level == 1){
                        if(myPoint < 2) throw new CustomBadRequestException(ErrorType.INSUFFICIENT_POINT);
                        content = info.get().getLowLv();
                        myPoint -= 2;
                    }else {
                        if(myPoint < 4) throw new CustomBadRequestException(ErrorType.INSUFFICIENT_POINT);
                        content = info.get().getHighLv();
                        myPoint -= 4;
                    }
                    if(mine.getBuyInfos() == null){
                        mine.setBuyInfos(new ArrayList<>()); //빈 리스트를 선언
                    }
                    mine.getBuyInfos().add(MyOwnInfo.builder()
                                    .item(item)
                                    .infoId(mk.getDependencyInfo())
                                    .level(level)
                            .build());
                    mine.setPoint(myPoint);
                }else {
                    Long itemId = gameService.getIdForItem(item);
                    List<Information> infoList = informationRepository.findByAreaIdAndYearAndIdNotIn(itemId, room.getYear(), purchased);
                    Random random = new Random();
                    int randIdx = random.nextInt(infoList.size());
                    Information ranInfo = infoList.get(randIdx);
                    if(level == 1){
                        if(myPoint < 2) throw new CustomBadRequestException(ErrorType.INSUFFICIENT_POINT);
                        content = ranInfo.getLowLv();
                        myPoint -= 2;
                    }else {
                        if(myPoint < 4) throw new CustomBadRequestException(ErrorType.INSUFFICIENT_POINT);
                        content = ranInfo.getHighLv();
                        myPoint -= 4;
                    }
                    mk.setDependencyInfo(ranInfo.getId());
                    if(mine.getBuyInfos() == null){
                        mine.setBuyInfos(new ArrayList<>()); //빈 리스트를 선언
                    }
                    mine.getBuyInfos().add(MyOwnInfo.builder()
                                    .item(item)
                                    .infoId(ranInfo.getId())
                                    .level(level)
                            .build());
                    mine.setPoint(myPoint);
                }
                break;
            }
        }
        room.getParticipants().set(idx, mine);
        gameRepository.updateGameRoom(room);

        return BuyInfoResponse.builder()
                .item(item)
                .level(level)
                .year(room.getYear())
                .content(content)
                .build();
    }

    public List<BuyInfoResponse> getMyOwnInfoList(User user, Long grId){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        List<BuyInfoResponse> result = new ArrayList<>();
        GameUser gu = new GameUser();
        gu.setUserId(user.getId());
        int idx = room.getParticipants().indexOf(gu);
        if(idx == -1){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }
        GameUser mine = room.getParticipants().get(idx);
        for(MyOwnInfo own : mine.getBuyInfos()){
            Optional<Information> info = informationRepository.findById(own.getInfoId());
            if(info.isEmpty()) throw new CustomBadRequestException(ErrorType.NOT_FOUND_INFO);
            result.add(BuyInfoResponse.builder()
                            .item(own.getItem())
                            .level(own.getLevel())
                            .year(info.get().getYear())
                            .content(own.getLevel() == 1 ? info.get().getLowLv() : info.get().getHighLv())
                    .build());
        }
        return result;
    }

    public List<ChartResponse> getItemChart(Long grId, String item){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        GameMarket tmp = new GameMarket();
        tmp.setItem(item);
        int idx = room.getMarket().indexOf(tmp);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_STOCK_ITEM);
        GameMarket gm = room.getMarket().get(idx);
        List<Long> history = gm.getCost();
        int curYear = room.getYear(); //현재 년도

        List<ChartResponse> rst = new ArrayList<>();
        int year = curYear - history.size() + 1; //초기 시작년도
        for(Long value : history){
            rst.add(ChartResponse.builder()
                            .year(year)
                            .cost(value)
                    .build());
            year++;
        }
        return rst;
    }

    public MyTradingInfo buyStockItem(User user, Long grId, String item, int share){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        GameMarket tmp = new GameMarket();
        tmp.setItem(item);
        int idx = room.getMarket().indexOf(tmp);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_STOCK_ITEM);
        GameMarket gm = room.getMarket().get(idx); //사용자가 요청한 주식 정보를 찾는다.
        int size = gm.getCost().size();
        Long curCost = gm.getCost().get(size-1); //이 주식의 현재 한 주당 가격
        MyTradingInfo mine = myTradingInfoRepository.getOneMyTradingInfo(user.getId());
        if(mine == null) throw new CustomBadRequestException(ErrorType.NOT_FOUND_TRADINGINFO);
        Long balance = mine.getRemainVal(); //현재 투자할 수 있는 잔고

        if(balance < curCost * share){
            throw new CustomBadRequestException(ErrorType.INSUFFICIENT_BALANCE);
        }
        BreakDown bdtmp = new BreakDown();
        bdtmp.setItem(item);
        idx = mine.getBreakDowns().indexOf(bdtmp); //내 거래내역에서 해당 주식 종목을 찾는다.
        if(idx == -1) { //이 종목에 대해서 거래 내역이 없다.
            mine.getBreakDowns().add(BreakDown.builder()
                            .item(item)
                            .buyVal(curCost)
                            .shares(share)
                            .nowVal(curCost)
                            .roi(0)
                    .build());
        }else { //이 종목에 대해서 이미 거래 내역이 있다.
            BreakDown bd = mine.getBreakDowns().get(idx);
            Long lastTotal = bd.getBuyVal() * bd.getShares();
            Long myAvg = (lastTotal + (curCost*share)) / (share + bd.getShares());
            bd.setBuyVal(myAvg);
            bd.setShares(share + bd.getShares());
            //mine.getBreakDowns().set(idx, bd); //없어도 되지만 코드 가독성을 위해 추가??
        }
        mine.setInvestVal(mine.getInvestVal() + (curCost * share)); //이전 투자금액 + 이번에 투자한 주식 금액
        mine.setRemainVal(balance - (curCost * share)); //잔고에서 이번에 투자한 금액 빼기
        myTradingInfoRepository.updateMyTradingInfo(mine);
        return mine;
    }

    public MyTradingInfo sellStockItem(User user, Long grId, String item, int share){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        if(room == null){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_ROOM);
        }

        GameMarket tmp = new GameMarket();
        tmp.setItem(item);
        int idx = room.getMarket().indexOf(tmp);
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_STOCK_ITEM);
        GameMarket gm = room.getMarket().get(idx); //사용자가 요청한 주식 정보를 찾는다.
        int size = gm.getCost().size();
        Long curCost = gm.getCost().get(size-1); //이 주식의 현재 한 주당 가격
        MyTradingInfo mine = myTradingInfoRepository.getOneMyTradingInfo(user.getId());
        if(mine == null) throw new CustomBadRequestException(ErrorType.NOT_FOUND_TRADINGINFO);

        BreakDown bdtmp = new BreakDown();
        bdtmp.setItem(item);
        idx = mine.getBreakDowns().indexOf(bdtmp); //내 거래내역에서 해당 주식 종목을 찾는다.
        if(idx == -1) throw new CustomBadRequestException(ErrorType.NOT_FOUND_TRADINGINFO);

        BreakDown bd = mine.getBreakDowns().get(idx);
        int remainShare = bd.getShares() - share; //팔고 남은 주식 수
        if(remainShare == 0){ //이 종목에서 내가 가지고 있는 주식을 모두 다 판다.
            mine.getBreakDowns().remove(idx);
        }else {
            bd.setShares(remainShare);
        }
        mine.setInvestVal(mine.getInvestVal() - (curCost * share)); //이전 투자금액 - 이번에 매도한 주식 금액
        mine.setRemainVal(mine.getRemainVal() + (curCost * share)); //잔고에서 이번에 매도한 금액 더하기
        myTradingInfoRepository.updateMyTradingInfo(mine);
        return mine;
    }
}

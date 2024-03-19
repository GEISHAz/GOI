package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.game.dto.*;
import ssafy.GeniusOfInvestment.redis.GameRoom;
import ssafy.GeniusOfInvestment.redis.GameUser;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.*;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public TurnResponse getInitStockInfo(User user, Long grId){ //grId는 방 테이블의 아이디값
        GameRoom room = gameRepository.getOneGameRoom(grId);
        int cnt = 0;
        List<ParticipantInfo> parts = new ArrayList<>();
        for(GameUser guser : room.getParticipants()){
            if(guser.isManager() && !Objects.equals(guser.getUserId(), user.getId())){ //요청을 한 사용자가 방장이 아니다.
                throw new CustomBadRequestException(ErrorType.IS_NOT_MANAGER);
            }
            if(guser.isReady()){ //사용자가 레디를 눌렀다.
                cnt++;
            }
            Optional<User> unick = userRepository.findById(guser.getUserId());
            if(unick.isEmpty()){
                throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
            }
            parts.add(ParticipantInfo.builder()
                            .userId(guser.getUserId())
                            .userNick(unick.get().getNickName())
                            .totalCost(500000L)
                    .build()); //참가자들 정보를 저장
        }
        if(cnt < room.getParticipants().size()-1){ //방장을 제외한 전체 이용자가 아직 레디를 하지않았다.
            throw new CustomBadRequestException(ErrorType.NOT_YET_READY);
        }
        List<Items1> selectedOne = Stream.of(Items1.values()) //6개 중에서 4개 선택
                .limit(4)
                .toList();

        List<Items2> selectedTwo = Stream.of(Items2.values()) //4개 중에서 3개 선택
                .limit(3)
                .toList();

        List<StockInfoResponse> stockInfos = new ArrayList<>();
        selTwoItems(stockInfos, selectedTwo);
        selOneItems(stockInfos, selectedOne);
        //방 상태 바꾸기

        return TurnResponse.builder()
                .participants(parts)
                .stockInfo(stockInfos)
                .build();
    }

    public void selOneItems(List<StockInfoResponse> stockInfos, List<Items1> selectedOne){
        for(int i=0; i<4; i++){
            StockInfoResponse stk = new StockInfoResponse();
            StringBuilder sb = new StringBuilder();
            System.out.println(selectedOne.get(i).toString());
            sb.append("A");
            switch (selectedOne.get(i).toString()){
                case "FOOD":
                    sb.append(" 식품");
                    break;
                case "ENTER":
                    sb.append(" 엔터");
                    break;
                case "TELECOM":
                    sb.append(" 통신");
                    break;
                case "AIR":
                    sb.append(" 항공");
                    break;
                case "CONSTRUCT":
                    sb.append(" 건설");
                    break;
                case "BEAUTY":
                    sb.append(" 뷰티");
                    break;
            }
            stk.setItem(sb.toString());
            stk.setThisCost(createRandCost());
            stockInfos.add(stk);
        }
    }

    public void selTwoItems(List<StockInfoResponse> stockInfos, List<Items2> selectedTwo){
        for(int i=0; i<3; i++){
            System.out.println(selectedTwo.get(i).toString());
            switch (selectedTwo.get(i).toString()){
                case "BIO":
                    addTwoItems(stockInfos, "바이오");
                    break;
                case "IT":
                    addTwoItems(stockInfos, "IT");
                    break;
                case "CHEMICAL":
                    addTwoItems(stockInfos, "화학");
                    break;
                case "CAR":
                    addTwoItems(stockInfos, "자동차");
                    break;
            }
        }
    }

    public void addTwoItems(List<StockInfoResponse> stockInfos, String item){
        StockInfoResponse stk = new StockInfoResponse();
        StringBuilder sb = new StringBuilder();
        sb.append("A ");
        sb.append(item);
        stk.setItem(sb.toString());
        stk.setThisCost(createRandCost());
        stockInfos.add(stk);
        sb.setLength(0); //stringbuilder를 비운다.
        stk = new StockInfoResponse();
        sb.append("B ");
        sb.append(item);
        stk.setItem(sb.toString());
        stk.setThisCost(createRandCost());
        stockInfos.add(stk);
    }

    public long createRandCost(){
        int min = 3000;
        int max = 300001;

        // Random 객체를 생성합니다.
        Random random = new Random();

        // 범위 내에서 랜덤 숫자를 생성합니다.
        return (random.nextInt(max - min) + min) / 100;
    }

    public TurnResponse getNextStockInfo(User user, Long grId){
        return null;
    }
}

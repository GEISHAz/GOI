package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.game.dto.Items1;
import ssafy.GeniusOfInvestment.game.dto.Items2;
import ssafy.GeniusOfInvestment.redis.GameRoom;
import ssafy.GeniusOfInvestment.redis.GameUser;
import ssafy.GeniusOfInvestment.game.dto.StockInfoResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Random;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public List<StockInfoResponse> getInitStockInfo(User user, Long grId){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        int cnt = 0;
        for(GameUser guser : room.getParticipants()){
            if(guser.isManager() && !Objects.equals(guser.getUserId(), user.getId())){ //요청을 한 사용자가 방장이 아니다.
                throw new CustomBadRequestException(ErrorType.IS_NOT_MANAGER);
            }
            cnt++;
        }
        if(cnt < room.getParticipants().size()-1){ //방장을 제외한 전체 이용자
            throw new CustomBadRequestException(ErrorType.NOT_YET_READY);
        }
        List<Items1> selectedOne = Stream.of(Items1.values()) //6개 중에서 4개 선택
                .limit(4)
                .toList();

        List<Items2> selectedTwo = Stream.of(Items2.values()) //4개 중에서 3개 선택
                .limit(3)
                .toList();

        List<StockInfoResponse> stockInfos = new ArrayList<>();
        for(int i=0; i<4; i++){
            StockInfoResponse stk = new StockInfoResponse();
            StringBuilder sb = new StringBuilder();
            sb.append(selectedOne.get(i).toString());
            sb.append("A");
            stk.setItem(sb.toString());

        }
        return null;
    }

    public int createRandCost(){
        int min = 3000;
        int max = 300001;

        // Random 객체를 생성합니다.
        Random random = new Random();

        // 범위 내에서 랜덤 숫자를 생성합니다.
        return random.nextInt(max - min) + min;
    }
}

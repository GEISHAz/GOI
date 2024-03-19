package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.redis.GameRoom;
import ssafy.GeniusOfInvestment.redis.GameUser;
import ssafy.GeniusOfInvestment.game.dto.StockInfoResponse;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class GameService {
    private final GameRepository gameRepository;

    public StockInfoResponse getInitStockInfo(User user, Long grId){
        GameRoom room = gameRepository.getOneGameRoom(grId);
        int cnt = 0;
        for(GameUser guser : room.getParticipants()){
            if(guser.isManager() && !Objects.equals(guser.getUserId(), user.getId())){ //요청을 한 사용자가 방장이 아니다.
                throw new CustomBadRequestException(ErrorType.IS_NOT_MANAGER);
            }
            cnt++;
        }
        if(cnt < room.getParticipants().size()-1){
            throw new CustomBadRequestException(ErrorType.NOT_YET_READY);
        }

        return null;
    }
}

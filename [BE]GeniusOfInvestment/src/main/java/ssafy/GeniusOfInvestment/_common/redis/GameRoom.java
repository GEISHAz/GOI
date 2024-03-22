package ssafy.GeniusOfInvestment._common.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRoom implements Serializable {
    private Long id; //방의 아이디값(키값)
    private int remainTurn; //남은 턴수
    private int year;
    private List<GameUser> participants;
    private List<GameMarket> market; //현재 시장 상황
}

package ssafy.GeniusOfInvestment.redis;

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
    private List<GameUser> participants;
    private GameMarket market; //현재 시장 상황
}

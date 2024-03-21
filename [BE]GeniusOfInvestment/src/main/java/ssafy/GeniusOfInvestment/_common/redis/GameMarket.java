package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameMarket implements Serializable {
    private String item;
    private Long Cost;
    private Long dependencyInfo; //이 종목의 의존 정보(사용자가 정보를 구매했을 때 등록)
}

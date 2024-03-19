package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameMarket {
    private String item;
    private Long Cost;
}

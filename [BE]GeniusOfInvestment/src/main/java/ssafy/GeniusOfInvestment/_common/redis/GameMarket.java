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
}

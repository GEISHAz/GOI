package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameUser implements Serializable {
    private Long userId;
    private boolean isReady;
    private boolean isManager;
    private Long totalCost;
}

package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameUser {
    private Long userId;
    private boolean isReady;
    private boolean isManager;
    private Long totalCost;
}

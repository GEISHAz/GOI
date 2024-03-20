package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameUser implements Serializable {
    private Long userId;
    private boolean isReady;
    private boolean isManager;
    private int point;
    private List<Long> buyInfos;
    private Long totalCost;
}

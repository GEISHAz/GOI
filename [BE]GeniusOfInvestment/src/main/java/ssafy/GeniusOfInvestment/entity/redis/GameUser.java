package ssafy.GeniusOfInvestment.entity.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameUser {
    private Long userId;
    private boolean isSkip;
    private boolean isManager;
}

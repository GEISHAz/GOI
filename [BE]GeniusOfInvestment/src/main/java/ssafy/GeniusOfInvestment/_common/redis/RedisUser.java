package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RedisUser {

    private Long userId;

    //0 게임중 1 로그인 2 대기중
    private int status;
}

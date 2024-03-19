package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RedisUser implements Serializable {

    private Long userId;

    //0 게임중 1 로그인 2 대기중
    private int status;
}

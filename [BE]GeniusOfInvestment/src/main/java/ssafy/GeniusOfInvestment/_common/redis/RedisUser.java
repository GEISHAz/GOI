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

    //false == 대기중  // true == 게임중
    private boolean status;
}

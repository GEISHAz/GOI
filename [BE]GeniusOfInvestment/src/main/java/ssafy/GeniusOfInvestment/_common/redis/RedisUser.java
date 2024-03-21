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

    //0로그인 1대기중 2게임중
    private int status;
}

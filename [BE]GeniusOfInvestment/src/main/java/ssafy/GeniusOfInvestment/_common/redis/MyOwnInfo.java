package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyOwnInfo implements Serializable {
    String item; //종목명
    Long infoId; //Information 테이블의 아이디값
    int level; //내가 얻은 정보의 단계
}

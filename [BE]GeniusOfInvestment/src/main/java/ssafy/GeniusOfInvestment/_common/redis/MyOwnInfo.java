package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyOwnInfo implements Serializable {
    String item; //종목명
    Long infoId; //Information 테이블의 아이디값
    int level; //내가 얻은 정보의 단계

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MyOwnInfo myOwnInfo = (MyOwnInfo) o;
        return level == myOwnInfo.level && Objects.equals(infoId, myOwnInfo.infoId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(infoId, level);
    }
}

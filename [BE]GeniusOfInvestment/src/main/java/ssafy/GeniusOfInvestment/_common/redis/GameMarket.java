package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameMarket implements Serializable {
    private String item;
    private List<Long> Cost;
    private Long dependencyInfo; //이 종목의 의존 정보(사용자가 정보를 구매했을 때 등록)

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameMarket that = (GameMarket) o;
        return Objects.equals(item, that.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(item);
    }
}

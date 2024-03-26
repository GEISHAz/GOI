package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BreakDown implements Serializable {
    private String item;
    private Long buyVal; //샀을때 금액(내가 구매한 1주당 평균)
    private int shares; // 주식 수(몇 주)
    private Long nowVal;
    private int roi; //수익률

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BreakDown breakDown = (BreakDown) o;
        return Objects.equals(item, breakDown.item);
    }

    @Override
    public int hashCode() {
        return Objects.hash(item);
    }
}

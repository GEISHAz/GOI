package ssafy.GeniusOfInvestment.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BreakDown {
    private String item;
    private Long buyVal; //샀을때 금액
    private int shares; // 주식 수(몇 주)
    private Long nowVal;
    private int roi; //수익률
}

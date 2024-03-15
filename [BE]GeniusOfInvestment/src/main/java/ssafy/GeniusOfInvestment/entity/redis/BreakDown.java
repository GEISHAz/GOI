package ssafy.GeniusOfInvestment.entity.redis;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BreakDown {
    private String item;
    private Long buyVal;
    private int shares; // 주식 수(몇 주)
    private Long nowVal;
    private int roi;
}

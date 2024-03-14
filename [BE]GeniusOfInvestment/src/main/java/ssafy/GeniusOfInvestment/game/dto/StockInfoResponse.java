package ssafy.GeniusOfInvestment.game.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockInfoResponse {
    private String item;
    private Long lastCost;
    private Long thisCost;
    private int percent;
}

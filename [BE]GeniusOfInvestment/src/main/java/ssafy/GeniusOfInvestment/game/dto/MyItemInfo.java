package ssafy.GeniusOfInvestment.game.dto;

import lombok.Builder;

@Builder
public record MyItemInfo(int shares, Long remainVal, Long curCost) {
}

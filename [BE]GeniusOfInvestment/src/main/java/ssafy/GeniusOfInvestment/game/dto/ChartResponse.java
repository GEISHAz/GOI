package ssafy.GeniusOfInvestment.game.dto;

import lombok.Builder;

@Builder
public record ChartResponse(int year, Long cost) {
}

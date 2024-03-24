package ssafy.GeniusOfInvestment.game.dto;

import lombok.Builder;

@Builder
public record BuyInfoResponse(String item, int level, int year, String content) {
}

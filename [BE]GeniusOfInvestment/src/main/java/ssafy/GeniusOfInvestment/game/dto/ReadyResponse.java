package ssafy.GeniusOfInvestment.game.dto;

import lombok.Builder;

@Builder
public record ReadyResponse(Long userId, boolean ready, boolean start) {
}

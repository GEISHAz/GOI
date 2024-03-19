package ssafy.GeniusOfInvestment.game.dto;

import lombok.*;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TurnResponse {
    private List<ParticipantInfo> participants;
    private List<StockInfoResponse> stockInfo;
}

package ssafy.GeniusOfInvestment.game.dto;

import lombok.*;

import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TurnResponse {
    private int remainTurn; //남은 턴수
    private int year; //현재 년도
    private List<ParticipantInfo> participants;
    private List<StockInfoResponse> stockInfo;
}

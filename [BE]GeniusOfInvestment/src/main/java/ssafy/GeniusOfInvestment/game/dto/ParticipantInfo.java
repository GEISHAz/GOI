package ssafy.GeniusOfInvestment.game.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantInfo {
    private Long userId;
    private String userNick;
    private Long totalCost;
}

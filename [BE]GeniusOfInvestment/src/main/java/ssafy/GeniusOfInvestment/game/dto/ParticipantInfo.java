package ssafy.GeniusOfInvestment.game.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantInfo {
    private Long userId;
    private int profileId;
    private String userNick;
    private Long totalCost;
    private int point;
    private Long exp;
}

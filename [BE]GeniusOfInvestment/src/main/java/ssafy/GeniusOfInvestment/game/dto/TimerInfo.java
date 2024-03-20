package ssafy.GeniusOfInvestment.game.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class TimerInfo {
    private int remainingMin;
    private int remainingSec;
    private int remainingTime;
    private int totalTime;
}

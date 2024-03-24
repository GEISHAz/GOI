package ssafy.GeniusOfInvestment._common.redis;

import lombok.*;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameUser implements Serializable, Comparable<GameUser> {
    private Long userId;
    private boolean isReady;
    private boolean isManager;
    private int point;
    private List<Long> buyInfos;
    private Long totalCost;

    @Override
    public int compareTo(GameUser o) {
        return (int) (this.totalCost - o.totalCost);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GameUser gameUser = (GameUser) o;
        return Objects.equals(userId, gameUser.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId);
    }
}

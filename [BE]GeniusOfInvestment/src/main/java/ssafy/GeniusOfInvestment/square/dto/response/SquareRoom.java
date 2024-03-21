package ssafy.GeniusOfInvestment.square.dto.response;

import lombok.Builder;

@Builder
public record SquareRoom(
        Long id,
        String title,
        boolean isPublic,
        int userCount

) {
    public SquareRoom{

    }
}

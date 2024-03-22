package ssafy.GeniusOfInvestment.square_room.dto.response;

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

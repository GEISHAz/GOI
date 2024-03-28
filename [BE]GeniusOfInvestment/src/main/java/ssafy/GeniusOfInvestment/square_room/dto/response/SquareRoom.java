package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

@Builder
public record SquareRoom(
        Long id,
        int roomNum,
        String title,
        boolean isPrivate,
        int userCount

) {
    public SquareRoom{

    }
}

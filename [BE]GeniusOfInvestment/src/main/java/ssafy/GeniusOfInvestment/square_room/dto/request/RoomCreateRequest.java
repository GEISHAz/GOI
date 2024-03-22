package ssafy.GeniusOfInvestment.square_room.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RoomCreateRequest(
    @NotNull
    String title,
    boolean isPublic,
    String password,

    int status,
    @NotNull
    int fromYear,
    @NotNull
    int endYear,

    int turnNum,
    @NotNull
    Long channelId
){
    @Builder
    public RoomCreateRequest{

    }
}

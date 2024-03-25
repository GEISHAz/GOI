package ssafy.GeniusOfInvestment.square_room.dto.request;


import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record RoomCreateRequest(
    @NotNull
    String title,
    boolean isPrivate,
    String password,

    int status,
    @NotNull
    int startYear,
    @NotNull
    int endYear,

    @NotNull
    Long channelId
){
    @Builder
    public RoomCreateRequest{

    }
}

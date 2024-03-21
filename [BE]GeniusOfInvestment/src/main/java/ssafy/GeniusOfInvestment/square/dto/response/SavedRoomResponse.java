package ssafy.GeniusOfInvestment.square.dto.response;


import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public record SavedRoomResponse(
        Long roomnum,
    String title,
    boolean isPublic,
    String password,
    int status,
    int fromYear,
    int endYear,
    int turnNum,
    Long channelId
){
    @Builder
    public SavedRoomResponse {

    }
}

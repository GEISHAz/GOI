package ssafy.GeniusOfInvestment.square_room.dto.response;


import lombok.Builder;

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

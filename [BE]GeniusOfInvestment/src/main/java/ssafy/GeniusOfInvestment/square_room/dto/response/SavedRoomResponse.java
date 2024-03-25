package ssafy.GeniusOfInvestment.square_room.dto.response;


import lombok.Builder;

@Builder
public record SavedRoomResponse(
        Long roomnum,
    String title,
    boolean isPrivate,
    int status,
    int turnNum,
    Long channelId
){
    @Builder
    public SavedRoomResponse {

    }
}

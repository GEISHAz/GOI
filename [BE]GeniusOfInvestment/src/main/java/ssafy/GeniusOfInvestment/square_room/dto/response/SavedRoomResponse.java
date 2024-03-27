package ssafy.GeniusOfInvestment.square_room.dto.response;


import lombok.Builder;

import java.util.List;

@Builder
public record SavedRoomResponse(
        Long roomnum,
        String title,
        boolean isPrivate,
        int status,
        int turnNum,
        Long channelId,
        List<RoomPartInfo> userList
){

}

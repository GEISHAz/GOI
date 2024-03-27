package ssafy.GeniusOfInvestment.square_room.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record RoomInfoResponse(
        Long roomId,
        int status,  //0이면 통과했다
                    //1이면 비번걸렸다. 또는 틀렸다. 돌려준 roomId랑 비번 다시 보내라
                    //2이면 방이 가득찼다. 모달끄고 이제 그만불러라
                    //3이면 존재하지 않는다. 모달끄고 이제 그만불러라
        List<RoomPartInfo> data
) {
}

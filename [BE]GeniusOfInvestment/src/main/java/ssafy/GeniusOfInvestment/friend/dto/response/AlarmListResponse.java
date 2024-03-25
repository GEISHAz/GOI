package ssafy.GeniusOfInvestment.friend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment._common.entity.Alarm;

@Getter
@RequiredArgsConstructor
public class AlarmListResponse {
    private Long id;
    private String fromNickName;
    private Long fromId;

    @Builder
    private AlarmListResponse(Long id, String fromNickName, Long fromId){
        this.id = id;
        this.fromNickName = fromNickName;
        this.fromId = fromId;
    }

    public static AlarmListResponse of(Long id, String fromNickName, Long fromId){
        return builder()
                .id(id)
                .fromNickName(fromNickName)
                .fromId(fromId)
                .build();
    }

    public static AlarmListResponse from(Alarm alarm){
        return builder()
                .id(alarm.getId())
                .fromNickName(alarm.getFrom().getNickName())
                .fromId(alarm.getFrom().getId())
                .build();
    }
}

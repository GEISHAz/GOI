package ssafy.GeniusOfInvestment.friend.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment._common.entity.Alarm;

@Getter
@RequiredArgsConstructor
public class AlarmListResponse {
    private Long id;
    private String content;
    private Long from_id;

    @Builder
    private AlarmListResponse(Long id, String content, Long from_id){
        this.id = id;
        this.content = content;
        this.from_id = from_id;
    }

    public static AlarmListResponse of(Long id, String content, Long from_id){
        return builder()
                .id(id)
                .content(content)
                .from_id(from_id)
                .build();
    }

    public static AlarmListResponse from(Alarm alarm){
        return builder()
                .id(alarm.getId())
                .content(alarm.getContent())
                .from_id(alarm.getFrom().getId())
                .build();
    }
}

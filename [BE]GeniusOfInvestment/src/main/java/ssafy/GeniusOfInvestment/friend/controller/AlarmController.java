package ssafy.GeniusOfInvestment.friend.controller;


import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment.friend.dto.request.SendFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.AlarmListResponse;
import ssafy.GeniusOfInvestment.friend.service.AlarmService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/alarm")
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/{id}/list")
    public SuccessResponse<List<AlarmListResponse>>getAlarmList(@PathVariable(value = "id")Long userId){
        return SuccessResponse.of(SuccessType.GET_ALARM_LIST_SUCCESSFULLY,alarmService.getAlarmList(userId));
    }

}


package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.entity.Alarm;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.friend.dto.request.SendFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.AlarmListResponse;
import ssafy.GeniusOfInvestment.friend.repository.AlarmRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;

    @Transactional
    public void sendFriendInvitation(SendFriendRequest sendFriendRequest) {

        Optional<User> fromUser = userRepository.findById(sendFriendRequest.getId());
        if(fromUser.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }
        Optional<User> toUser = userRepository.findById(sendFriendRequest.getFriendId());
        if(toUser.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_INVITE_USER);
        }

        User tUser = toUser.get();
        User fUser = fromUser.get();
        String str = fUser.getNickName() + "님이 " + tUser.getNickName() +"님을 초대했습니다";

        Alarm alarm = Alarm.of(tUser,fUser,str,0);
        alarmRepository.save(alarm);
    }

    public List<AlarmListResponse> getAlarmList(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }
        List<Alarm> list = alarmRepository.findAllByUserId(userId);
        return list.stream().map(AlarmListResponse::from).toList();
    }

    public void acceptFriendInvitation(Long alarmId) {
        Optional<Alarm> alarm = alarmRepository.findById(alarmId);

        if(alarm.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_INVITATION);
        }
        alarm.get().updateStatus(1);
    }
}

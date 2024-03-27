package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.entity.Alarm;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.friend.dto.request.SendFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.AlarmListResponse;
import ssafy.GeniusOfInvestment.friend.repository.AlarmRepository;
import ssafy.GeniusOfInvestment.friend.repository.FriendRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final AlarmRepository alarmRepository;
    private final UserRepository userRepository;
    private final FriendRepository friendRepository;

    /*
    1. 요청을 보낼 친구가 이미 친구추가 되어있는지 확인
    2. 보낸 요청이 있는지 확인하고, 해당요청이 대기 중이면 오류 발생
    3. 보낸 요청이 이미 수락되었다면 오류 발생
    4. 보낸 요청이 거절되었다면 다시 대기 상태로 바꿈
    5. 보낸 요청이 없다면 요청 생성
     */
    @Transactional
    public void sendFriendInvitation(SendFriendRequest sendFriendRequest) {

        Optional<User> fromUser = userRepository.findById(sendFriendRequest.getId());
        if(fromUser.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }
        Optional<User> toUser = userRepository.findByNickName(sendFriendRequest.getFriendNickName());
        if(toUser.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_INVITE_USER);
        }

        Optional<Friend> friendsByUserAndFriend = friendRepository.findFriendsByUserAndFriend(fromUser.get(), toUser.get());
        if (friendsByUserAndFriend.isPresent()){
            throw new CustomBadRequestException(ErrorType.ALREADY_EXISTS_FRIEND);
        }

        Optional<Alarm> findAlarm = alarmRepository.findAlarmsByUserAndFrom(toUser.get(),fromUser.get());

        if(findAlarm.isPresent()){
            int status = findAlarm.get().getStatus();
            if(status == 0){
                throw new CustomBadRequestException(ErrorType.ALREADY_EXISTS_ALARM);
            }
            if(status == 1){
                throw new CustomBadRequestException(ErrorType.ALREADY_EXISTS_FRIEND);
            }
            if(status == 2){
                findAlarm.get().updateStatus(0);
            }
        }else{
            User tUser = toUser.get();
            User fUser = fromUser.get();

            Alarm alarm = Alarm.of(tUser,fUser,0);
            alarmRepository.save(alarm);
        }
    }

    public List<AlarmListResponse> getAlarmList(Long userId) {

        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }
        List<Alarm> list = alarmRepository.findAllByUserId(userId);
        return list.stream().map(AlarmListResponse::from).toList();
    }

    /*
    1. 요청 수락 시 이미 친구추가 되어있는지 확인
    2. 이미 친구추가 되어 있다면 오류 발생
    3. 해당 요청의 상태를 수락으로 바꿈
    4. 내가 상대방에게 보낸 요청이 있다면 그것 또한 수락으로 바꿈
    5. 수락 한 후 친구 테이블에 추가
     */
    @Transactional
    public void acceptFriendInvitation(Long alarmId) {

        Optional<Alarm> alarm = alarmRepository.findById(alarmId);
        if(alarm.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_INVITATION);
        }

        Alarm findAlarm = alarm.get();
        Optional<Friend> friendsByUserAndFriend = friendRepository.findFriendsByUserAndFriend(findAlarm.getUser(),findAlarm.getFrom());
        if(friendsByUserAndFriend.isPresent()){
            throw new CustomBadRequestException(ErrorType.ALREADY_EXISTS_FRIEND);
        }
        Optional<Alarm> findAlarmSendFromMe = alarmRepository.findAlarmsByFromAndUser(findAlarm.getUser(),findAlarm.getFrom());
        findAlarmSendFromMe.ifPresent(value -> value.updateStatus(1));
        findAlarm.updateStatus(1);
        Friend friend = Friend.of(findAlarm.getUser(),findAlarm.getFrom());
        friendRepository.save(friend);
    }

    /*
    요청 거절 시 해당 요청의 상태를 거절로 바꿈
     */
    @Transactional
    public void rejectFriendInvitation(Long alarmId) {
        Optional<Alarm> alarm = alarmRepository.findById(alarmId);

        if(alarm.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_INVITATION);
        }
        alarm.get().updateStatus(2);
    }
}

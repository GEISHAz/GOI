package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.entity.Alarm;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.friend.dto.FriendChatMessageDto;
import ssafy.GeniusOfInvestment.friend.dto.request.DeleteFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.FriendListResponse;
import ssafy.GeniusOfInvestment.friend.repository.AlarmRepository;
import ssafy.GeniusOfInvestment.friend.repository.ChatRecordRepository;
import ssafy.GeniusOfInvestment.friend.repository.FriendRepository;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final ChatRecordRepository chatRecordRepository;
    private final AlarmRepository alarmRepository;

    /*
    1. 내 아이디가 my_id라면 friend를 response에 추가
    2. 내 아이디가 friend_id라면 user를 response에 추가
     */
    public List<FriendListResponse> getFriendList(Long userId) {

        List<Friend> friendsByUserAndFriendUserIsMe = friendRepository.findFriendsByUserAndFriendUserIsMe(userId);
        List<FriendListResponse> friendListResponseListUserIsMe = friendsByUserAndFriendUserIsMe.stream()
                .map(friend -> FriendListResponse.of(friend.getId(),friend.getFriend().getId(),friend.getFriend().getNickName())).toList();
        List<Friend> friendsByUserAndFriendFriendIsMe = friendRepository.findFriendsByUserAndFriendFriendIsMe(userId);
        List<FriendListResponse> friendListResponseListFriendIsMe = friendsByUserAndFriendFriendIsMe.stream()
                .map(friend -> FriendListResponse.of(friend.getId(),friend.getUser().getId(),friend.getUser().getNickName())).toList();
        return Stream.concat(
                        friendListResponseListUserIsMe.stream(),
                        friendListResponseListFriendIsMe.stream()
                )
                .toList();
    }

    public void saveMessage(FriendChatMessageDto friendChatMessageDto) {

        Long chatRoomId = Long.valueOf(friendChatMessageDto.getRoomId());
        Optional<Friend> friendInfo = friendRepository.findById(chatRoomId);

        if (friendInfo.isEmpty()) {
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_FRIEND_ROOM);
        }

        ChatRecord chatRecord = ChatRecord.of(friendInfo.get(), friendChatMessageDto.getMessage(),
                friendChatMessageDto.getSender());
        chatRecordRepository.save(chatRecord);
    }

    @Transactional
    public void deleteFriend(Long userId, DeleteFriendRequest deleteFriendRequest) {
        Long friendListId = deleteFriendRequest.getFriendListId();
        Optional<Friend> friendInfo = friendRepository.findById(friendListId);
        if(friendInfo.isEmpty()){
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_FRIEND);
        }
        Friend friend = friendInfo.get();
        if(!friend.getUser().getId().equals(userId) && !friend.getFriend().getId().equals(userId)){
            throw new CustomBadRequestException(ErrorType.NOT_VALID_FRIEND_NUM);
        }
        Optional<Alarm> alarmsByUserAndFrom = alarmRepository.findAlarmsByUserAndFrom(friend.getUser(),
                friend.getFriend());
        Optional<Alarm> alarmsByFromAndUser = alarmRepository.findAlarmsByFromAndUser(friend.getUser(),
                friend.getFriend());

        alarmsByUserAndFrom.ifPresent(alarm -> alarm.updateStatus(2));
        alarmsByFromAndUser.ifPresent(alarm -> alarm.updateStatus(2));

        friendRepository.delete(friend);
    }
}

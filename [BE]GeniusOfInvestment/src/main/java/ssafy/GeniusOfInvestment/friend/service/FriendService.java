package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.friend.dto.FriendChatMessageDto;
import ssafy.GeniusOfInvestment.friend.dto.response.FriendListResponse;
import ssafy.GeniusOfInvestment.friend.repository.ChatRecordRepository;
import ssafy.GeniusOfInvestment.friend.repository.FriendRepository;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final ChatRecordRepository chatRecordRepository;

    public List<FriendListResponse> getFriendList(Long userId) {

        List<Friend> list = friendRepository.findFriendByUserIdOrFriendId(userId);
        return list.stream().map(FriendListResponse::from).toList();
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
}

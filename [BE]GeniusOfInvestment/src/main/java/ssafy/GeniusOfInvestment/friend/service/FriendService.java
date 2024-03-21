package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.friend.dto.request.DeleteFriendRequest;
import ssafy.GeniusOfInvestment.friend.dto.response.FriendListResponse;
import ssafy.GeniusOfInvestment.friend.repository.FriendRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    private final UserRepository userRepository;
    public List<FriendListResponse> getFriendList(Long userId) {

        List<Friend> list = friendRepository.findFriendByUserIdOrFriendId(userId);
        return list.stream().map(FriendListResponse::from).toList();
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
        friendRepository.delete(friend);
    }

}

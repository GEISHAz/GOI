package ssafy.GeniusOfInvestment.friend.service;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Friend;
import ssafy.GeniusOfInvestment.friend.dto.response.FriendListResponse;
import ssafy.GeniusOfInvestment.friend.repository.FriendRepository;

@Service
@RequiredArgsConstructor
public class FriendService {

    private final FriendRepository friendRepository;
    public List<FriendListResponse> getFriendList(Long userId) {

        List<Friend> list = friendRepository.findFriendByUserIdOrFriendId(userId);
        return list.stream().map(FriendListResponse::from).toList();
    }
}

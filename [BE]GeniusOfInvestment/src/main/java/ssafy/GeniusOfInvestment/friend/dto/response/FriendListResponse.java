package ssafy.GeniusOfInvestment.friend.dto.response;

import lombok.Builder;
import lombok.Getter;
import ssafy.GeniusOfInvestment._common.entity.Friend;

@Getter
public class FriendListResponse {

    private Long friendListId;
    private Long friendId;
    private String nickName;

    @Builder
    private FriendListResponse(Long friendListId, Long friendId, String nickName){
        this.friendListId = friendListId;
        this.friendId = friendId;
        this.nickName = nickName;
    }

    public static FriendListResponse of(Long friendListId, Long friendId, String nickName){
        return builder()
                .friendListId(friendListId)
                .friendId(friendId)
                .nickName(nickName)
                .build();
    }

    public static FriendListResponse from(Friend friend){
        return builder()
                .friendListId(friend.getId())
                .friendId(friend.getFriend().getId())
                .nickName(friend.getFriend().getNickName())
                .build();
    }

}

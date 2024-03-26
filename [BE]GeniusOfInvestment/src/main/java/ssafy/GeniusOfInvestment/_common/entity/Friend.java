package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Friend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "friend_list_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    //연관 관계의 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "my_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "friend_id")
    private User friend;

    //-----------------------------------------------------------------
    @OneToMany(mappedBy = "chatId", cascade = CascadeType.ALL)
    private List<ChatRecord> records = new ArrayList<>();

    @Builder
    private Friend (User user, User friend){
        this.user = user;
        this.friend = friend;
    }

    public static Friend of(User user, User friend){
        return builder()
                .user(user)
                .friend(friend)
                .build();
    }

    public void addMsg(ChatRecord msg){
        records.add(msg);
        msg.setChatId(this);
    }
}

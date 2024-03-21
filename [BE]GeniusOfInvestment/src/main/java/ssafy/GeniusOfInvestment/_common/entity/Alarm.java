package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    //연관 관계의 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    //단방향 관계만
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_id")
    private User from;

    private String content;

    @Builder
    private Alarm(User user, User from, String content){
        this.user = user;
        this.from = from;
        this.content = content;
    }

    public static Alarm of(User user, User from, String content){
        return builder()
                .user(user)
                .from(from)
                .content(content)
                .build();
    }
}

package ssafy.GeniusOfInvestment.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    @Column(nullable = false)
    private String title;

    private String password;

    //0이면 비밀방, 1이면 공개방
    @Column(columnDefinition = "TINYINT(1) default 1")
    private boolean isPublic;

    //0이면 대기, 1이면 게임중, 2이면 없어진 방
    @Column(columnDefinition = "TINYINT(2) default 0")
    private int status;

    private int fromYear;

    private int endYear;

    private int turnNum;

    //새로운 엔티티가 저장(추가)되기 직전에
    @PrePersist
    protected void onCreate() {
        turnNum = endYear - fromYear + 1;
    }

    //기존의 엔티티가 업데이트되기 직전에
//    @PreUpdate
//    protected void onUpdate() {
//
//    }
}

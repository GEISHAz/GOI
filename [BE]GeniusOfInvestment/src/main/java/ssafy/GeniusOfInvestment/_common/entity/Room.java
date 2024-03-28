package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, unique = true)
    private int roomNum;

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

    @Builder
    private Room(String title, String password, boolean isPublic, int status, int fromYear, int endYear, int turnNum){
        this.title = title;
        this.password = password;
        this.isPublic = isPublic;
        this.status = status;
        this.fromYear = fromYear;
        this.endYear = endYear;
        this.turnNum = turnNum;
    }

    public Room of(String title, String password, boolean isPublic, int status, int fromYear, int endYear, int turnNum){
        return builder()
                .title(title)
                .password(password)
                .isPublic(isPublic)
                .status(status)
                .fromYear(fromYear)
                .endYear(endYear)
                .turnNum(turnNum)
                .build();
    }

    //-----------------------------------------------------

    public void updateStatus(int status){
        this.status = status;
    }

    public void setChannel(Channel ch){
        this.channel = ch;
    }

    //새로운 엔티티가 저장(추가)되기 직전에
    @PrePersist
    protected void onCreate() {
        turnNum = endYear - fromYear + 1;
    }

}

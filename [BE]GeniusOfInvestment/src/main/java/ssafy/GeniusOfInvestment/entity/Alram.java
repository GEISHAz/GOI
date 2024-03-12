package ssafy.GeniusOfInvestment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Alram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alram_id", columnDefinition = "INT UNSIGNED")
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

    @Column(columnDefinition = "TINYINT(3) default 0")
    private int type;
}

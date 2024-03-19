package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Information {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "info_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    private String area;

    private int year;

    private String lowLv;

    private String highLv;

    private int roi;
}

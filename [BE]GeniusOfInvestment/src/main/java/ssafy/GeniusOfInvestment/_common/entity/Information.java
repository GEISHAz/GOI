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

    @Builder
    private Information(String area, int year, String lowLv, String highLv, int roi){
        this.area = area;
        this.year = year;
        this.lowLv = lowLv;
        this.highLv = highLv;
        this.roi = roi;
    }

    public Information of(String area, int year, String lowLv, String highLv, int roi){
        return builder()
                .area(area)
                .year(year)
                .lowLv(lowLv)
                .highLv(highLv)
                .roi(roi)
                .build();
    }
}

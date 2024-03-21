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

    //종목의 아이디값
    //(1: IT, 2: 자동차, 3: 바이오, 4: 통신, 5: 화학, 6: 엔터, 7: 식품, 8: 항공, 9: 건설, 10: 패션&뷰티)
    private Long areaId;

    private String area;

    private int year;

    //1단계 정보
    private String lowLv;

    //2단계 정보
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

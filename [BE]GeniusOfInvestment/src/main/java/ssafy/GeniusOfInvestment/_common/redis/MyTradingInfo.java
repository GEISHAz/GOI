package ssafy.GeniusOfInvestment._common.redis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyTradingInfo implements Serializable {
    private Long id; //사용자의 아이디값(키값)
    private Long marketVal; //전체 평가금액 = (investVal + remainVal)
    private Long remainVal; //투자하지 않고 남은 잔고
    private Long investVal; //전체 투자 금액
    private Long yoy; //작년 대비 값(-가능) ex)-27000(원)
    private List<BreakDown> breakDowns; //나의 종목별 거래내역
}

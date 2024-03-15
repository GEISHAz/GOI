package ssafy.GeniusOfInvestment.common.utils;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ErrorResponse {

    private String message;
    private String errorType;
    private String fieldName;


}

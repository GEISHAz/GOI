package ssafy.GeniusOfInvestment.common.handler;

import ssafy.GeniusOfInvestment.common.utils.ErrorResponse;

import java.util.Arrays;
import java.util.List;

public class ExceptionHandlerTool {
    public static List<ErrorResponse> makeErrorResponse(Exception e, String fieldName){
        return Arrays.asList(ErrorResponse.builder()
                .message(e.getMessage())
                .errorType(e.getClass().getSimpleName())
                .fieldName(fieldName)
                .build());
    }
}

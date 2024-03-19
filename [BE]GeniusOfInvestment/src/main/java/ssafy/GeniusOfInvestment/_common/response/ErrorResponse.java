package ssafy.GeniusOfInvestment._common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorResponse {

    private final int statusCode; //http status code
    private final String msg; //error message

    @Builder
    private ErrorResponse(int statusCode,  String msg) {
        this.statusCode = statusCode;
        this.msg = msg;
    }

    public static ErrorResponse from(ErrorType errorType) {
        return ErrorResponse.builder()
                .statusCode(errorType.getStatus().value())
                .msg(errorType.getMsg())
                .build();
    }

    public static ErrorResponse of(HttpStatus status, String msg) {
        return ErrorResponse.builder()
                .statusCode(status.value())
                .msg(msg)
                .build();
    }
}

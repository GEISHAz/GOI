package ssafy.GeniusOfInvestment._common.response;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ErrorRoomResponse {

    private final int statusCode; //http status code
    private final String msg; //error message
    private final Long roomId;

    @Builder
    private ErrorRoomResponse(int statusCode, String msg, Long roomId) {
        this.statusCode = statusCode;
        this.msg = msg;
        this.roomId = roomId;
    }

    public static ErrorRoomResponse from(ErrorType errorType) {
        return ErrorRoomResponse.builder()
                .statusCode(errorType.getStatus().value())
                .msg(errorType.getMsg())
                .build();
    }

    public static ErrorRoomResponse of(ErrorType errorType,Long roomId) {
        return ErrorRoomResponse.builder()
                .statusCode(errorType.getStatus().value())
                .msg(errorType.getMsg())
                .roomId(roomId)
                .build();
    }
}

package ssafy.GeniusOfInvestment._common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment._common.response.ErrorType;

@Getter
@RequiredArgsConstructor
public class CustomRoomEnterException extends RuntimeException {

    private final ErrorType errorType;
    private final Long roomId;

}

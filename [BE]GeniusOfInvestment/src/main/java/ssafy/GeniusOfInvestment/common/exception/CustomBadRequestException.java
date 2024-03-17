package ssafy.GeniusOfInvestment.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment._common.response.ErrorType;

@Getter
@RequiredArgsConstructor
public class CustomBadRequestException extends RuntimeException {

    private final ErrorType errorType;

}

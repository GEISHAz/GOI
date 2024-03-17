package ssafy.GeniusOfInvestment.common.exception;

import jakarta.validation.ConstraintViolationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.BadRequestException;
import org.hibernate.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import ssafy.GeniusOfInvestment._common.response.ErrorResponse;


@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler({BadRequestException.class, NoHandlerFoundException.class, TypeMismatchException.class})
    public ErrorResponse handleBadRequest(Exception e) {
        log.error("[BadRequestException]", e);
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, "잘못된 요청 입니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {
        log.error("[HttpRequestMethodNotSupportedException]", e);
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, "지원 하지 않는 Http Method 입니다.");
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ErrorResponse handleConstraintViolationException(ConstraintViolationException e) {
        log.error("[ConstraintViolationException]", e);
        return ErrorResponse.of(HttpStatus.BAD_REQUEST, e.getMessage());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(RuntimeException.class)
    public ErrorResponse handleRuntimeException(Exception e) {
        log.error("[RuntimeException]", e);
        return ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(CustomBadRequestException.class)
    protected ErrorResponse handleCustomBadRequestException(CustomBadRequestException e) {
        log.error("[CustomBadRequestException]");
        return ErrorResponse.from(e.getErrorType());
    }

    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(CustomServerErrorException.class)
    public ErrorResponse handleCustomServerErrorException(CustomServerErrorException e) {
        log.error("[CustomServerErrorException]", e);
        return ErrorResponse.from(e.getErrorType());
    }

}

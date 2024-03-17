package ssafy.GeniusOfInvestment._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorType {


    //도메인별로 ErrorType 정의, 에러 발생 시 errorCode,msg 반환

    //****************************User****************************//
    //ALREADY_EXIST_MEMBER_NICKNAME(HttpStatus.UNAUTHORIZED, "이미 존재하는 닉네임 입니다.")
    NOT_FOUND_USER(HttpStatus.UNAUTHORIZED,"등록된 사용자가 없습니다"),
    ALREADY_EXIST_MEMBER_NICKNAME(HttpStatus.UNAUTHORIZED, "이미 존재하는 닉네임 입니다."),

    //****************************Room****************************//


    //****************************Game****************************//

    ;


    private final HttpStatus status; //http status
    private final String msg; //error message

}

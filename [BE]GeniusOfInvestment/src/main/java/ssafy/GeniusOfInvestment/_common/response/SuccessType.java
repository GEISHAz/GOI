package ssafy.GeniusOfInvestment._common.response;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SuccessType {

    //도메인별로 SuccessType 정의, 성공시 msg, data 반환 

    //****************************User****************************//
    //SIGNUP_SUCCESSFULLY("회원 가입 성공"),
    LOGOUT_SUCCESSFULLY("로그아웃 성공"),
    UPDATE_USER_IMAGE_SUCCESSFULLY("프로필 이미지 수정 성공"),
    UPDATE_USER_NICKNAME_SUCCESSFULLY("닉네임 수정 성공"),
    UPDATE_USER_INFO_SUCCESSFULLY("유저 정보 업데이트 성공"),
    GET_USER_INFO_SUCCESSFULLY("유저 정보 조회 성공"),
    GET_RANK_INFO_SUCCESSFULLY("랭크 정보 조회 성공"),
    GET_USER_RANK_SUCCESSFULLY("유저 랭크 조회 성공"),
    CHECK_USER_NICKNAME_SUCCESSFULLY("닉네임 중복 체크 성공"),

    //****************************Room****************************//


    //****************************Game****************************//



    ;
    private final String msg; //success message

}

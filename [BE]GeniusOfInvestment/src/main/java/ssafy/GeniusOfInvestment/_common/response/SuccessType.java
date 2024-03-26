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
    NEW_ACCESS_TOKEN_GENERATED("엑세스 토큰 발급 성공"),

    //***************************Friend****************************//
    SEND_FRIEND_INVITATION("친구 초대 메시지 전송 성공"),
    GET_FRIEND_SUCCESSFULLY("친구 리스트 조회 성공"),
    ACCEPT_FRIEND_INVITATION_SUCCESSFULLY("친구 초대 수락 성공"),
    GET_FRIEND_CHAT_INFO("채팅 내역 조회 성공"),
    REJECT_FRIEND_INVITATION_SUCCESSFULLY("친구 초대 거절 성공"),
    DELETE_FRIEND_SUCCESSFULLY("친구 삭제 성공"),

    //***************************Alarm****************************//
    GET_ALARM_LIST_SUCCESSFULLY("알람 리스트 조회 성공"),

    //****************************Channel****************************//
    CHANNEL_LIST_CALLED_SUCCESSFULLY("채널 리스트 조회 성공"),

    //****************************Square****************************//
    ENTER_CHANNEL_SUCCESSFULLY("채널 입장 성공"),
    EXIT_CHANNEL_SUCCESSFULLY("채널 나가기 성공"),
    CREATE_ROOM_SUCCESSFULLY("방 생성 성공"),
    FAST_ENTER_SUCCESSFULLY("빠른입장 성공"),
    SEARCH_ROOM_SUCCESSFULLY("방 찾기 성공"),
    ROOM_LIST_CALLED_SUCCESSFULLY("방 목록 조회 성공"),
    USER_LIST_CALLED_SUCCESSFULLY("접속 중인 유저목록 조회 성공")
    //****************************Room****************************//



    //****************************Game****************************//



    ;
    private final String msg; //success message

}

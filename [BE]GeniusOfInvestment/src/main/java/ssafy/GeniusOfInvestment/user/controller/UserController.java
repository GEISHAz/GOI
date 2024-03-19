package ssafy.GeniusOfInvestment.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.response.SuccessResponse;
import ssafy.GeniusOfInvestment._common.response.SuccessType;
import ssafy.GeniusOfInvestment.user.dto.request.ExistNickNameRequestDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateUserInfoRequestDto;
import ssafy.GeniusOfInvestment.user.dto.response.RankInfoResponseDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateImageIdRequestDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateNickNameRequestDto;
import ssafy.GeniusOfInvestment.user.dto.response.UserInfoResponseDto;
import ssafy.GeniusOfInvestment.user.dto.response.UserRankResponseDto;
import ssafy.GeniusOfInvestment.user.service.UserService;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("{id}")
    public SuccessResponse<UserInfoResponseDto> getUser(@PathVariable(value = "id") Long userId) {
        return SuccessResponse.of(SuccessType.GET_USER_INFO_SUCCESSFULLY, userService.getUser(userId));
    }

    @PutMapping("/{id}/image-id")
    public SuccessResponse<Void> updateUserImageId(@PathVariable(value = "id") Long userId,
            @RequestBody UpdateImageIdRequestDto updateImageIdRequestDto) {
        userService.updateUserImageId(userId, updateImageIdRequestDto);
        return SuccessResponse.from(SuccessType.UPDATE_USER_IMAGE_SUCCESSFULLY);
    }

    @PutMapping("/{id}/nick-name")
    public SuccessResponse<Void> updateUserNickName(@PathVariable(value = "id") Long userId,
            @RequestBody UpdateNickNameRequestDto updateNickNameRequestDto) {
        userService.updateUserNickName(userId, updateNickNameRequestDto);
        return SuccessResponse.from(SuccessType.UPDATE_USER_NICKNAME_SUCCESSFULLY);
    }

    @PutMapping("/{id}/info")
    public SuccessResponse<Void> updateUserInfo(@PathVariable(value = "id") Long userId,
            @RequestBody UpdateUserInfoRequestDto updateNickNameRequestDto) {
        userService.updateUserInfo(userId, updateNickNameRequestDto);
        return SuccessResponse.from(SuccessType.UPDATE_USER_INFO_SUCCESSFULLY);
    }

    @PostMapping("/exist/nick-name")
    public SuccessResponse<Void> existNickName(@RequestBody ExistNickNameRequestDto existNickNameRequestDto){
        userService.checkNickName(existNickNameRequestDto);
        return SuccessResponse.from(SuccessType.CHECK_USER_NICKNAME_SUCCESSFULLY);
    }

    @GetMapping("/rank")
    public SuccessResponse<List<RankInfoResponseDto>> getRankInfo() {
        return SuccessResponse.of(SuccessType.GET_RANK_INFO_SUCCESSFULLY, userService.getRankInfo());
    }

    @GetMapping("/{id}/rank")
    public SuccessResponse<UserRankResponseDto> getRankByExp(@PathVariable(value = "id") Long userId) {
        return SuccessResponse.of(SuccessType.GET_USER_RANK_SUCCESSFULLY, userService.getUserRank(userId));
    }

    @GetMapping("/{id}/joinChannel")
    public SuccessResponse<UserRankResponseDto> joinChannel(@PathVariable(value = "id") Long userId) {
        userService.joinChannel(userId);
        return SuccessResponse.of(SuccessType.GET_USER_RANK_SUCCESSFULLY, userService.getUserRank(userId));
    }
}

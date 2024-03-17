package ssafy.GeniusOfInvestment.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.entity.User;
import ssafy.GeniusOfInvestment.user.dto.response.RankInfoResponseDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateImageIdRequestDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateNickNameRequestDto;
import ssafy.GeniusOfInvestment.user.dto.response.UserInfoResponseDto;
import ssafy.GeniusOfInvestment.user.dto.response.UserRankResponseDto;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> findBySocialId(String socialId) {
        return userRepository.findBySocialId(socialId);
    }

    @Transactional
    public Long saveSocialMember(User user) {
        return userRepository.save(user).getId();
    }

    @Transactional
    public void deleteMember(Optional<User> user) {
        if(user.isEmpty())
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        userRepository.save(user.get());
    }

    public UserInfoResponseDto getUser(Long userId) {
        return UserInfoResponseDto.from(findUser(userId));
    }

    @Transactional
    public void updateUserImageId(Long userId, UpdateImageIdRequestDto updateImageIdRequestDto) {
        User user = findUser(userId);
        log.info(updateImageIdRequestDto.getImageId()+" ///");
        user.updateImageId(updateImageIdRequestDto.getImageId());
    }

    @Transactional
    public void updateUserNickName(Long userId, UpdateNickNameRequestDto updateNickNameRequestDto) {
        User user = findUser(userId);
        String nickname = updateNickNameRequestDto.getNickName();
        validateDuplicatedNickname(nickname);
        user.updateNickName(updateNickNameRequestDto.getNickName());
    }

    public List<RankInfoResponseDto> getRankInfo() {
        return userRepository.findAllByOrderByExpDesc().stream().map(RankInfoResponseDto::from).collect(Collectors.toList());
    }

    public UserRankResponseDto getUserRank(Long userId) {
        User user = findUser(userId);
        return UserRankResponseDto.of(userRepository.findRankByExp(userId),user.getNickName(),user.getExp());
    }

    public User getAuthenticationUser(String userId) {
        return findUser(Long.parseLong(userId));
    }


    private User findUser(Long userId){
        return findById(userId)
                .orElseThrow(() -> new CustomBadRequestException(ErrorType.NOT_FOUND_USER));
    }

    private Optional<User> findById(Long userId) {
        return userRepository.findById(userId);
    }

    private void validateDuplicatedNickname(String nickname) {
        if (userRepository.existsByNickName(nickname)) {
            throw new CustomBadRequestException(ErrorType.ALREADY_EXIST_MEMBER_NICKNAME);
        }
    }
}

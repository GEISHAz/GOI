package ssafy.GeniusOfInvestment.user.service;

import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.user.dto.request.ExistNickNameRequestDto;
import ssafy.GeniusOfInvestment.user.dto.request.UpdateUserInfoRequestDto;
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
public class UserService implements UserDetailsService {

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

    @Transactional
    public void updateUserInfo(Long userId, UpdateUserInfoRequestDto updateNickNameRequestDto) {
        User user = findUser(userId);
        String nickname = updateNickNameRequestDto.getNickName();
        if(user.getNickName()==null || !user.getNickName().equals(nickname)){
            validateDuplicatedNickname(nickname);
            user.updateNickName(updateNickNameRequestDto.getNickName());
        }
        user.updateImageId(updateNickNameRequestDto.getImageId());
    }

    @Transactional
    public List<RankInfoResponseDto> getRankInfo() {

        List<User> users = userRepository.findAllByOrderByExpDesc();
        List<Long> ranks = userRepository.findAllRankByExp();
        return IntStream.range(0, users.size())
                .mapToObj(i -> RankInfoResponseDto.from(users.get(i), ranks.get(i)))
                .toList();
    }

    public UserRankResponseDto getUserRank(Long userId) {
        User user = findUser(userId);
        return UserRankResponseDto.of(userRepository.findRankByExp(user),user.getNickName(),user.getExp());
    }

    public User getAuthenticationUser(String userId) {
        log.info("토큰에서 뽑아온 userId: " + userId);
        return findUser(Long.parseLong(userId));
    }

    @Transactional
    public void checkNickName(Long userId, ExistNickNameRequestDto existNickNameRequestDto) {
        User user = findUser(userId);
        String nickname = existNickNameRequestDto.getNickName();
        if(!user.getNickName().equals(nickname)){
            validateDuplicatedNickname(existNickNameRequestDto.getNickName());
            user.updateNickName(nickname);
        }
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
            throw new CustomBadRequestException(ErrorType.ALREADY_EXIST_USER_NICKNAME);
        }
    }

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        Optional<User> foundUser = userRepository.findById(Long.valueOf(userId));
        //System.out.println(foundUser.get().getName());

        if(foundUser.isPresent()){
            log.info("loadUserByUsername메소드에서 유저 닉네임: " + foundUser.get().getNickName());
            return foundUser.get();
        }
        throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
    }
}

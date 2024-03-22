package ssafy.GeniusOfInvestment.channel.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment._common.exception.CustomBadRequestException;
import ssafy.GeniusOfInvestment._common.response.ErrorType;
import ssafy.GeniusOfInvestment.channel.dto.response.ChannelInfo;
import ssafy.GeniusOfInvestment.channel.repository.ChannelRepository;
import ssafy.GeniusOfInvestment.user.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    //채널목록
    public List<ChannelInfo> listAllChannel(User user) {

        List<ChannelInfo> list = new ArrayList<>();

        List<Channel> clist = channelRepository.findAll();
        if(clist.isEmpty())
            throw new CustomBadRequestException(ErrorType.CHANNEL_NOT_FOUND);

        for(Channel c : clist){
            list.add(
                    ChannelInfo
                            .builder()
                            .id(c.getId())
                            .userCount(c.getParticipants().size())
                            .build());
        }

        return list;
    }

    //채널 들어가기
    public void enterChannel(User user, Long channelId) {
        Optional<Channel> ochannel = channelRepository.findById(channelId);
        Channel channel;
        if(ochannel.isPresent())
            channel = ochannel.get();
        else
            throw new CustomBadRequestException(ErrorType.CHANNEL_NOT_FOUND);
        // 채널을 들어갈 수 있는지 부터 확인해야함
        if (channel.getParticipants().size() > 100)
            throw new CustomBadRequestException(ErrorType.CHANNEL_IS_FULL);

        User enterUser;
        // 채널을 들어가게되면 DB USER 수정 ch
        Optional<User> u = userRepository.findById(user.getId());
        if(u.isPresent()) {
             enterUser = u.get();
        }else{
            throw new CustomBadRequestException(ErrorType.NOT_FOUND_USER);
        }

        userRepository.save(enterUser);
    }
}

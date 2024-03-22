package ssafy.GeniusOfInvestment.channel.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment.channel.repository.ChannelRepository;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChannelService {

    private final ChannelRepository channelRepository;

}

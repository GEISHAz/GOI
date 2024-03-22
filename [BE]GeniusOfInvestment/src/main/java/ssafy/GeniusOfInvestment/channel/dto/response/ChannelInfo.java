package ssafy.GeniusOfInvestment.channel.dto.response;

import lombok.Builder;

@Builder
public record ChannelInfo(
        Long id,
        String channelName,
        int userCount
) {
}


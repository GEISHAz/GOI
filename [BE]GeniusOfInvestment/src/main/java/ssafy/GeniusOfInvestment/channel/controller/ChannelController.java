package ssafy.GeniusOfInvestment.channel.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import ssafy.GeniusOfInvestment._common.entity.Channel;
import ssafy.GeniusOfInvestment._common.entity.User;
import ssafy.GeniusOfInvestment.channel.dto.response.ChannelInfo;
import ssafy.GeniusOfInvestment.channel.service.ChannelService;

import java.util.List;

import static ssafy.GeniusOfInvestment._common.entity.QUser.user;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/channel")
public class ChannelController {

    private final ChannelService channelService;

    @GetMapping("/listc") //채널정보 싹다 주기
    public List<ChannelInfo> listChannel(){
        return channelService.listAllChannel();
    }

    @PostMapping("/enterc/{channelId}") //채널 들어가기
    public void enterChannel(@AuthenticationPrincipal User user, @PathVariable("channelId") Long channelId){
        channelService.enterChannel(user,channelId);
    }

}

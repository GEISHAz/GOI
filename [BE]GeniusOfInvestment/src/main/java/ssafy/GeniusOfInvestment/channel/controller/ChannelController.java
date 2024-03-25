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

    @PutMapping("/enterc/{channelId}") //채널 들어가기
    public void enterChannel(@AuthenticationPrincipal User user, @PathVariable("channelId") Long channelId){
        log.info("enterChannelController in");
        channelService.enterChannel(user,channelId);
        log.info("enterChannelController out");
    }

    @PostMapping("/exitc")// 채널 나가기 처리
    public void exitChannel(@AuthenticationPrincipal User user){
        log.info("exitChannelService in");
        log.info("id : "+user.getId());
        log.info("id : "+user.getNickName());
        log.info("id : "+user.getExp());
        log.info("id : "+user.getImageId());
        log.info("id : "+user.getSocialId());
        log.info("id : "+user.getChannel());
        log.info("exitChannelController in");
        channelService.exitChannel(user);
        log.info("exitChannelController out");
    }

}

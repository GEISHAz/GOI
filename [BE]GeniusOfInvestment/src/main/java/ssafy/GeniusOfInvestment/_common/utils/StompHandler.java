package ssafy.GeniusOfInvestment._common.utils;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

@Slf4j
@RequiredArgsConstructor
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {

    //private final JWTUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        log.info("========Websocket preSend start===========");

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT){ //웹소켓 통신시 jwt 검사
//            JwtCode checkToken = jwtUtil.validateToken(accessor.getFirstNativeHeader("Authorization"));
//            if(checkToken != JwtCode.ACCESS){
//                throw new InvalidTokenException("유효한 토큰이 아닙니다.");
//            }
        }

        return message;
    }
}

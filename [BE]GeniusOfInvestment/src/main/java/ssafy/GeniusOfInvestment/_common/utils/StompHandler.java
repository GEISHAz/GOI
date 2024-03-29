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
import ssafy.GeniusOfInvestment._common.jwt.JwtUtil;

@Slf4j
@RequiredArgsConstructor
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class StompHandler implements ChannelInterceptor {

    private final JwtUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel){
        log.info("========Websocket preSend start===========");

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor.getCommand() == StompCommand.CONNECT){ //웹소켓 통신시 jwt 검사
//            JwtCode checkToken = jwtUtil.validateToken(accessor.getFirstNativeHeader("Authorization"));
//            if(checkToken != JwtCode.ACCESS){
//                throw new InvalidTokenException("유효한 토큰이 아닙니다.");
//            }
            String token = String.valueOf(accessor.getNativeHeader("Authorization").get(0));
            token = token.replace("Bearer ", "");
            log.info("presend에서 웹소켓 통신시 받아온 token 값: " + token);

            try {
                String userId = jwtUtil.getUserId(token);
                log.info("웹소켓 통신시 추출한 유저 아이디: " + userId);
                accessor.addNativeHeader("User", userId);
            } catch (Exception e) {
                e.printStackTrace();
            }
//            catch (JWTVerificationException e) {
//                e.printStackTrace();
//            }
        }
        return message;
    }
}

package ssafy.GeniusOfInvestment._common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import ssafy.GeniusOfInvestment._common.utils.StompHandler;

import java.util.Arrays;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final StompHandler stompHandler;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/sub");
        config.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")
                .setAllowedOrigins("http://localhost:8080",
                        "http://localhost:5173", "http://127.0.0.1:5173",
                        "https://j10d202.p.ssafy.io",
                        "https://j10d202.p.ssafy.io:8080",
                        "https://j10d202.p.ssafy.io:8080/api",
                        "http://127.0.0.1:5500/"
                )
                .withSockJS();
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration){
        //웹소켓 통신시에 jwt 검사를 한다.
        registration.interceptors(stompHandler);
    }

//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config){
//        config.setApplicationDestinationPrefixes("/app"); // 초대 버튼을 눌렀을 때, prefix 로 붙는 부분
//        // 만약에 어떤 websocket controller가(데이터 처리를 할 필요가) 있다고 하면, /app/alram 으로 보내야 한다.
//        config.enableSimpleBroker("/alarm", "/message"); // 이 경로로 들어오면, message broker 가
//        // 해당 경로를 가로챈다.(구독자들에게 바로 메시지를 전달)
//    }
//
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry){
//        registry.addEndpoint("/reflect-socket").setAllowedOrigins(
//                "ws://172.30.1.15:8080", "ws://127.0.0.1:5501", "ws://127.0.0.1:8080",
//                        "http://127.0.0.1:8080", "http://127.0.0.1:5500",
//                         "http://localhost:5173/", "http://127.0.0.1:5501", "http://127.0.0.1:5173",
//                        "http://localhost:80", "http://127.0.0.1:80", "ws://localhost:8080",
//                        "https://i10d207.p.ssafy.io:8443/api", "https://i10d207.p.ssafy.io:8443/")
//                .withSockJS();
//    }



//    @Override
//    public void configureMessageBroker(MessageBrokerRegistry config) {
//        config.enableSimpleBroker("/sub"); // 클라이언트가 topic을 구독하고 메시지를 수신할 수 있도록 함
//        config.setApplicationDestinationPrefixes("/pub"); // 클라이언트가 메시지를 전송할 때 사용하는 목적지 prefix 설정
//    }
//
//    // STOMP endpoint 등록
//    @Override
//    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/ws-stomp").setAllowedOriginPatterns("*")
//                .withSockJS(); // Sockjs를 사용하기 위함 => 웹 소켓을 지원하지 않는 브라우저에서도 비슷한 경험을 제공하기 위해서
//    }
//
//    // 서버로 오는 메세지를 처리하는 채널을 구성 (클라이언트 인바운드 채널)
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler); // StompHandler를 클라이언트 인바운드 채널에 등록하여 STOMP 메시지 처리를 수행
//    }

}

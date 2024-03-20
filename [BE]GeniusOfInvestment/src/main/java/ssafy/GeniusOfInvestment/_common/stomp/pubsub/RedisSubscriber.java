package ssafy.GeniusOfInvestment._common.stomp.pubsub;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto.MessageType;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber {

    private final ObjectMapper objectMapper;
    private final SimpMessageSendingOperations messagingTemplate;


    // Redis에서 메시지가 발행(publish)되면 대기하고 있던 Redis Subscriber가 해당 메시지를 받아 처리
    public void sendMessage(String publishMessage) {
        log.info("send message to subscriber : {}", publishMessage);
        try {
            // dataDTO 객채로 맵핑
            MessageDto data = objectMapper.readValue(publishMessage, MessageDto.class);
            log.info("[서버] 메세지를 Dto에 맵핑 : {}", data.getType());
            
            if (MessageType.CHANNEL_ENTER.equals(data.getType()) ||
                    MessageType.CHANNEL_CHAT.equals(data.getType())||
                    MessageType.CHANNEL_EXIT.equals(data.getType())) {
                log.info("[채널 채팅] 구독자들에게 메시지 발송");

                //채널 채팅방을 구독한 클라이언트에게 메시지 발송
                messagingTemplate.convertAndSend("/sub/channel/chat/" + data.getRoomId(),data);
            }
















        } catch (Exception e) {
            log.error("메시지 처리 중 에러발생 Exception {}", e);
        }
    }
}
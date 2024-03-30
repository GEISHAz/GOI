package ssafy.GeniusOfInvestment.game.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment._common.stomp.dto.MessageDto;
import ssafy.GeniusOfInvestment.game.dto.TimerInfo;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class TimerService {
    private final SimpMessageSendingOperations messageTemplate;

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<Long> setTimer(Long grId) {
        //System.out.println(message);
        Timer timer = new Timer();
        TimerInfo tinfo = new TimerInfo(3, "0", 181000, 180000);

        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                log.info("타이머에서 남은 시간: " + tinfo.getRemainingTime());
                int remainMs = tinfo.getRemainingTime();
                remainMs -= 1000;
                int tsec = remainMs / 1000;
                int min = tsec / 60;
                int sec = tsec % 60;
                tinfo.setRemainingMin(min);
                tinfo.setRemainingSec(sec/10 > 0 ? String.valueOf(sec) : "0"+sec);
                tinfo.setRemainingTime(remainMs);
                messageTemplate.convertAndSend("/sub/room/chat/" + grId,
                        MessageDto.builder()
                                .type(MessageDto.MessageType.TIMER)
                                .data(tinfo)
                                .build());
                if(remainMs == 0) cancel(); //타이머 종료
            }
        };
//        TimerTask endTask = new TimerTask() {
//            @Override
//            public void run() {
//                task.cancel();
//                timer.cancel();
//            }
//        };

        int totalTime = 180000;

        // 1초 간격으로 작업 실행
        timer.scheduleAtFixedRate(task, 100, 1000);

        // 3분 후 TimerTask 실행 취소
        //timer.schedule(endTask, 180000, TimeUnit.MILLISECONDS.ordinal());
        return CompletableFuture.completedFuture(grId);
    }
}

package ssafy.GeniusOfInvestment.game;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import ssafy.GeniusOfInvestment.game.dto.TimerInfo;

import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class TimerService {
    private final SimpMessageSendingOperations messageTemplate;

    @Async("threadPoolTaskExecutor")
    public void setTimer(Long grId) {
        //System.out.println(message);
        Timer timer = new Timer();
        TimerInfo tinfo = new TimerInfo(3, 0, 180000, 180000);

        TimerTask task = new TimerTask() {
            @Override
            public void run() {
                int remainMs = tinfo.getRemainingTime();
                remainMs -= 1000;
                int tsec = remainMs / 1000;
                int min = tsec / 60;
                int sec = tsec % 60;
                tinfo.setRemainingMin(min);
                tinfo.setRemainingSec(sec);
                tinfo.setRemainingTime(remainMs);
                messageTemplate.convertAndSend("/alram/msg-to/" + grId, tinfo);
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
        timer.scheduleAtFixedRate(task, 0, 1000);

        // 3분 후 TimerTask 실행 취소
        //timer.schedule(endTask, 180000, TimeUnit.MILLISECONDS.ordinal());
    }
}

package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class ChatRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "record_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    //연관 관계의 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private Friend chatId;

    private String msg;


    @Builder
    private ChatRecord(Friend chatId, String msg){
        this.chatId = chatId;
        this.msg = msg;
    }

    private ChatRecord of(Friend chatId, String msg){
        return builder()
                .chatId(chatId)
                .msg(msg)
                .build();
    }

}

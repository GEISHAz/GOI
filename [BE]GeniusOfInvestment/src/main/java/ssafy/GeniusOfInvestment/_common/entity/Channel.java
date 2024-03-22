package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@RequiredArgsConstructor
public class Channel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "channel_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    private String chName;

    //-----------------------------------------------------

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<User> participants = new ArrayList<>();

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL)
    private List<Room> rooms = new ArrayList<>();

    @Builder
    private Channel(String chName){
        this.chName = chName;
    }

    public Channel of(String chName){
        return builder()
                .chName(chName)
                .build();
    }

    public void addRooms(Room room){
        rooms.add(room);
        room.setChannel(this);
    }

    public void addParticipants(User user){
        participants.add(user);
        user.setChannel(this);
    }
    public void setId(Long id){
        this.id = id;
    }
}

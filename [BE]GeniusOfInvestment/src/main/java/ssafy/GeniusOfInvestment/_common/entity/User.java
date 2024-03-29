package ssafy.GeniusOfInvestment._common.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

@Entity
@Getter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, unique = true)
    private String socialId;

    @ColumnDefault("0")
    private Long exp;

    @ColumnDefault("0")
    private int imageId;

    @Column(nullable = true, unique = true)
    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    //---------------------------------------------------------------------
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Alarm> alarms = new ArrayList<>();
    public void addAlarm(Alarm alarm){
        alarms.add(alarm);
        alarm.setUser(this);
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Friend> userList = new ArrayList<>();

    @OneToMany(mappedBy = "friend", cascade = CascadeType.ALL)
    private List<Friend> friendList = new ArrayList<>();

    public void addFriend(User toUser){ //친구 요청을 추가하는 메소드
        Friend friend = new Friend();
        friend.setFriend(toUser);
        friend.setUser(this);
        friendList.add(friend);
    }

    @Builder
    public User(String socialId, Long exp, int imageId, String nickName) {
        this.socialId = socialId;
        this.exp = exp;
        this.imageId = imageId;
        this.nickName = nickName;
    }

    public static User of(String socialId, Long exp, int imageId, String nickName) {
        return builder()
                .socialId(socialId)
                .exp(exp)
                .imageId(imageId)
                .nickName(nickName)
                .build();
    }

    public void updateImageId(Integer imageId) {
        this.imageId = imageId;
    }

    public void updateNickName(String nickName) {
        this.nickName = nickName;
    }

    public void updateChannel(Channel channel) { this.channel = channel; }

    public void deleteChannel(){ this.channel = null; }

    public void updateExp(Long exp) {
        this.exp = exp;
    }

    //===========================================================================
    //userDetails 오버라이딩
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.socialId;
    }

    @Override
    public String getUsername() {
        return this.nickName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

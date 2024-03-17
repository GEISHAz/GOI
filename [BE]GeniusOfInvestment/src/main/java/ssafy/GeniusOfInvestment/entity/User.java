package ssafy.GeniusOfInvestment.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import ssafy.GeniusOfInvestment._common.utils.UserRole;

import java.util.*;

@Entity
@Getter
@Setter
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, unique = true)
    private String socialId;

//    @Column(nullable = false, unique = true)
//    private String name;

    @ColumnDefault("0")
    private Long exp;

    @ColumnDefault("0")
    private int imageId;

    @Column(nullable = false, unique = true)
    private String nickName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channel_id")
    private Channel channel;

    //---------------------------------------------------------------------
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Alram> alrams = new ArrayList<>();
    public void addAlram(Alram alram){
        alrams.add(alram);
        alram.setUser(this);
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

    //----------------------------------------------------------------------
    @Transient
    private Set<UserRole> roles = new HashSet<>(Arrays.asList(UserRole.USER)); //user권한으로 초기값 지정

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}

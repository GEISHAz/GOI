package ssafy.GeniusOfInvestment._common.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 330423967L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser user = new QUser("user");

    public final ListPath<Alarm, QAlarm> alarms = this.<Alarm, QAlarm>createList("alarms", Alarm.class, QAlarm.class, PathInits.DIRECT2);

    public final QChannel channel;

    public final NumberPath<Long> exp = createNumber("exp", Long.class);

    public final ListPath<Friend, QFriend> friendList = this.<Friend, QFriend>createList("friendList", Friend.class, QFriend.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> imageId = createNumber("imageId", Integer.class);

    public final StringPath nickName = createString("nickName");

    public final StringPath socialId = createString("socialId");

    public final ListPath<Friend, QFriend> userList = this.<Friend, QFriend>createList("userList", Friend.class, QFriend.class, PathInits.DIRECT2);

    public QUser(String variable) {
        this(User.class, forVariable(variable), INITS);
    }

    public QUser(Path<? extends User> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QUser(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QUser(PathMetadata metadata, PathInits inits) {
        this(User.class, metadata, inits);
    }

    public QUser(Class<? extends User> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.channel = inits.isInitialized("channel") ? new QChannel(forProperty("channel")) : null;
    }

}


package ssafy.GeniusOfInvestment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;
import ssafy.GeniusOfInvestment._common.entity.ChatRecord;
import ssafy.GeniusOfInvestment._common.entity.Friend;


/**
 * QFriend is a Querydsl query type for Friend
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFriend extends EntityPathBase<Friend> {

    private static final long serialVersionUID = 1883688278L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFriend friend1 = new QFriend("friend1");

    public final QUser friend;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> isApprove = createNumber("isApprove", Integer.class);

    public final ListPath<ChatRecord, QChatRecord> records = this.<ChatRecord, QChatRecord>createList("records", ChatRecord.class, QChatRecord.class, PathInits.DIRECT2);

    public final QUser user;

    public QFriend(String variable) {
        this(Friend.class, forVariable(variable), INITS);
    }

    public QFriend(Path<? extends Friend> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFriend(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFriend(PathMetadata metadata, PathInits inits) {
        this(Friend.class, metadata, inits);
    }

    public QFriend(Class<? extends Friend> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.friend = inits.isInitialized("friend") ? new QUser(forProperty("friend"), inits.get("friend")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}


package ssafy.GeniusOfInvestment._common.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChatRecord is a Querydsl query type for ChatRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRecord extends EntityPathBase<ChatRecord> {

    private static final long serialVersionUID = 489328029L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChatRecord chatRecord = new QChatRecord("chatRecord");

    public final QFriend chatId;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath msg = createString("msg");

    public QChatRecord(String variable) {
        this(ChatRecord.class, forVariable(variable), INITS);
    }

    public QChatRecord(Path<? extends ChatRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChatRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChatRecord(PathMetadata metadata, PathInits inits) {
        this(ChatRecord.class, metadata, inits);
    }

    public QChatRecord(Class<? extends ChatRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.chatId = inits.isInitialized("chatId") ? new QFriend(forProperty("chatId"), inits.get("chatId")) : null;
    }

}


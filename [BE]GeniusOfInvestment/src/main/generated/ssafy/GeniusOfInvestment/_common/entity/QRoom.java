package ssafy.GeniusOfInvestment._common.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QRoom extends EntityPathBase<Room> {

    private static final long serialVersionUID = 330331055L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QRoom room = new QRoom("room");

    public final QChannel channel;

    public final NumberPath<Integer> endYear = createNumber("endYear", Integer.class);

    public final NumberPath<Integer> fromYear = createNumber("fromYear", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isPublic = createBoolean("isPublic");

    public final StringPath password = createString("password");

    public final NumberPath<Integer> roomNum = createNumber("roomNum", Integer.class);

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public final StringPath title = createString("title");

    public final NumberPath<Integer> turnNum = createNumber("turnNum", Integer.class);

    public QRoom(String variable) {
        this(Room.class, forVariable(variable), INITS);
    }

    public QRoom(Path<? extends Room> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QRoom(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QRoom(PathMetadata metadata, PathInits inits) {
        this(Room.class, metadata, inits);
    }

    public QRoom(Class<? extends Room> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.channel = inits.isInitialized("channel") ? new QChannel(forProperty("channel")) : null;
    }

}


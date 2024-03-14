package ssafy.GeniusOfInvestment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlram is a Querydsl query type for Alram
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlram extends EntityPathBase<Alram> {

    private static final long serialVersionUID = -775307685L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAlram alram = new QAlram("alram");

    public final StringPath content = createString("content");

    public final QUser from;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> type = createNumber("type", Integer.class);

    public final QUser user;

    public QAlram(String variable) {
        this(Alram.class, forVariable(variable), INITS);
    }

    public QAlram(Path<? extends Alram> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAlram(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAlram(PathMetadata metadata, PathInits inits) {
        this(Alram.class, metadata, inits);
    }

    public QAlram(Class<? extends Alram> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.from = inits.isInitialized("from") ? new QUser(forProperty("from"), inits.get("from")) : null;
        this.user = inits.isInitialized("user") ? new QUser(forProperty("user"), inits.get("user")) : null;
    }

}


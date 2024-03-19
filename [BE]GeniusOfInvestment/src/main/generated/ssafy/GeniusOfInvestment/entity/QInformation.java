package ssafy.GeniusOfInvestment.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import ssafy.GeniusOfInvestment._common.entity.Information;


/**
 * QInformation is a Querydsl query type for Information
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInformation extends EntityPathBase<Information> {

    private static final long serialVersionUID = 1471849844L;

    public static final QInformation information = new QInformation("information");

    public final StringPath area = createString("area");

    public final StringPath highLv = createString("highLv");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath lowLv = createString("lowLv");

    public final NumberPath<Integer> roi = createNumber("roi", Integer.class);

    public final NumberPath<Integer> year = createNumber("year", Integer.class);

    public QInformation(String variable) {
        super(Information.class, forVariable(variable));
    }

    public QInformation(Path<? extends Information> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInformation(PathMetadata metadata) {
        super(Information.class, metadata);
    }

}


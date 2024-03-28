package ssafy.GeniusOfInvestment.square_room.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import ssafy.GeniusOfInvestment.square_room.dto.response.SquareRoom;

import java.util.List;
import java.util.stream.Collectors;

import static ssafy.GeniusOfInvestment._common.entity.QRoom.room;

@RequiredArgsConstructor
public class RoomRepositoryImpl implements RoomRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public List<SquareRoom> findRoomCanEnter(Long channelId) {
        return jpaQueryFactory
                .select(
                        room.id,
                        room.title,
                        room.isPublic
                )
                .from(room)
                .where(room.isPublic.eq(true).and(room.channel.id.eq(channelId)))
                .fetch()
                .stream()
                .map(this::TupleToSquareroom)
                .collect(Collectors.toList());
    }
    private SquareRoom TupleToSquareroom(Tuple tuple){
        return SquareRoom
                .builder()
                .id(tuple.get(0,Long.class))
                .title(tuple.get(1,String.class))
                .isPrivate(Boolean.TRUE.equals(tuple.get(2, Boolean.class)))
                .build();
    }
}

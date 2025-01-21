import { Link } from 'react-router-dom';

export interface RoomProps {
  room: any;
  detailed?: boolean;
}
const Room = (props: RoomProps) => {
  const { detailed } = props;
  if (detailed) {
    return <RoomDetail {...props} />;
  } else {
    return <RoomSummary {...props} />;
  }
};
const RoomSummary = (props: RoomProps) => {
  const { room } = props;
  const imageUrl = room?.image?.replace('.jpg', '.225.webp');
  return (
    <Link to={`/room/${room.id}`}>
      <div className="flex">
        <img
          className="w-[225px] h-[225px] m-4 box-content"
          src={imageUrl}
          alt={room.description}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{room.name}</h2>
          <p>{room.description}</p>
        </div>
      </div>
    </Link>
  );
};
const RoomDetail = (props: RoomProps) => {
  const { room } = props;
  const imageUrl = room?.image?.replace('.jpg', '.225.webp');
  return (
    <Link to={`/room/${room.id}`}>
      <div className="flex">
        <img
          className="w-[225px] h-[225px] m-4 box-content"
          src={imageUrl}
          alt={room.description}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{room.name}</h2>
          <p>{room.description}</p>
          <pre>{JSON.stringify(room, null, 2)}</pre>
        </div>
      </div>
    </Link>
  );
};

export default Room;

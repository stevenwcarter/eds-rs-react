import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
    <div className="flex flex-col">
      <h1 className="text-5xl">{room.name}</h1>
      <div className="flex">
        <img
          className="w-[225px] h-[225px] m-4 box-content"
          src={imageUrl}
          alt={room.description}
        />
        <div className="flex flex-col">
          <p>{room.description}</p>
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-36 m-3 text-center self-start"
            to={`/hotel/${room.hotel_id}`}
          >
            <FontAwesomeIcon className="mx-2" icon={faArrowLeft} />
            Back to Hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Room;

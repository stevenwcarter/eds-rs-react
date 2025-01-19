import { Link } from 'react-router-dom';
import { ROOMS_FOR_HOTEL_ID } from '../queries';
import { useQuery } from '@apollo/client';
import Room from './Room';

export interface HotelProps {
  hotel: any;
  detailed?: boolean;
}
const Hotel = (props: HotelProps) => {
  const { detailed } = props;
  if (detailed) {
    return <HotelDetail {...props} />;
  } else {
    return <HotelSummary {...props} />;
  }
};
const HotelSummary = (props: HotelProps) => {
  const { hotel } = props;
  const imageUrl = hotel.image.replace('.jpg', '.150.webp');
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <div className="flex">
        <img
          width="150"
          height="150"
          className="w-[150px] h-[150px] m-4 box-content"
          src={imageUrl}
          alt={hotel.description}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{hotel.name}</h2>
          <p>{hotel.description}</p>
        </div>
      </div>
    </Link>
  );
};
const HotelDetail = (props: HotelProps) => {
  const { hotel } = props;
  const { data: roomData } = useQuery(ROOMS_FOR_HOTEL_ID, { variables: { id: hotel.id } });
  const roomCount = roomData?.search?.total || 0;
  const rooms = roomData?.search?.data?.map((r: any) => JSON.parse(r)) || [];
  const imageUrl = hotel.image.replace('.jpg', '.150.webp');
  return (
    <div className="flex flex-col">
      <div className="flex">
        <img
          width="150"
          height="150"
          className="w-[150px] h-[150px] m-4 box-content"
          src={imageUrl}
          alt={hotel.description}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{hotel.name}</h2>
          <p>{hotel.description}</p>
          <span>Rooms: {roomCount}</span>
        </div>
      </div>
      <div className="flex flex-col ml-40">
        {rooms.map((r: any) => (
          <Room room={r} key={r.id} />
        ))}
      </div>
    </div>
  );
};

export default Hotel;

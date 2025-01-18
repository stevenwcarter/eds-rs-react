import { Link } from 'react-router-dom';
import { ROOMS_FOR_HOTEL_ID } from '../queries';
import { useQuery } from '@apollo/client';

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
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <div className="flex">
        <img
          className="w-[150px] h-[150px] m-4 box-content"
          src={hotel.image}
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
  return (
    <Link to={`/hotel/${hotel.id}`}>
      <div className="flex">
        <img
          className="w-[150px] h-[150px] m-4 box-content"
          src={hotel.image}
          alt={hotel.description}
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{hotel.name}</h2>
          <p>{hotel.description}</p>
          <span>Rooms: {roomCount}</span>
          <pre>{JSON.stringify(rooms, null, 2)}</pre>
        </div>
      </div>
    </Link>
  );
};

export default Hotel;

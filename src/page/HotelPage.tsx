import { useParams } from 'react-router';
import { HOTEL_BY_ID } from '../queries';
import { useQuery } from '@apollo/client';
import Hotel from '../components/Hotel';

export const HotelPage = () => {
  const { id } = useParams();
  const { data } = useQuery(HOTEL_BY_ID, { variables: { id } });
  const hotel = JSON.parse(data?.search?.data[0] || '{}');
  return (
    <div>
      <div>Hotel Page :) {id}</div>
      <pre className="bg-gray-100 text-gray-700 p-4 rounded-md">
        {JSON.stringify(hotel, null, 2)}
      </pre>
      <Hotel detailed hotel={hotel} />
    </div>
  );
};
export default HotelPage;

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
      <Hotel detailed hotel={hotel} />
    </div>
  );
};
export default HotelPage;

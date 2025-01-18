import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { ROOM_BY_ID } from '../queries';
import Room from '../components/Room';

export const RoomPage = () => {
  const { id } = useParams();
  const { data } = useQuery(ROOM_BY_ID, { variables: { id } });
  const room = JSON.parse(data?.search?.data[0] || '{}');
  return (
    <div>
      <Room detailed room={room} />
    </div>
  );
};
export default RoomPage;

import { useQuery } from '@apollo/client';
import Hotel from '../components/Hotel';
import { HOTEL_LIST_QUERY } from '../queries';

export const Index = () => {
  const { data } = useQuery(HOTEL_LIST_QUERY);

  const hotels = data?.search?.data?.map((e: any) => JSON.parse(e)) || [];

  return (
    <>
      {hotels.map((h: any) => (
        <div key={h.id} className="m-4">
          <Hotel hotel={h} />
        </div>
      ))}
    </>
  );
};

export default Index;

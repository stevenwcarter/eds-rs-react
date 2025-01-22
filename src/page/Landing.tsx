import { Link } from 'react-router-dom';
import Typeahead from '../components/Typeahead';
import { useApolloClient } from '@apollo/client';
import { PEOPLE_TYPEAHEAD_SEARCH } from '../queries';

const LINK_STYLES = 'underline cursor-pointer hover:bg-white hover:text-black';

export const Landing = () => {
  const client = useApolloClient();
  const emailSearchFunction = async (email: string): Promise<string[]> => {
    const results = await client.query({ query: PEOPLE_TYPEAHEAD_SEARCH, variables: { email } });

    console.log(results);
    if (!results || !results.data || !results.data.search || results.data.search.total === 0) {
      return [];
    }

    return results.data.search.data.map((r: any) => JSON.parse(r)).map((r: any) => r.email);
    // todo
  };
  return (
    <div>
      <h1 className="text-3xl">AEM Rockstar Submission 2025</h1>
      <h2 className="text-2xl">Steven Carter</h2>
      <h3 className="text-xl">EDS Search Utility</h3>
      <p className="mt-4">
        I have previously written about the EDS Search Utility in my{' '}
        <a
          className={LINK_STYLES}
          href="https://www.bounteous.com/insights/2024/09/04/introducing-our-search-utility-edge-delivery-services/"
        >
          blog post
        </a>{' '}
        as well as during a Thursday Frequency meeting.
      </p>
      <p className="mt-4">
        This application serves to demonstrate several of the capabilities of the search utility, to
        better show how it can be useful for prototyping or building production-ready sites.
      </p>
      <div className="flex flex-col">
        <div className="flex m-4">
          <div className="min-w-80">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded min-w-36 m-3 text-center items-center justify-center self-center"
              to="/hotels"
            >
              Hotel Site
            </Link>
          </div>
          <p>
            This demonstrates how a hospitality site could store all the details about their various
            properties, rooms at those properties, and amenities for those rooms within a
            spreadsheet and still deliver a performant site even with hundreds of rooms. The hotel
            data can be seen here:{' '}
            <a
              target="_blank"
              className={LINK_STYLES}
              href="https://main--eds-rs-2025--stevenwcarter.aem.live/data.json?sheet=hotels"
            >
              Hotel Sheet
            </a>{' '}
            and the room data can be seen here:{' '}
            <a
              target="_blank"
              className={LINK_STYLES}
              href="https://main--eds-rs-2025--stevenwcarter.aem.live/data.json?sheet=rooms"
            >
              Room Sheet
            </a>
          </p>
        </div>
        <div className="flex m-4">
          <div className="w-80">
            <Typeahead
              className="text-white font-bold py-4 px-4 rounded w-full box-border text-center items-center justify-center self-center"
              searchFunction={emailSearchFunction}
            />
          </div>
          <p>
            This demonstrates typeahead running against an spreadsheet with 10,000 records. There
            are around 10 fields in the spreadsheet, but this search only searches against one field
            and only returns results from that field. This demonstrates the speed of the search
            capabilities, as well as the efficiency of the data transfer size possible with this
            tool.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;

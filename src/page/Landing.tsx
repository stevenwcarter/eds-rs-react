export const Landing = () => {
  return (
    <div>
      <h1 className="text-3xl">AEM Rockstar Submission 2025</h1>
      <h2 className="text-2xl">Steven Carter</h2>
      <h3 className="text-xl">EDS Search Utility</h3>
      <p className="mt-4">
        I have previously written about the EDS Search Utility in my{' '}
        <a
          className="underline cursor-pointer hover:bg-white hover:text-black"
          href="https://www.bounteous.com/insights/2024/09/04/introducing-our-search-utility-edge-delivery-services/"
        >
          blog post
        </a>{' '}
        as well as during a Thursday Frequency meeting.
      </p>
      <p className="mt-4">
        This application serves to demonstrate several of the capabilities of the search utility, to
        better demonstrate how it can be useful for prototyping or building production-ready sites.
      </p>
    </div>
  );
};

export default Landing;

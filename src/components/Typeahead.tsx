import { useDebounce } from '@uidotdev/usehooks';
import { useEffect, useState } from 'react';

export interface TypeaheadProps {
  className?: string;
  searchFunction: (input: string) => Promise<string[]>;
}

const Typeahead = (props: TypeaheadProps) => {
  const { searchFunction, className } = props;
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 300);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (debouncedSearch.length < 3) {
      setResults([]);
      return;
    }
    const fn = async () => {
      const searchResults = await searchFunction(debouncedSearch);
      setResults(searchResults);
    };
    fn();
  }, [debouncedSearch, searchFunction]);

  return (
    <div className={className}>
      <div className="flex">
        <input className="text-black" onChange={(e) => setSearch(e.target.value)} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
          onClick={() => {
            setSearch('');
            setResults([]);
          }}
        >
          Clear
        </button>
      </div>
      <ul className="text-left max-w-36">
        {results.map((r) => (
          <li className="w-60 overflow-hidden text-ellipsis whitespace-nowrap" title={r} key={r}>
            {r}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Typeahead;

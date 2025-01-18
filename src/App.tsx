import { lazy, Suspense } from 'react';
import { BrowserRouter, BrowserRouterProps, Route, Routes } from 'react-router';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Index = lazy(() => import('./page/index'));
const RoomPage = lazy(() => import('./page/RoomPage'));
const HotelPage = lazy(() => import('./page/HotelPage'));
const Router = (props: BrowserRouterProps) => <BrowserRouter {...props} />;

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Suspense
      fallback={
        <FontAwesomeIcon
          className="text-white transition-all animate-[spin_3s_linear_infinite] ease-out duration-500"
          icon={faSpinner}
          size="5x"
        />
      }
    >
      <ApolloProvider client={client}>
        <Router>
          <>
            <Routes>
              <Route index element={<Index />} />
              <Route path="/room/:id" element={<RoomPage />} />
              <Route path="/hotel/:id" element={<HotelPage />} />
            </Routes>
          </>
        </Router>
      </ApolloProvider>
    </Suspense>
  );
}

export default App;

import HomePage from './pages/Home';
import ResultPage from './pages/Result';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
];

export default routes;

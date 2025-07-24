import { createBrowserRouter } from 'react-router';
import App from '../App.tsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.tsx';
import HomePage from '../pages/HomePage/HomePage.tsx';
import AboutPage from '../pages/AboutPage/AboutPage.tsx';
import DetailView from '../components/DetailView/DetailView.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        Component: HomePage,
        children: [
          {
            path: '',
            Component: DetailView,
          },
        ],
      },
      {
        path: 'about',
        Component: AboutPage,
      },
    ],
  },
]);

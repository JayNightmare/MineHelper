import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BuildPage from './pages/BuildPage';
import NavBar from './components/Layout/NavBar';
import './index.css';
import './App.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <NavBar />
        <HomePage />
      </>
    ),
  },
  {
    path: '/build',
    element: (
      <>
        <NavBar />
        <BuildPage />
      </>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

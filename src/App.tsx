import './App.css';
import { Outlet } from 'react-router';
import Navitation from './components/Navigation/Navitation.tsx';

function App() {
  return (
    <>
      <Navitation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;

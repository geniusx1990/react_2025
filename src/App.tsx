import './App.css';
import { Outlet } from 'react-router';
import Header from './components/Header/Header.tsx';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-black dark:bg-gray-950 dark:text-white transition-colors duration-300">
      <Header />
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

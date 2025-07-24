import { NavLink } from 'react-router';

export default function Navigation() {
  return (
    <header className="max-w-6xl mx-auto p-6 space-y-6">
      <nav>
        <ul className="flex space-x-6 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-700 hover:text-blue-600'
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

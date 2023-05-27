import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header>
      <nav className="flex items-center justify-between -mt-4 -mx-4 py-4 px-6 border-b border-gray-500 shadow">
        <div className="flex gap-4 text-2xl font-bold  px-4 py-4 items-center rounded-full">
          <Link to="/">
            <img src="https://img.icons8.com/ios-filled/50/null/film-reel--v1.png" />
          </Link>
          MovieHUB
        </div>
        {!user ? (
          <div className="bg-gray-300 text-gray-500 rounded-full border border-gray-300  flex items-center justify-center py-2 px-4">
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <div className="mr-3">|</div>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div className="flex items-center gap-2 border text-white border-gray-300 bg-red-600 rounded-full pl-2 pt-1.5 pb-2 pr-4 mr-3">
            <div className="rounded-full overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                fill="white"
                className="w-6 h-6 relative top-1"
              >
                <path d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" />
              </svg>
            </div>

            <div>
              <Link to="/profile">{user.name}</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

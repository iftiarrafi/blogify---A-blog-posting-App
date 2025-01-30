import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle mobile menu
  };

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-gray-100 text-3xl font-sans font-semibold"
          >
            Blogify
          </Link>
          {/* Hamburger Icon */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-gray-100 focus:outline-none"
              onClick={toggleMenu} // Toggle menu visibility
              aria-label="Toggle Navigation"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex space-x-8">
            <Link
              to="/"
              className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
            >
              About
            </Link>
            {token ? (
              <>
                <Link
                  to="/auth/profile"
                  className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-100 text-lg font-medium hover:text-blue-400 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (visible when isMenuOpen is true) */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-800 text-gray-100 space-y-4 p-4">
          <Link
            to="/"
            className="block text-lg font-medium hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block text-lg font-medium hover:text-blue-400"
          >
            About
          </Link>
          {token ? (
            <>
              <Link
                to="/auth/profile"
                className="block text-lg font-medium hover:text-blue-400"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block text-lg font-medium hover:text-blue-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-lg font-medium hover:text-blue-400"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-lg font-medium hover:text-blue-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

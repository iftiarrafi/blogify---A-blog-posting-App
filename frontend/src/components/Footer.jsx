import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Content */}
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between md:items-center">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            &copy; 2025 Blogify. All rights reserved.
          </p>

          {/* Social Media Links */}
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition duration-300"
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
                  d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.41 0 8-3.59 8-8s-3.59-8-8-8-8 3.59-8 8 3.59 8 8 8zm0-13c-.83 0-1.5.67-1.5 1.5S11.17 9 12 9s1.5-.67 1.5-1.5S12.83 7 12 7zm-1 9h2v2h-2zm-2-4h6v2H9z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition duration-300"
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
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2zm0-4h2v2h-2zm0-4h2v2h-2z"
                />
              </svg>
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-blue-400 transition duration-300"
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
                  d="M19 4h-1V3c0-1.104-.896-2-2-2h-4c-1.104 0-2 .896-2 2v1H5c-1.104 0-2 .896-2 2v14c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V6c0-1.104-.896-2-2-2zm-7-1h2v1h-2zm-4 0h2v1H8zm6 16H10v-1h4z"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer Navigation Links (optional) */}
        <div className="mt-6 flex justify-center space-x-6 text-sm">
          <Link
            to="/about"
            className="text-gray-400 hover:text-blue-400 transition duration-300"
          >
            Terms & Conditions
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-blue-400 transition duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            to="/about"
            className="text-gray-400 hover:text-blue-400 transition duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

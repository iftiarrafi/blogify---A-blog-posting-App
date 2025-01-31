import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser({ email, password }));
      if (response.payload && response.payload.token) {
        navigate("/");
      } else {
        console.log("Invalid credentials");
      }
    } catch (err) {
      console.log(err, "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Left Side - App Introduction (Hidden on Small Screens) */}
      <div className="w-1/2 hidden md:flex flex-col justify-center items-start px-16 text-gray-800 bg-slate-300">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Blogify<span className="text-red-600">.</span>{" "}
        </h1>
        <p className="text-lg mb-6">
          Share your thoughts, connect with readers, and explore diverse
          perspectives. Blogfy is your go-to platform for effortless blogging
          and meaningful engagement.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 p-8 bg-white rounded-2xl shadow-lg"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Login to explore<span className="text-red-600">!</span>
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded mb-6 focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

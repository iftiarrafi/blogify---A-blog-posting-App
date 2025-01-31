import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OthersProfile = () => {
  const [blogs, setBlogs] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/users/${id}/blogs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBlogs(response.data.blogs);
        setUserInfo(response.data.blogs[0].user);
        console.log(response.data.blogs[0].user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="text-2xl font-semibold text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Author Profile Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Author Profile
          </h2>
          <h3 className="text-2xl text-gray-700 font-semibold">
            {userInfo ? userInfo.name : "Loading..."}
          </h3>
          <p className="text-gray-600 mt-2">
            Contact: {userInfo ? userInfo.email : "Loading..."}
          </p>
        </div>
        {/* User's Blogs Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-6"> User Blogs</h2>
          {blogs && Array.isArray(blogs) && blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full">
                    {blog.image ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${blog.image}`}
                        alt="Blog"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={`https://picsum.photos/seed/${blog.id}/400/300`}
                        alt="Blog"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Author: {blog.user ? blog.user.name : "Unknown"}
                    </p>
                    <p className="text-gray-600">
                      {blog.content.slice(0, 150)}...
                    </p>
                  </div>
                  <div className="p-4 bg-gray-50 text-center">
                    <button className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p>No blogs available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OthersProfile;

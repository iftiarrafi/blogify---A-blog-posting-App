import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../../store/blogSlice";
import axios from "axios";
axios.defaults.withCredentials = true;

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [myblogs, setMyblogs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }

    dispatch(createBlog(formData));
    setTitle("");
    setContent("");
    setImage(null);
  };

  const showBlog = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/${user?.id}/blogs`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMyblogs(response.data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    if (user?.id) {
      showBlog();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Author Profile Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Author Profile
          </h2>
          <h3 className="text-2xl text-gray-700 font-semibold">
            {user ? user.name : "Loading..."}
          </h3>
          <p className="text-gray-600 mt-2">
            Contact: {user ? user.email : "Loading..."}
          </p>
        </div>

        {/* Create Blog Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 mb-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Create a New Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                rows="6"
                required
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blog Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition-all"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex justify-center py-3 px-6 w-full bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
              >
                Create Blog
              </button>
            </div>
          </form>
        </div>

        {/* Show My Blogs Section */}
        <div className="bg-white shadow-lg rounded-xl p-8 transform transition-all hover:scale-105">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">My Blogs</h2>
          {myblogs && Array.isArray(myblogs) && myblogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myblogs.map((blog) => (
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

export default Profile;

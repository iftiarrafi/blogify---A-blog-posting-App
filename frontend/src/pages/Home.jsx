import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../../store/blogSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const blogs = useSelector((state) => state.blogs.blogs);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchBlogs());
    }
  }, [dispatch, token, navigate]);

  const otherprofilepage = (id) => {
    navigate(`auth/other/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12 animate-fade-in">
          Latest Blo<span className="text-red-500">g</span>s
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-in-out transform"
              >
                <div className="relative h-64 w-full">
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
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {blog.title}
                  </h3>
                  <p
                    className="text-sm text-gray-500 mb-4 cursor-pointer hover:text-indigo-600 transition-colors duration-200"
                    onClick={() => otherprofilepage(blog.user.id)}
                  >
                    Author: {blog.user ? blog.user.name : "Unknown"}
                  </p>
                  <p className="text-gray-600">
                    {blog.content.slice(0, 150)}...
                  </p>
                </div>
                <div className="p-4 bg-gray-50 text-center">
                  <button
                    onClick={() => navigate(`/blog/${blog.id}`)}
                    className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200"
                  >
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 py-8">
              <p>No blogs available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

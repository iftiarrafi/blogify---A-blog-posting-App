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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Latest Blogs
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs && Array.isArray(blogs) && blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 hover:shadow-xl transition duration-300"
              >
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    {blog.title}
                    <p className="mt-2 text-sm text-gray-500">
                      Author : {blog.user ? blog.user.name : "Unknown"}
                    </p>
                  </h3>
                  <div className="relative">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt="Blog"
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <img
                        src={`https://picsum.photos/seed/${blog.id}/200/300`}
                        alt="Blog"
                        className="w-full h-64 object-cover"
                      />
                    )}
                  </div>
                  <p className="text-gray-600">
                    {blog.content.slice(0, 200)}...
                  </p>
                </div>
                <div className="p-4 bg-gray-100 text-center">
                  <button className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition">
                    Read More
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600">
              <p>No blogs available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

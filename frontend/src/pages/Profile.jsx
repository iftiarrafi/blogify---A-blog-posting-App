import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../../store/blogSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBlog({ title, content }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Create a Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default Profile;

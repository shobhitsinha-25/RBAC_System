function BlogList({ blogs, user, onEdit, onDelete }) {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          <p>{blog.content}</p>
          <small>By {blog.author?.name}</small>

          {user && user.id === blog.author?._id && (
            <div className="mt-2">
              <button
                onClick={() => onEdit(blog)}
                className="mr-2 bg-yellow-400 px-2 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(blog._id)}
                className="bg-red-500 px-2 py-1 text-white"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default BlogList;

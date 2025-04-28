import { useEffect, useState } from 'react';
import API from '../api/frontendServer';
import BlogForm from '../components/BlogForm';
import BlogList from '../components/Bloglist';

function Dashboard({ user }) {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);

  const fetchBlogs = async () => {
    const { data } = await API.get('/api/blogs');
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateOrUpdate = async (blogData) => {
    if (editingBlog) {
      await API.put(`/api/blogs/${editingBlog._id}`, blogData);
    } else {
      await API.post('/api/blogs', blogData);
    }
    fetchBlogs();
    setEditingBlog(null);
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this blog?')) {
      await API.delete(`/api/blogs/${id}`);
      fetchBlogs();
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">All Blogs</h1>

      {user && (
        <>
          <h2 className="text-xl mb-2">{editingBlog ? 'Edit Blog' : 'Create Blog'}</h2>
          <BlogForm onSubmit={handleCreateOrUpdate} initialData={editingBlog} />
        </>
      )}

      <BlogList blogs={blogs} user={user} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}

export default Dashboard;

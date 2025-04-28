import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/frontendServer';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/auth/signup', formData);
      navigate('/login');
    } catch (error) {
      alert('Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Signup</h1>
      <input type="text" placeholder="Name" value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="border p-2 mb-2 w-full" required />
      <input type="email" placeholder="Email" value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border p-2 mb-2 w-full" required />
      <input type="password" placeholder="Password" value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="border p-2 mb-2 w-full" required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Signup</button>
    </form>
  );
}

export default Signup;

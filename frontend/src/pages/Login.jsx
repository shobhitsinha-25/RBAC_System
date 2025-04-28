import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/frontendServer';

function Login({ setUser }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/api/auth/login', formData);
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <input type="email" placeholder="Email" value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="border p-2 mb-2 w-full" required />
      <input type="password" placeholder="Password" value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="border p-2 mb-2 w-full" required />
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
  );
}

export default Login;

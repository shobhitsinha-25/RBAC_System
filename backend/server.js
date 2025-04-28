// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from './Models/userModel.js';
import Blog from './Models/blogModel.js';
import { protect } from './MIddleWare/auth.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword, role: 'user' });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/blogs', async (req, res) => {
  const blogs = await Blog.find().populate('author', 'name');
  res.json(blogs);
});

app.post('/api/blogs', protect, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.create({ title, content, author: req.user.id });
    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/blogs/:id', protect, async (req, res) => {
  const { title, content } = req.body;
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  if (blog.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to edit this blog' });
  }

  blog.title = title;
  blog.content = content;
  await blog.save();
  res.json(blog);
});

app.delete('/api/blogs/:id', protect, async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ error: 'Blog not found' });
  if (blog.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to delete this blog' });
  }

  await blog.deleteOne();
  res.json({ message: 'Blog deleted successfully' });
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

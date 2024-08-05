import express from 'express';
import { users } from './mockData.js';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Username and password are required.' });
  }

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  res.status(200).json({ message: 'Login successful!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;

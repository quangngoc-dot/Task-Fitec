const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'YOUR_SECRET_KEY';  

app.use(bodyParser.json());

const users = [
  {
    email: 'example@example.com',
    password: bcrypt.hashSync('password123', 10)  
  }
];

// API nhận email và password
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Xử lý/kiểm tra email tồn tại
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(400).json({ message: 'Email không tồn tại' });
  }

  //(kiểm tra) Password đúng/sai? 
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Mật khẩu không đúng' });
  }

  // Tạo access token
  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: '1h' });

  // Trả về token cho user
  res.json({ accessToken: token });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

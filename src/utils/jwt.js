const jwt = require('jsonwebtoken');

// Tạo JWT từ dữ liệu người dùng và secret key
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    // Thêm các thông tin khác của người dùng nếu cần
  };

  // Tạo JWT với thời hạn hợp lệ là 1 giờ
  const token = jwt.sign(payload, '123456789', { expiresIn: '1h' });

  return token;
}

module.exports = {
    generateToken,
};
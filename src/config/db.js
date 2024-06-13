require('dotenv').config();
const { Pool } = require('pg');

// Cấu hình kết nối đến cơ sở dữ liệu PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "miniproject",
  password: "Admin@123",
  port: 5432,
});

module.exports = pool;

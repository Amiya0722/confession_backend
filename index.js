const express = require("express")
const app = express()
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 100, // tối đa 100 request
  message: "Bạn gửi quá nhiều yêu cầu, hãy thử lại sau."
});

// Gắn limiter cho toàn bộ app


const route = require("./routes")
const db = require("./config/db/user")
db.run()
app.use(limiter);
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
route(app)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
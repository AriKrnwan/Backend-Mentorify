require('dotenv').config();
const PORT = process.env.PORT || 5000;
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const multer = require('multer')
// const jwt = require('jsonwebtoken'); // Add this line for JWT
const express = require('express');
const rolesRoutes = require('./routes/roles.js');
const app = express();
const middlewareLogRequest = require('./middleware/logs');
const db = require('./config/database.js');



// Konfigurasi multer untuk menyimpan file gambar
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

// Filter untuk memastikan hanya gambar yang diizinkan diunggah
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};


const bodyParser = require('body-parser');
// const jwtMiddleware = require('./middleware/jwt');
const expressSession = require('express-session');

app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Middleware untuk menangani gambar yang diunggah
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(expressSession({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));



// REGISTER

app.post('/register', async (req, res) => {
  try {
    const { full_name, password, email, institution, phone } = req.body;

    // Validasi minimal kolom yang diperlukan
    if (!full_name || !email || !password) {
      return res.status(400).send({ message: 'Invalid request. Email and password are required.' });
    }

    // Tambahkan nilai default untuk role_id atau atur nilai yang sesuai dengan skema Anda
    const role_id = 1;

    // Hash password menggunakan bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Membangun array values sesuai dengan kolom yang akan diisi
    const values = [role_id, full_name, hashedPassword, email, institution, phone];
    const placeholders = ['role_id', 'full_name', 'password', 'email', 'institution', 'phone'];

    const placeholdersStr = placeholders.join(', ');
    const placeholdersValues = Array(placeholders.length).fill('?').join(', ');

    const SQL = `INSERT INTO users (${placeholdersStr}) 
                  SELECT ${placeholdersValues} FROM DUAL 
                  WHERE NOT EXISTS (SELECT * FROM users WHERE email = ?)`;

    const [result] = await db.query(SQL, [...values, email]);

    if (result.affectedRows === 0) {
      // Jika tidak ada baris yang terpengaruh, artinya email sudah ada
      return res.status(409).send({ message: 'Email already exists' });
    }

    console.log('User inserted successfully');

    return res.status(200).send({ message: 'User added' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Internal Server Error', error: error.message });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
    }

    const SQL = 'SELECT * FROM users WHERE email = ?';
    const values = [email];

    const [results] = await db.execute(SQL, values);

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials', details: 'Email or password is incorrect.' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials', details: 'Email or password is incorrect.' });
    }

    // Simpan informasi pengguna dalam session
    req.session.user = {
      id: user.id,
      email: user.email,
      role_id: user.role_id,
      full_name: user.full_name,
      institution: user.institution, 
      phone: user.phone,
      birth_date: user.birth_date,
      gender: user.gender,
      topic: user.topic,
      skill: user.skill,
      bio: user.bio,
      rating: user.rating,
      review: user.review,
      certification: user.certification,
      experience: user.experience,
      city: user.city,
      time_zone: user.time_zone,
      balance: user.balance
    };

    // Jika password valid, Anda dapat melanjutkan dengan respons login yang berhasil
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});




app.get('/profile', (req, res) => {
  console.log('Session user:', req.session.user)

  // Periksa apakah pengguna telah login
  if (req.session.user) {
    return res.status(200).json({ message: 'User profile retrieved successfully', user: req.session.user });
  } else {
    return res.status(401).json({ message: 'User not authenticated' });
  }
});

app.put('/profile', async (req, res) => {
  try {
    // Pastikan pengguna telah login
    const { user } = req.session;
    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Dapatkan ID pengguna dari sesi
    const userId = user.id;

    // Dapatkan data yang ingin diupdate dari body permintaan
    const {
      full_name,
      institution,
      phone,
      birth_date,
      gender,
      topic,
      skill,
      bio,
      certification,
      experience,
      city,
      time_zone,
    } = req.body;

    // Dapatkan path gambar dari file yang diupload
    const image = req.file ? req.file.filename : undefined;

    // Bangun SQL untuk melakukan update
    const updateColumns = [
      'full_name', 'institution', 'phone', 'birth_date', 'gender',
      'topic', 'skill', 'bio', 'certification', 'experience',
      'city', 'time_zone', 'image'
    ];

    const updateValues = [
      full_name, institution, phone, birth_date, gender,
      topic, skill, bio, certification, experience,
      city, time_zone, image
    ];

    const updateSet = updateColumns
      .filter((col, index) => updateValues[index] !== undefined)
      .map((col) => `${col} = ?`)
      .join(', ');

    const SQL = `UPDATE users SET ${updateSet} WHERE id = ?`;

    const values = [...updateValues.filter((val) => val !== undefined), userId];

    // Eksekusi query update
    const [result] = await db.query(SQL, values);

    if (result.affectedRows === 0) {
      // Jika tidak ada baris yang terpengaruh, artinya pengguna dengan ID tersebut tidak ditemukan
      return res.status(404).json({ message: 'User not found' });
    }

    // Ambil data pengguna yang telah diupdate
    const [updatedUserResults] = await db.execute('SELECT * FROM users WHERE id = ?', [userId]);
    const updatedUser = updatedUserResults[0];

    // Update informasi pengguna dalam sesi
    req.session.user = {
      ...req.session.user,  // Gunakan data yang sudah ada dalam sesi
      ...updatedUser,
    };

    return res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});



// LOGOUT
app.post('/logout', (req, res) => {
  try {
    // Hapus sesi atau token di sisi server
    // (Misalnya, menghapus informasi pengguna dari session)
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ message: 'Internal Server Error', error: err.message });
      }

      // Jika sukses logout, kirim respons sukses
      return res.status(200).json({ success: true, message: 'Logout successful' });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// Endpoint untuk mendapatkan data mentor
app.get("/mentor", async (req, res) => {
  try {
    // Query untuk mendapatkan pengguna dengan role_id 2 (Mentor)
    const SQL = "SELECT * FROM users WHERE role_id = ?";
    const values = [2];

    const [results] = await db.execute(SQL, values);

    // Kembalikan hasil
    return res.status(200).json({ users: results });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});



// Middleware untuk menyajikan gambar dari direktori 'images'
app.use("/images", express.static("images"));

app.use(middlewareLogRequest);
app.use(express.json());
app.use('/roles', rolesRoutes);

app.listen(PORT, () => {
  console.log(`Server running di port ${PORT}`);
});

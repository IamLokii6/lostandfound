const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// Import models
const User = require("./db/users");
const LostItem = require("./db/lostItems");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = "your_jwt_secret"; // Replace with a secure secret key

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/lostandfound", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Middleware to extract user ID from JWT token
app.use((req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.userId = decoded.userId;
      next();
    });
  } else {
    next();
  }
});

// User registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user: " + error.message);
  }
});

// User login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    res.status(500).send("Error logging in user: " + error.message);
  }
});

// API route to post a lost item
app.post('/api/lost-items', upload.single('image'), async (req, res) => {
  console.log('Uploaded file:', req.file);
  const { studentName, rollNumber, mobileNumber, itemName, dateLost, location, description, category } = req.body;
  console.log('Received data:', { studentName, rollNumber, mobileNumber, itemName, dateLost, location, description, category });
  try {
    const lostItem = new LostItem({
      studentName,
      rollNumber,
      mobileNumber,
      itemName,
      dateLost,
      location,
      description,
      category,
      image: req.file ? req.file.path : '',
      userId: req.userId
    });

    await lostItem.save();
    res.status(201).json({ message: "Lost item reported successfully" });
  } catch (error) {
    console.error('Error reporting lost item:', error);
    res.status(500).json({ message: "Error reporting lost item", error: error.message });
  }
});

// API route to get all lost items
app.get('/api/lost-items', async (req, res) => {
  try {
    const lostItems = await LostItem.find({});
    res.status(200).json(lostItems);
  } catch (error) {
    console.error('Error retrieving lost items:', error);
    res.status(500).json({ message: "Error retrieving lost items", error: error.message });
  }
});

// API route to search for lost items by name
app.get('/api/lost-items/search', async (req, res) => {
  const { itemName } = req.query;
  try {
    const searchQuery = itemName ? { itemName: { $regex: itemName, $options: 'i' } } : {};
    const lostItems = await LostItem.find(searchQuery);
    res.status(200).json(lostItems);
  } catch (error) {
    console.error('Error searching for lost items:', error);
    res.status(500).json({ message: "Error searching for lost items", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

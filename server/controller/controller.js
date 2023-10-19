import User from '../modal/user.js'; // Correct the path to the user model file
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import util from 'util';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

export const upload = multer({ storage: storage });

// const uploadAsync = util.promisify(upload.single('file'));

export async function handleAction(req, res) {
  try {
    const { username, password, email } = req.body;
    
    // Hash the user's password before saving it
    const saltRounds = 10; // You can adjust the number of salt rounds
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      username,
      password: hashedPassword, // Hashed password
      image: req.file ? req.file.filename : null, // File path or null if no file uploaded
      email
    });

    // Save the user data to the database
    await newUser.save();
    res.status(200).send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}



export async function handleAction1(req, res) {
  const { email, password } = req.body;

  try {
    // Check if the user with the provided email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If the password is correct, generate a JWT token
    // If the password is correct, generate a JWT token
const secretKey = 'your_secret_key'; // Replace with your secret key
const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
res.header('Access-Control-Allow-Credentials', true);
// Set the token as a cookie with httpOnly and maxAge options
// Set the token as a cookie with httpOnly and maxAge options
res.cookie('token', token, { httpOnly: true, maxAge: 360000 });


// Send the token in the response
res.status(200).json({ token, user });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

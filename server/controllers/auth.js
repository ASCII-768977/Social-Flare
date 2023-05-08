import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* Register user */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    // generate a random salt provided by bcrypt
    const salt = await bcrypt.genSalt();
    // use the salt to encrypt the password
    const passwordHash = await bcrypt.hash(password, salt);

    // create a new user with the encrypted password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // save the user to the database
    const savedUser = await newUser.save();
    res.status(201).json(`Success 201 - ${savedUser}`);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Login */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist. ' });

    // compare the password entered with the encrypted password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials. ' });

    // create a token using jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
    // delete the password so it doesn't get sent to the frontend
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

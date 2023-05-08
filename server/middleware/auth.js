import jwt from 'jsonwebtoken';

/* Verify the token */
export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    // check if token exists
    if (!token) {
      return res.status(403).send('Access Denied');
    }

    // remove the 'Bearer ' part of the token, this is setup at frontend
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    // verify the token using our secret string
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // proceed to the next step of the function
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

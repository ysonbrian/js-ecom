import jwt from 'jsonwebtoken';
import config from './config';

export const generateToken = (user) =>
  jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET
  );

export const isAuth = (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    res.status(401).send({ message: '토큰이 제공 되지 않습니다' });
  } else {
    const token = bearerToken.slice(7, bearerToken.length);
    jwt.verify(token, config.JWT_SECRET, (err, data) => {
      if (err) {
        res.status(401).send({ message: '토큰이 존재 하지 않습니다' });
      } else {
        req.user = data;
        next();
      }
    });
  }
};

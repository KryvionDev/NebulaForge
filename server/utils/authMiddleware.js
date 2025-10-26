const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'devsecret';

module.exports = function(req,res,next){
  const header = req.headers.authorization;
  if(!header) return res.status(401).send({ error:'No token' });
  const token = header.split(' ')[1];
  try {
    const data = jwt.verify(token,jwtSecret);
    req.userId = data.id;
    next();
  } catch(err) { return res.status(401).send({ error:'Invalid token' }); }
};

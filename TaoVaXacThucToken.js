const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; 

function createAccessToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, secretKey, { expiresIn });
}


function validateAccessToken(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded; 
  } catch (err) {
    throw new Error('Invalid or expired token'); 
  }
}


const user = { id: 1, username: 'user1' };  
const token = createAccessToken(user);

console.log('Access Token:', token);


try {
  const decoded = validateAccessToken(token);
  console.log('Decoded Token:', decoded);
} catch (err) {
  console.error(err.message);
}

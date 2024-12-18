const bcrypt = require('bcryptjs');

const passwordAdmin = "AdminFG123"; // Replace with the password you want for the admin account
const passwordUser = "UserFG123"; // Replace with the password you want for the admin account

const hashedPassword = bcrypt.hashSync(password, 10);
console.log("Hashed Password:", hashedPassword);

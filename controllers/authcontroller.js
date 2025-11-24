const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const USERS_FILE = path.join(__dirname, "../data/users.json");
const SECRET_KEY = "MY_SECRET_KEY_12345";

function readUsers() {
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 3));
}

exports.register = (req, res) => {
    const { username, password, role } = req.body;

    console.log(username + "  "+ password + " "+ role);
    if (!username || !password) {
        return res.status(400).send({ message: "Username & Password required" });
    }

    let users = readUsers();

    // Check existing
    if (users.find(u => u.username === username)) {
        return res.status(400).send({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 8);

    const newUser = {
        id: users.length + 1,
        username,
        password: hashedPassword,
        role: role || "Student"
    };

    users.push(newUser);
    writeUsers(users);

    res.send({
        message: "User Registered Successfully",
        user: { id: newUser.id, username: newUser.username, role: newUser.role }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    const users = readUsers();

    console.log(username + "  "+ password);


    const user = users.find(u => u.username === username);
   /* if (!user) {
        return res.status(404).send({ message: "User Not Found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password" });
    }

    // Create JWT token
    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
*/

    res.send({
        message: "Login Successful",
        token: token
    });
};

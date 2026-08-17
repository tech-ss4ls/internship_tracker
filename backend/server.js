const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const {Pool} = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'internship_learning_path',
    password: 'tech@ss4ls',
    port:5432,
});

// JsonWebtoken --> must be stored in config directories inside .env file before going to production
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    console.error("Fatal Error: JWT_SECRET is not defined");
    process.exit(1);
}

console.log("JWT_SECRET loaded successfully");

//===============================================================================================
//                                          ENDPOINTS
//===============================================================================================

// * Singup Endpoint
app.post('/api/signup', async(req,res)=>{
    const {email, password, fullName} = req.body;

    // Validating user input
    if(!email || !password){
        return res.status(400).json({error:'Email and password required'});
    }

    try{

        // Hashing password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //Insert users into database, internship_learning_path
        const result = await pool.query(
            'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING user_id, email, full_name',
            [email, hashedPassword,fullName || '']
        );

        const newUser = result.rows[0];

        // Generate JWT for auto login
        const token = jwt.sign({userId: newUser.user_id}, JWT_SECRET, {expiresIn:'7d' });

        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            token: token
        });
        
// Cath any errors during signups regarding the email 
    }catch(error){
        console.error('Signup error', error);
        if(error.constraint === 23505){
            return res.status(409).json({error:"Email already registered"});
        }
        res.status(500).json({error:"Internal server error"});
    }
} );

// Login Endpoint
app.post('/api/login', async(req, res)=> {
    const {email, password} = req.body;

    try{
        // Get user email
        const result = await pool.query(
            'SELECT user_id, email, password_hash, full_name FROM users WHERE email = $1', [email]
        );

        if(result.rows.length === 0){
            return res.status(401).json({error:'Invalid credentials'});
        }

        const user = result.rows[0];

        //Compare password with hash password
        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if(!isValidPassword){
            return res.status(401).json({error:'Invalid credentials'});
        }

        // Update last login
        await pool.query(
            'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = $1',
            [user.user_id]
        );

        // Get JWT 
        const token = jwt.sign({userId: user.user_id}, JWT_SECRET, {expiresIn:'7d' });

        //Remove password hash from response
        delete user.password_hash;

        res.json({
            message: 'Login successful',
            user: user,
            token:token
        });


    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({error:"Internal server issue"});
    }
});

// Protected route (example)
app.get('/api/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({error:"No token provided"});
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const result = await pool.query(
            'SELECT user_id, email, full_name, created_at FROM users WHERE user_id = $1',
            [decoded.userId]
        );
        
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(result.rows[0]);
    }catch(error){
        res.status(401).json({error:"Invalid token"});
    }
});

// Start server
app.listen(port, ()=>{
    console.log('Server running on http://localhost:${port}');
});
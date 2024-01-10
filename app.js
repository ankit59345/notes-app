const express = require("express");
const app = express();

// Routes Import
const notesRouter = require("./src/routes/notes.js");
const userRouter = require("./src/routes/user.js");

// Middleware Import
const {authenticateUser} = require('./src/middlewares/auth.js')
const errorHandlerMiddleware = require('./src/middlewares/error-handler.js');
const helmet = require("helmet");
const xss = require('xss-clean');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

// Middlewares
app.use(express.json())
app.use(errorHandlerMiddleware)
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(rateLimiter({
    windowMs: 1000 * 60,
    max: 60,
    handler: (req, res) => {
        res.status(429).json({
          error: 'Too many requests. Please try again later.',
        });
    },
}));
app.use(express.static('./uploads/user'))  


// Routes
app.use('/api/v1/notes', [authenticateUser, notesRouter])
app.use('/api/v1/user', userRouter)



app.all('*', (req, res) => {
    return res.status(404).json({success: false, msg: "OOPs, The Route you are trying to access does not exist"})
})


app.use(errorHandlerMiddleware)




const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening to port: ${port}`))

const express = require("express");
const notesRouter = require("./src/routes/notes.js");
const userRouter = require("./src/routes/user.js");
const {readFileSync} = require("fs");
const {authenticateUser} = require('./src/middlewares/auth.js')
const errorHandlerMiddleware = require('./src/middlewares/error-handler.js')

const app = express();
app.use(express.json())

app.use(errorHandlerMiddleware)

app.use('/api/v1/notes', [authenticateUser, notesRouter])

app.use('/api/v1/user', userRouter)



app.all('*', (req, res) => {
    return res.status(404).json({success: false, msg: "OOPs, The Route you are trying to access does not exist"})
})


app.use(errorHandlerMiddleware)




const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening to port: ${port}`))

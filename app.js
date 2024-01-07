const express = require("express");
const notesRouter = require("./src/routes/notes.js");
const {readFileSync} = require("fs");

const app = express();
app.use(express.json())

app.use('/api/v1/notes', notesRouter)

app.all('*', (req, res) => {
    return res.status(404).json({success: false, msg: "OOPs, The Route you are trying to access does not exist"})
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    const errHtml = readFileSync('./public/500.html', 'utf8')
    res.status(500).send(errHtml)
})


const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening to port: ${port}`))

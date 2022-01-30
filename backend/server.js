require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {nanoid} = require("nanoid");
const glob = require("glob");
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './videos')
    }, filename: (req, file, callback) => {
        const id = nanoid(10)
        callback(null, id + "." + file.originalname.split(".").reverse()[0])
    }
})
const upload = multer({storage})
app.use(cors())
const server = require('http').createServer(app);
const {Server} = require("socket.io");
const fs = require("fs");
const io = new Server(server, {cors: {origin: '*'}});

const PORT = +process.env.PORT || 9000;


app.get('/', (req, res) => {
    res.send('hello world! this is the io server');
});

app.post("/upload", upload.single("video"), (req, res) => {
    console.log(req.file);
    const id = req.file.filename.split(".")[0];
    res.json({
        id
    });
});

app.get("/file/:id", (req, res) => {
    glob("videos/" + req.params.id + "*", {}, function (er, files) {
        console.log(files);
        res.sendFile(__dirname + "/" + files[0])
    })

})

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

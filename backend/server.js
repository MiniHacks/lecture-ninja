require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {nanoid} = require("nanoid");
const glob = require("glob");
const fetch = require('node-fetch');
const mongodb = require("mongodb");
const mongoose = require('mongoose');
const FormData = require('form-data');

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

const lectureSchema = new mongoose.Schema({
    id: String,
    email: String,
    date: Date,
    class: String,
    lecture: String,
    data: Object,
    summary: String,
    isLoading: Boolean,
})

const lecture = new mongoose.model("Lecture", lectureSchema)


mongoose.connect(process.env.MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});

app.get('/', (req, res) => {
    res.send('hello world! this is the io server');
});

app.post("/upload", upload.single("video"), (req, res) => {
    console.log(req.body);

    const id = req.file.filename.split(".")[0];
    lecture.insertMany([{
        id, email: req.body.email, class: req.body.class, lecture: req.body.lecture, isLoading: true, date: new Date()
    }]).then(r => {
        res.json({
            id
        })
    });

    fetch(process.env.PYURI + "/upload_video/" + req.file.filename).then(r => r.json()).then(async (r) => {
        console.log(r);
        const x = await lecture.updateOne({id}, {data: r, isLoading: false})
        console.log(r, x);
    })
});

app.get("/dash", async (req, res) => {
    const email = req.query.email;
    console.log(email);
    const docs = await lecture.find({email})
    res.json(docs);
})

app.get("/lecture/:id", (req, res) => {
    fetch(process.env.PYURI + "/test_schema").then(r => r.json()).then(r => res.json(r));
})


app.get("/info/:id", async (req, res) => {
    const doc = await lecture.find({id: req.params.id});
    res.json(doc[0]);
})

app.get("/file/:id", (req, res) => {
    glob("videos/" + req.params.id + "*", {}, function (er, files) {
        console.log(files);
        res.sendFile(__dirname + "/" + files[0])
    })

})

server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
});

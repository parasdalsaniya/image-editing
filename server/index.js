const express = require("express");
const { imageText } = require("./jimpImage");
const { addTextOnImage } = require("./shardImage");
const cors = require('cors');
const { uploadSingle } = require("./multer");
const app = express();

app.use(express.json());
app.use(cors("*"))
// imageText()
//     .then((res) => {
//         console.log('res', res);
//     })

// addTextOnImage()
//     .then((res) => {
//         console.log('res', res);
//     })

const route = express.Router()
route.post("/image-text", uploadSingle('file'), addTextOnImage);

app.use(route);

app.listen(4000, () => {
    console.log('server is running on 4000');
})
const path = require("path")
const sharp = require("sharp");

async function addTextOnImage(req, res) {
    try {
        const { x, y } = req.body;
        console.log('res.body', req.body);
        console.log('req.file', req.file);
        // const { filename, mimetype, size } = req.file;
        const width = 1000;
        const height = 1000;
        const text = "Sammy the xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

        const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { fill: #001; font-size: 70px; font-weight: bold;}
      </style>
      <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
    </svg>
    `;
        console.log('__dirname', __dirname)
        const svgBuffer = Buffer.from(svgImage);
        const img = await sharp(path.join(__dirname, 'test32', req.file.filename))
        img.composite([{ input: svgBuffer, left: parseInt(x), top: parseInt(y) }])
            .toFile(path.join(__dirname, 'sharp-image.jpg'))
        // const image = await sharp("sammy.png")
        //   .composite([
        //     {
        //       input: svgBuffer,
        //       top: 0,
        //       left: 0,
        //     },
        //   ])
        //   .toFile("sammy-text-overlay.png");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addTextOnImage
}
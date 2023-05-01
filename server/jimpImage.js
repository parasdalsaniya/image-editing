const fs = require("fs")
const path = require("path")
const Jimp = require('jimp');

const imageText = async (req, res) => {
    try {
        // console.log('req.body', req.query);

        
        const image = await Jimp.read(path.join(__dirname , "image.jpg"));
        // const width = image.bitmap.width;
        // const height = image.bitmap.height;
        // const xPercent = 0.5; // 20% of width
        // const yPercent = 0.5; // 50% of height    
        // const x = width * xPercent;
        // const y = height * yPercent;
        // const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
        // image.print(font, x, y, 'All copyrights @https://www.tutorialspoint.com');

        const width = image.bitmap.width;
        const height = image.bitmap.height;

        const font = Jimp.FONT_SANS_32_BLACK;
        const text = 'Hello, world!';

        const fontHeight = Jimp.measureTextHeight(font, text);
        const fontWidth = Jimp.measureTextWidth(font, text);
        const centerX = Math.round(width / 2 - fontWidth / 2);
        const centerY = Math.round(height / 2 - fontHeight / 2);

        image.print(font, centerX, centerY, text);


        await image.writeAsync(path.join(__dirname , 'textOverlay.jpg'));


        // Jimp.read(path.join(__dirname , "image.jpg"))
        //     .then(image => {

        //         image.print(
        //             Jimp.loadFont(Jimp.FONT_SANS_32_BLACK),
        //             10, 10,
        //             'Hello, world!'
        //         );

        //         image.write('output.jpg');
        //     })
        //     .catch(err => {
        //         console.error("errrrrrrrrr", err);
        //     });


        return "Done"
        // res.status(200).send(req.query.abc)
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = {
    imageText
}
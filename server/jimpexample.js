const fs = require("fs");
const Jimp = require("jimp-native/true-async");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const replaceColor = require("replace-color");
const homeModel = require('../models/classic');
const gm = require('gm');
const images = require("images");

exports.Index = (req, res) => {
	res.render("index");
};
exports.classic = (req, res) => {
	Base_Url = process.env.Base_Url
	res.render("classic" );
};
exports.ImageData = async(req, res) => {
	const ImgFile = req.file;
	const { itemId, collection, clothes, headwear, bgColor ,libraryImages} = JSON.parse(JSON.stringify(req.body));
	let cap, bgImage;
	let mainImage, NewMainImage;
	let tShirt, transparentImage;
	
	if(itemId !== undefined && itemId !== "") {
		let urlValid = await homeModel.checkUrl(itemId);
		if(urlValid.status == 200) {
			mainImage = await Jimp.read(urlValid.url);
			const rgbaValue = Jimp.intToRGBA(mainImage.getPixelColor(50, 50));
			const haxValue = rgbToHex(rgbaValue.r, rgbaValue.g, rgbaValue.b);
			const imgName = new Date().toISOString() + ".png";
			if(bgColor !== "") {
				mainImage.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), () => {
					replaceColor({
						image: urlValid.url,
						colors: {
							type: "hex",
							targetColor: haxValue,
							replaceColor: bgColor,
						},
					}, (err, jimpObject) => {
						if(err) return console.log(err);
						jimpObject.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), async(err) => {
							if(err) return console.log(err);
							if(fs.existsSync(path.join(__dirname, `../../public/images/created-image/${imgName}`))) {
								NewMainImage = await Jimp.read(path.join(__dirname, `../../public/images/created-image/${imgName}`));
							}
							if(fs.existsSync(path.join(__dirname, `../../public/images/product/${headwear}.png`))) {
								cap = await Jimp.read(path.join(__dirname, `../../public/images/product/${headwear}.png`));
							}
							if(fs.existsSync(path.join(__dirname, `../../public/images/product/${clothes}.png`))) {
								tShirt = await Jimp.read(path.join(__dirname, `../../public/images/product/${clothes}.png`));
							}
							if(NewMainImage !== undefined) {
								if(tShirt !== undefined) {
									let tShirtRead = await tShirt.resize(1400, 1350);
									await NewMainImage.composite(tShirtRead, -60, -60);
								}
								if(cap !== undefined) {
									let capRead = await cap.resize(1200, 1300);
									await NewMainImage.composite(capRead, 20, -18);
								}
								NewMainImage.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), (err) => {
									console.log("Merged Image with color: ", imgName);
									res.status(StatusCodes.OK).send({
										resCode: 1,
										message: "Merged Image",
										imageName: imgName,
										Base_Url: process.env.Base_Url,
										data: {
											"imgName": imgName
										}
									});
								})
							}
						});
					});
				})
			} 
			else if(ImgFile != undefined && ImgFile.originalname !== undefined) {
				if(fs.existsSync(path.join(__dirname, `../../public/images/product/${headwear}.png`))) {
					cap = await Jimp.read(path.join(__dirname, `../../public/images/product/${headwear}.png`));
				}
				if(fs.existsSync(path.join(__dirname, `../../public/images/product/${clothes}.png`))) {
					tShirt = await Jimp.read(path.join(__dirname, `../../public/images/product/${clothes}.png`));
				}
				if(tShirt !== undefined) {
					let tShirtRead = await tShirt.resize(1400, 1350);
					await mainImage.composite(tShirtRead, -60, -60);
				}
				if(cap !== undefined) {
					let capRead = await cap.resize(1200, 1300);
					await mainImage.composite(capRead, 20, -18);
				}
				mainImage.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), async() => {
					if(!fs.existsSync(path.join(__dirname, `../../public/images/transparent`))) {
						fs.mkdirSync(path.join(__dirname, `../../public/images/transparent`));
					}
					gm(path.join(_dirname, `../../public/images/created-image/${imgName}`)).transparent(haxValue).write(path.join(_dirname, `../../public/images/transparent/${imgName}`), async(err) => {
						if(err) {
							console.error(err);
							return err;
						}
						let transparent = await Jimp.read(path.join(__dirname, `../../public/images/transparent/${imgName}`));
						transparent.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), async() => {
							images(path.join(_dirname, `../../public/images/uploads/${ImgFile.originalname}`)).size(1262, 1262).draw(images(path.join(dirname, `../../public/images/created-image/${imgName}`)), 10, 10).save(path.join(_dirname, `../../public/images/created-image/${imgName}`), {
								quality: 100
							}, () => {
								console.log('done ho bhai');
							});
							console.log("Merged Image with BG image: ", imgName);
							res.status(StatusCodes.OK).send({
								resCode: 1,
								message: "Merged Image",
								imageName: imgName,
								Base_Url: process.env.Base_Url,
								data: {
									"itemId": itemId,
									"bgImage": ImgFile.originalname,
									"imgName": imgName
								}
							});
						})
					})
				})
			} 
			else if(libraryImages != undefined && libraryImages != "") {
				if(fs.existsSync(path.join(__dirname, `../../public/assets/images/gallery/${libraryImages}`))) {

				if(fs.existsSync(path.join(__dirname, `../../public/images/product/${headwear}.png`))) {
					cap = await Jimp.read(path.join(__dirname, `../../public/images/product/${headwear}.png`));
				}
				if(fs.existsSync(path.join(__dirname, `../../public/images/product/${clothes}.png`))) {
					tShirt = await Jimp.read(path.join(__dirname, `../../public/images/product/${clothes}.png`));
				}
				if(tShirt !== undefined) {
					let tShirtRead = await tShirt.resize(1400, 1350);
					await mainImage.composite(tShirtRead, -60, -60);
				}
				if(cap !== undefined) {
					let capRead = await cap.resize(1200, 1300);
					await mainImage.composite(capRead, 20, -18);
				}
				mainImage.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), async() => {
					if(!fs.existsSync(path.join(__dirname, `../../public/images/transparent`))) {
						fs.mkdirSync(path.join(__dirname, `../../public/images/transparent`));
					}
						gm(path.join(_dirname, `../../public/images/created-image/${imgName}`)).transparent(haxValue).write(path.join(_dirname, `../../public/images/transparent/${imgName}`), async(err) => {
							if(err) {
								console.error(err);
								return err;
							}
							let transparent = await Jimp.read(path.join(__dirname, `../../public/images/transparent/${imgName}`));
							transparent.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), async() => {
								images(path.join(_dirname, `../../public/assets/images/gallery/${libraryImages}`)).size(1262, 1262).draw(images(path.join(dirname, `../../public/images/created-image/${imgName}`)), 10, 10).save(path.join(_dirname, `../../public/images/created-image/${imgName}`), {
									quality: 100
								}, () => {
									console.log('done ho bhai');
								});
								console.log("Merged Image with BG image from libry: ", imgName);
								res.status(StatusCodes.OK).send({
									resCode: 1,
									message: "Merged Image",
									imageName: imgName,
									data: {
									"itemId": itemId,
									"bgImage": libraryImages,
									"imgName": imgName
									}
								});
							})
						})
					})
				} 
				else{
					console.log(path.join(__dirname, `../../public/assets/images/gallery/${libraryImages}`));
					console.error("image is not there")
				}
			}
			else {
				if(mainImage !== undefined) {
					if(fs.existsSync(path.join(__dirname, `../../public/images/product/${headwear}.png`))) {
						cap = await Jimp.read(path.join(__dirname, `../../public/images/product/${headwear}.png`));
					}
					if(fs.existsSync(path.join(__dirname, `../../public/images/product/${clothes}.png`))) {
						tShirt = await Jimp.read(path.join(__dirname, `../../public/images/product/${clothes}.png`));
					}
					if(mainImage !== undefined) {
						if(tShirt !== undefined) {
							let tShirtRead = await tShirt.resize(1400, 1350);
							await mainImage.composite(tShirtRead, -60, -60);
						}
						if(cap !== undefined) {
							let capRead = await cap.resize(1200, 1300);
							await mainImage.composite(capRead, 20, -18);
						}
						mainImage.write(path.join(__dirname, `../../public/images/created-image/${imgName}`), () => {
							console.log("Merged Image without color: ", imgName);
							res.status(StatusCodes.OK).send({
								resCode: 1,
								message: "Merged Image",
								imageName: imgName,
								Base_Url: process.env.Base_Url,
								data: {
									"imgName": imgName
								}
							});
						});
					}
				}
			}
		} else {
			console.log("Image does not exist.");
			console.log("Please Enter a Valid Item ID");
			res.send({
				resCode: 2,
				message: "Please Provide a Valid Item ID in the Field Below.",
			});
		}
	}
};

function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

exports.resizeImage = async(req, res) => {
	const {	bgImage, imageName	} = JSON.parse(JSON.stringify(req.body));
	let mainImage, BackImage;
	const imgName = new Date().toISOString() + ".png";

	if(bgImage !== undefined) {
		if(fs.existsSync(path.join(__dirname, `../../public/images/uploads/${bgImage}`))) {
			await Jimp.read(path.join(__dirname, `../../public/images/uploads/${bgImage}`), (err, img) => {
				if(err) throw err;
				img.resize(parseInt(1500), parseInt(500)).quality(100).write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), async() => {
					if(fs.existsSync(path.join(__dirname, `../../public/images/resize-image/${imgName}`))) {
						BackImage = await Jimp.read(path.join(__dirname, `../../public/images/resize-image/${imgName}`));
					}
					if(fs.existsSync(path.join(__dirname, `../../public/images/transparent/${imageName}`))) {
						mainImage = await Jimp.read(path.join(__dirname, `../../public/images/transparent/${imageName}`));
					}
					let MainImage = await mainImage.resize(605, 605);
					await BackImage.composite(MainImage, 415, -50);
					BackImage.write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), () => {
						console.log("resize Image : ", imgName);
						res.status(StatusCodes.OK).send({
							resCode: 1,
							message: "resize Image",
							imageName: imgName,
						});
					});
				});
			})
		}
		else if(fs.existsSync(path.join(__dirname, `../../public/assets/images/gallery/${bgImage}`))) {
			await Jimp.read(path.join(__dirname, `../../public/assets/images/gallery/${bgImage}`), (err, img) => {
				if(err) throw err;
				img.resize(parseInt(1500), parseInt(500)).quality(100).write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), async() => {
					if(fs.existsSync(path.join(__dirname, `../../public/images/resize-image/${imgName}`))) {
						BackImage = await Jimp.read(path.join(__dirname, `../../public/images/resize-image/${imgName}`));
					}
					if(fs.existsSync(path.join(__dirname, `../../public/images/transparent/${imageName}`))) {
						mainImage = await Jimp.read(path.join(__dirname, `../../public/images/transparent/${imageName}`));
					}
					let MainImage = await mainImage.resize(605, 605);
					await BackImage.composite(MainImage, 415, -50);
					BackImage.write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), () => {
						console.log("resize Image : ", imgName);
						res.status(StatusCodes.OK).send({
							resCode: 1,
							message: "resize Image",
							imageName: imgName,
						});
					});
				});
			})
		}
	}
	else {
		let BackColor;
		let mainImage; 
		if(fs.existsSync(path.join(__dirname, `../../public/images/created-image/${imageName}`))){
			mainImage = await Jimp.read(path.join(__dirname, `../../public/images/created-image/${imageName}`));
		}else{
			mainImage = await Jimp.read(path.join(__dirname, `../../public/images/loader/default-image.png`));
		}
		let bgColorImage = await Jimp.read(path.join(__dirname, `../../public/images/loader/redBg.png`));
		const rgbaValue = Jimp.intToRGBA(mainImage.getPixelColor(50, 50));
		const haxValue = rgbToHex(rgbaValue.r, rgbaValue.g, rgbaValue.b);
		bgColorImage.write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), () => {
			replaceColor({
				image: path.join(__dirname, `../../public/images/loader/redBg.png`),
				colors: {
					type: "hex",
					targetColor: "#ed1c24",
					replaceColor: haxValue,
				},
			}, (err, jimpObject) => {
				if(err) return console.log(err);
				jimpObject.write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), async(err) => {
					if(err) return console.log(err);
					if(fs.existsSync(path.join(__dirname, `../../public/images/resize-image/${imgName}`))) {
						BackColor = await Jimp.read(path.join(__dirname, `../../public/images/resize-image/${imgName}`));
					}
					if(BackColor !== undefined) {
						let MainImage = await mainImage.resize(605, 605);
						await BackColor.composite(MainImage, 415, -50);
						BackColor.write(path.join(__dirname, `../../public/images/resize-image/${imgName}`), () => {
							console.log("resize Image : ", imgName);
							res.status(StatusCodes.OK).send({
								resCode: 1,
								message: "resize Image",
								imageName: imgName,
							});
						});
					}
				});
			})
		})
	}
};
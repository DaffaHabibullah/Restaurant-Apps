const sharp = require("sharp");
const fs = require("fs");
const path = require("path");


const target = path.resolve(__dirname, "src/public/images/heros");
const destination = path.resolve(__dirname, "dist/images");

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, {recursive: true});
}

fs.readdirSync(target)
    .forEach((image) => {
        const ext = path.extname(image).toLowerCase();

        const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp", ".tiff", ".gif", ".svg"];

        if (supportedExtensions.includes(ext)) {
            sharp(`${target}/${image}`)
                .resize(800)
                .toFile(path.resolve(__dirname, `${destination}/${image.split(".").slice(0, -1).join(".")}-large.jpg`));

            sharp(`${target}/${image}`)
                .resize(480)
                .toFile(path.resolve(__dirname, `${destination}/${image.split(".").slice(0, -1).join(".")}-small.jpg`));
        }
    });

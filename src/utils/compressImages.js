/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
import compress_images from "compress-images";

const inputPath = "src/assets/originalimg/*.{jpg,JPG,jpeg,JPEG,png,svg,gif}";
const outputPath = "src/assets/img/";

compress_images(
  inputPath, 
  outputPath, 
  { compress_force: false, statistic: true, autoupdate: true }, 
  false,
  { jpg: { engine: "mozjpeg", command: ["-quality", "60"] } },
  { png: { engine: "pngquant", command: ["--quality=20-50"] } },
  { svg: { engine: "svgo", command: "--multipass" } },
  { gif: { engine: "gifsicle", command: ["--colors", "256", "--use-col=web"] } }, (error, completed, statistic) => {
    console.log("-------------");
    console.log(error);
    console.log(completed);
    console.log(statistic);
    console.log("-------------");                                   
  },
);

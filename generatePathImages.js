// node generateSvgIndex.js 입력하면 assets/image/map 폴더에 있는 png 파일들을 폴더 별로 index.ts 파일로 만들어줌

const fs = require("fs");
const path = require("path");

const PNG_ROOT_DIRECTORY = "./assets/image/map";

function getDirectories(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(directory, dirent.name));
}

function generatePathImage(rootDirectory) {
  const directories = getDirectories(rootDirectory);

  directories.forEach((directory) => {
    const indexFilePath = path.join(directory, "index.ts");
    const files = fs.readdirSync(directory);

    const exports = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => {
        const fileName = path.parse(file).name;
        return `export { default as ${fileName} } from "./${fileName}.png";`;
      });

    const content = exports.join("\n");
    fs.writeFileSync(indexFilePath, content);
  });
}

generatePathImage(PNG_ROOT_DIRECTORY);

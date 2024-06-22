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
  const indexFilePath = path.join(rootDirectory, "pathlist");
  fs.writeFileSync(indexFilePath, "");

  directories.forEach((directory) => {
    const files = fs.readdirSync(directory);
    const category = directory.split("/").at(-1);

    const exports = files
      .filter((file) => file.endsWith(".png"))
      .map((file) => {
        const fileName = path.parse(file).name;
        return `/map/${category}/${fileName}.png`;
      });

    const content = exports.join("\n");
    fs.appendFileSync(indexFilePath, content);
    fs.appendFileSync(indexFilePath, "\n");
  });
}

generatePathImage(PNG_ROOT_DIRECTORY);
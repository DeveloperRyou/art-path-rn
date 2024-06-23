// node generateSvgIndex.js 입력하면 assets/image/map 폴더에 있는 png 파일들을 폴더 별로 index.ts 파일로 만들어줌

const fs = require("fs");
const path = require("path");

function getDirectories(directory) {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => path.join(directory, dirent.name));
}

function generatePathImage(rootDirectory, prefix = "") {
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
        return `/${prefix}/${category}/${fileName}.png`;
      });

    const content = exports.join("\n");
    fs.appendFileSync(indexFilePath, content);
    fs.appendFileSync(indexFilePath, "\n");
  });
}

generatePathImage("./assets/image/map", "map");
generatePathImage("./assets/image/map-finish", "map-finish");

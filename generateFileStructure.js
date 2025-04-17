const fs = require("fs");
const path = require("path");

const ROOT_DIR = "files";

function getFileStructure(dirPath) {
    const items = fs.readdirSync(dirPath, { withFileTypes: true });

    return items
        .filter(item => item.isDirectory() || item.name.endsWith(".md"))
        .map(item => {
            const fullPath = path.join(dirPath, item.name);
            const relativePath = fullPath.replace(/\\/g, "/");

            if (item.isDirectory()) {
                return {
                    type: "dir",
                    name: item.name,
                    children: getFileStructure(fullPath),
                };
            } else {
                return {
                    type: "file",
                    name: item.name,
                    path: relativePath,
                };
            }
        });
}

const structure = getFileStructure(ROOT_DIR);

fs.writeFileSync("fileStructure.json", JSON.stringify(structure, null, 2));
console.log("✅ fileStructure.json generated!");

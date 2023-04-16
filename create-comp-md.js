const fs = require("fs");

// directory path
const dir = "./src/pages/";

let str = "";
let str1 = "";

// list all files in the directory
fs.readdir(dir, (err, files) => {
  if (err) {
    throw err;
  }
  // files object contains all files names
  // log them on console
  files.forEach((file) => {
    fs.stat(dir + file, function (err, stats) {
      // true || false 判断是不是文件夹
      if (stats.isDirectory()) {
        fs.exists(dir + file + "/doc/", (exists) => {
          if (exists) {
            fs.readdir(dir + file + "/doc/", (err, Dfiles) => {
              if (err) {
                throw err;
              }
              // 判断是否存在'index.md'文件，不存在就去生成
              if (!Dfiles.includes("index.md")) {
                Dfiles.forEach((item) => {
                  console.log("item", item);
                  let vueFName = item.split(".");
                  if (vueFName[1] === "vue") {
                    console.log("vue files");
                    let compName = "";
                    if (item.indexOf("-") !== -1) {
                      let items = vueFName[0].split("-");
                      console.log(items);
                      compName =
                        items[0] +
                        items[1].slice(0, 1).toUpperCase() +
                        items[1].slice(1).split(".")[0];
                    } else {
                      compName = item.split(".")[0];
                    }

                    str += `\n  import ${compName} from "./${item}"`;
                    str1 += `\n<${compName} />\n<pre-view compName="${file}" vueFName="${vueFName[0]}" />\n`;
                  }
                });
                str =
                  `# ${
                    file.slice(0, 1).toUpperCase() + file.slice(1)
                  } 组件\n<script setup>` +
                  str +
                  `\n  import preView from "@/components/preview/preview.vue"` +
                  `\n</script>`;

                // 生成md文件并写入
                fs.writeFile(
                  dir + file + "/doc/" + `index.md`,
                  str + str1,
                  function (err) {
                    if (err) {
                      throw err;
                    }
                    console.log("write over");
                  }
                );
                console.log(str + str1);
              }
            });
          }
        });
      }
    });
  });
});

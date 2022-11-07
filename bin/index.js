const fs = require("fs");
const path = require("path");
const distPath = "./dist";

walkSync(distPath, function (filePath, stat) {
    console.log(filePath);
    if (filePath.includes(".html")) {
        let testHtml = fs.readFileSync(filePath, "utf8");
        if (testHtml.includes('href="/')) {
            testHtml = testHtml.replace(/href="\//g, 'href="/stable-diffution-utils-project/');
            testHtml = testHtml.replace(/src="\//g, 'src="/stable-diffution-utils-project/');
            fs.writeFileSync(filePath, testHtml, "utf8");
        }
    }
});

function walkSync(distPath, callback) {
    fs.readdirSync(distPath, { withFileTypes: true }).forEach(function (dirent) {
        var filePath = path.join(distPath, dirent.name);
        if (dirent.isFile()) {
            callback(filePath, dirent);
        } else if (dirent.isDirectory()) {
            walkSync(filePath, callback);
        }
    });
}

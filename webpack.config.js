const { resolve } = require("path");

module.exports = {
    mode:   "development",
    entry:  "./src/index.js",
    output: {
                path: resolve(__dirname + "/dist/"),
                filename: "bundle.js"
            }
};
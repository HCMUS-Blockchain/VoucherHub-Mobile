const {postData} = require("./helper");
exports.getAll = () => {
    return postData('/puzzle/')
}

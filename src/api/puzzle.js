const {postData} = require("./helper");
exports.getAll = () => {
    return postData('/puzzle/')
}

exports.sendPuzzle = (puzzle) => {
    return postData('/puzzle/send', puzzle)
}

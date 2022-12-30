const {postData} = require("./helper");
exports.getAll = () => {
    return postData('/api/puzzle/')
}

exports.sendPuzzle = (puzzle) => {
    return postData('/api/puzzle/send-friend', puzzle)
}

exports.sendPuzzleEveryone = (puzzle) => {
    return postData('/api/puzzle/send-everyone', puzzle)
}

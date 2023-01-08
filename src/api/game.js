const {getData} = require("./helper");

exports.getDataOfQuizGame = () => {
    return getData('/api/games/collection/63b7ddaf75893b228ba86453')
}

const {getData} = require("./helper");

exports.getDataOfQuizGame = () => {
    return getData('/api/game/getDataQuizGame')
}

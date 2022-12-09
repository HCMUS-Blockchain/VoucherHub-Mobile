const {getData} = require("./helper");

exports.getDataOfQuizGame = () => {
    return getData('/game/getDataQuizGame')
}

const {getData} = require("./helper");

exports.getPopularBranch = () => {
    return getData('/api/counterparts/v1/popular-branch')
}

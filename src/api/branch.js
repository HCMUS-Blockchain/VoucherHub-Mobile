const {getData} = require('./helper')
exports.getPopularBranch =() => {
    return getData('/api/campaigns/v1/popular-branch')
}


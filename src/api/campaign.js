const {getData, postData} = require("./helper");
exports.getNewestCampaign = () => {
    return getData('/api/campaigns/v1/newest')
}
exports.addFavorite = (data) =>{
    return postData('/api/campaigns/v1/favorite',data)
}
exports.deleteFavorite = (data) =>{
    return postData('/api/campaigns/v1/favorite/delete',data)
}

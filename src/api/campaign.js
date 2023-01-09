const {getData} = require("./helper");
exports.getNewestCampaign = () => {
    return getData('/api/campaigns/v1/newest')
}

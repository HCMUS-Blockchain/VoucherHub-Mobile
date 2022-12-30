const {postData} = require("./helper");
exports.getAllVouchersVsCategories =() => {
    return postData('/api/vouchers/vouchers-category')
}

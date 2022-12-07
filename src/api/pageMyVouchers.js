const {postData} = require("./helper");
exports.getAllVouchersVsCategories =() => {
    return postData('/vouchers/vouchers-category')
}

const {postData} = require("./helper");
exports.getAll = () => {
    return postData('/vouchers/getAll')
}

exports.getAllVouchersByCategoryName = (categoryName) => {
    return postData('/vouchers/category', {category: categoryName})
}

exports.searchVoucher = (keyword) => {
    return postData('/vouchers/search', {keyword})
}

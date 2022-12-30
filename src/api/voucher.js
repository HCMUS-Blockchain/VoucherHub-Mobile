const {postData} = require("./helper");
exports.getAll = () => {
    return postData('/api/vouchers/getAll')
}

exports.getAllVouchersByCategoryName = (categoryName) => {
    console.log(categoryName)
    return postData('/api/vouchers/category', {category: categoryName})
}

exports.searchVoucher = (keyword) => {
    return postData('/api/vouchers/search', {keyword})
}

exports.playGame = (data) => {
    return postData('/api/vouchers/playgame', data)
}

exports.playPuzzle = (data) => {
    return postData('/api/vouchers/playpuzzle', data)
}


const {getData} = require("./helper");
exports.getListNoti =() => {
    return getData('/api/notification/user')
}

exports.getNumberUnSeenNoti =() => {
    return getData('/api/notification/numberunseen')
}

exports.getDataUnSeen = () =>{
    return getData('/api/notification/numberunseen/list')
}

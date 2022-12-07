const {getData} = require('./helper')
exports.getAll =() => {
    return getData('/category')
}

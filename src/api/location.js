import axios from "axios";

exports.apiGeoapi = async (coordinate) => {
    const api =
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&apiKey=8be687f30e634849b5c30bcd63c5ac6b`
    const objectReceive = await axios({
        method: 'get',
        url: api
    })
    return objectReceive?.data?.features[0]?.properties?.formatted
}

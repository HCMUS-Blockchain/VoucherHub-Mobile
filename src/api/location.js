import axios from "axios";
import {getData, postData} from "./helper";

exports.apiGeoapi = async (coordinate) => {
    const api =
        `https://api.geoapify.com/v1/geocode/reverse?lat=${coordinate.latitude}&lon=${coordinate.longitude}&apiKey=8be687f30e634849b5c30bcd63c5ac6b`
    const objectReceive = await axios({
        method: 'get',
        url: api
    })
    return objectReceive?.data?.features[0]?.properties?.formatted
}

exports.getLocationNearBy = (latitude, longitude) => {
    return postData("/api/stores/find/store-neary-by", {
        latitude,
        longitude,
    })
}

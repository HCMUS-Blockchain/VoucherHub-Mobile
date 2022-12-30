import axios from "axios";
import {APP_SERVER} from '@env'
console.log(APP_SERVER)
export default axios.create({baseURL:"http://10.123.0.213:3001"})


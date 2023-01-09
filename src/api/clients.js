import axios from "axios";
import {APP_SERVER} from '@env'
console.log(APP_SERVER)
export default axios.create({baseURL:"http://192.168.1.101:3001"})


import axios from "axios";
import {APP_SERVER} from '@env'
export default axios.create({baseURL:APP_SERVER})

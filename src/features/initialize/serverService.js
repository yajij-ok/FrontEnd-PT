import axios from "axios"
import { base_url } from "../../utils/base_url"

export const initializeServer = async() =>{
const response = await axios.get(`${base_url}`)
    if(response.data){
       return response.data
    }
}

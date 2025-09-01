import axios from "axios"
import { base_url } from "../../utils/base_url"

export const initializeServer = async(id) =>{
const response = await axios.use(`${base_url}`)
    if(response.data){
       return response.data
    }
}

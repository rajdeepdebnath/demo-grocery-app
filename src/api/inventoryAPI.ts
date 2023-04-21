import axios from "axios"
import { Product } from "../types/product";

const API_BASE_URL = "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s";

export const fecthInventoryApi = async (category:string = 'all'):Promise<Product[]> => {
    let inventory = await axios.get(`${API_BASE_URL}?category=${category}`);
    console.log(inventory.data);
    return inventory.data as Product[];
}
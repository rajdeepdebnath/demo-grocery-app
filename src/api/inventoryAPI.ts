import axios from "axios"
import { Product } from "../types/product";

const API_BASE_URL = import.meta.env.VITE_INVENTORY_API_URL;

export const fecthInventoryApi = async (category:string = 'all'):Promise<Product[]> => {    
    let inventory = await axios.get(`${API_BASE_URL}?category=${category}`);
    return inventory.data as Product[];
}
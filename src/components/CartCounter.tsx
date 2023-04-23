import Button from "@mui/material/Button"
import { useAppDispatch } from "../state/hooks"
import { Product } from "../types/product"
import { useEffect, useRef, useState } from "react"
import { addToCart, removeFromCart } from "../state/cartSlice"
import Stack from "@mui/material/Stack"

interface Props {
    item:Product,
    quantity:number
}

const CartCounter = ({item,quantity}: Props) => {
    const dispatch = useAppDispatch()
    const [itemQuantity, setItemQuantity] = useState(quantity);

    const decreaseQuantity = (id:number) => {
        setItemQuantity(p => p-1);
    }

    const increaseQuantity = (id:number) => {
        setItemQuantity(p => p+1);
    }

    useEffect(() => {
        if(itemQuantity == 0){
            dispatch(removeFromCart({productId:item.id, quantity:quantity}))
        }else{
            dispatch(addToCart({productId:item.id, quantity:itemQuantity}))
        }
    }, [itemQuantity]);

  return (
    <Stack direction="row" spacing={1} sx={{justifyContent:'flex-end'}}>
        <Button size="small" disableElevation variant="outlined" color="secondary"
            onClick={() => decreaseQuantity(item.id)} sx={{ minWidth: 24, width:24 }}>
            -
        </Button>
        <div> {itemQuantity} </div>
        <Button size="small" disableElevation variant="outlined" color="secondary" 
             sx={{ minWidth: 24, width:24 }}
            onClick={() => increaseQuantity(item.id)} disabled={itemQuantity===item.available} >
            +
        </Button>
    </Stack>
  )
}

export default CartCounter

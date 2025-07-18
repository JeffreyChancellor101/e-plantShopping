import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const {product} = action.payload;
        
        const isAdded = state.items.find(item => item.name === product.name);
        if(isAdded){
            isAdded.quantity++;
        }else{
            state.items.push({name: product.name, image: product.image, cost: product.cost, quantity: 1})
        }
        
    },
    removeItem: (state, action) => {
        const {name } = action.payload.item;
        state.items = state.items.filter(product => product.name != name);
        
    },
    updateQuantity: (state, action) => {
        const{name, quantity} = action.payload;
        const foundItem = state.items.find(item => item.name === name);
        if(foundItem){
            foundItem.quantity = quantity;
        }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

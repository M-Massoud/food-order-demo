import { createContext } from 'react';

// add the method for better ide auto complete
const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addToCart: item => {},
  removeFromCart: id => {},
  clearCart: () => {},
});

export default CartContext;

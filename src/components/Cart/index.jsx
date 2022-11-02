import { useContext } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = props => {
  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalAmount.toFixed(2);

  const onAddHandler = item => {
    cartCtx.addToCart({ ...item, amount: 1 });
  };

  const onRemoveHandler = id => {
    cartCtx.removeFromCart(id);
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={() => onAddHandler(item)}
          onRemove={() => onRemoveHandler(item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalPrice}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.hideCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;

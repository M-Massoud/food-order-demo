import { useContext, useState } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import CheckoutForm from './CheckoutForm';

const Cart = props => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formSubmited, setFormSubmitted] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalPrice = cartCtx.totalAmount.toFixed(2);

  const onAddHandler = item => {
    cartCtx.addToCart({ ...item, amount: 1 });
  };

  const onRemoveHandler = id => {
    cartCtx.removeFromCart(id);
  };

  const orderClickHandler = () => {
    setShowCheckoutForm(true);
  };

  const orderConfirmHandler = async userData => {
    const response = await fetch(process.env.REACT_APP_DATABASE_URL_ORDERS, {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items,
      }),
    });

    if (response.ok) {
      setFormSubmitted(true);
      cartCtx.clearCart();
    }
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

  const cartActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.hideCart}>
        Close
      </button>
      <button className={styles.button} onClick={orderClickHandler}>
        Order
      </button>
    </div>
  );

  return (
    <Modal hideCart={props.hideCart}>
      {formSubmited ? (
        <>
          <p>your order submited successfully!</p>
          <button className={styles['close-button']} onClick={props.hideCart}>
            Close
          </button>
        </>
      ) : (
        <>
          {cartItems}
          <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalPrice}</span>
          </div>

          {showCheckoutForm && (
            <CheckoutForm
              hideCart={props.hideCart}
              onConfirm={orderConfirmHandler}
            />
          )}
          {!showCheckoutForm && cartActions}
        </>
      )}
    </Modal>
  );
};

export default Cart;

import { useContext } from 'react';
import styles from './Header.module.css';
import mealsImg from '../../imgs/meals.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartContext from '../../store/cart-context';

function Header(props) {
  const cartCtx = useContext(CartContext);

  const numberOfCartItems = cartCtx.items.length;

  return (
    <>
      <header className={styles.header}>
        <h1>Meals</h1>
        <button className={styles.button} onClick={props.showCart}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
          cart
          <span className={styles.badge}>{numberOfCartItems}</span>
        </button>
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImg} alt="meals-img" />
      </div>
    </>
  );
}

export default Header;

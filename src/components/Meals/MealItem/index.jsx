import { useContext } from 'react';
import CartContext from '../../../store/cart-context';
import styles from './MealItem.module.css';
import MealForm from '../MealForm';

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$ ${props.price.toFixed(2)}`;

  const addItemHandler = amount => {
    cartCtx.addToCart({
      id: props.id,
      name: props.mealName,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.mealName}</h3>
        <p className={styles.description}>{props.description}</p>
        <div className={styles.price}> {price}</div>
      </div>
      <MealForm onAddHandler={addItemHandler} id={props.id} />
    </li>
  );
}

export default MealItem;

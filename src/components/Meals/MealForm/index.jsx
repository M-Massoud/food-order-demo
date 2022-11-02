import { useRef } from 'react';
import styles from './MealForm.module.css';

function MealForm(props) {
  const addFormRef = useRef();

  const handleAddSubmit = event => {
    event.preventDefault();
    const itemAmount = +addFormRef.current.value;
    props.onAddHandler(itemAmount);
  };

  return (
    <form className={styles.form} onSubmit={handleAddSubmit}>
      <div className={styles.input}>
        <label htmlFor={`meal-${props.id}`}>Amount</label>
        <input
          ref={addFormRef}
          type="number"
          name="add-meal"
          id={`meal-${props.id}`}
          min="1"
          max="5"
          defaultValue={1}
        />
      </div>
      <button>+ Add</button>
    </form>
  );
}

export default MealForm;
